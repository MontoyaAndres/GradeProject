import path from 'path';
import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import json2xls from 'json2xls';
import compression from 'compression';
import nodemailer from 'nodemailer';
import DataLoader from 'dataloader';
import { graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { apolloUploadExpress } from 'apollo-upload-server';
import expressPlayground from 'graphql-playground-middleware-express';

import models from './models';
import controllers from './controllers';
import { refreshTokens } from './utils/auth';
import { StudentDistinctBatcher, userBatcher } from './utils/batchFunctions';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const isProduction = process.env.NODE_ENV === 'production';

// Load environment variables from .env file
require('dotenv').config();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();

// middleware to auth
const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, process.env.SECRET1);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, process.env.SECRET1, process.env.SECRET2);
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

app
  .use(compression())
  .use(helmet())
  .use(cors())
  .use(json2xls.middleware)
  .use(addUser)
  .use(controllers)
  .use(
    process.env.GRAPHQL_END_POINT,
    express.json(),
    apolloUploadExpress({ maxFiles: 1 }),
    graphqlExpress(req => ({
      schema,
      context: {
        models,
        transporter,
        user: req.user,
        SECRET: process.env.SECRET1,
        SECRET2: process.env.SECRET2,
        EMAIL_SECRET: process.env.EMAIL_SECRET,
        CurrentURL: `${req.connection.encrypted ? 'https' : 'http'}://${req.get('host')}`,
        StudentDistinctLoader: new DataLoader(params => StudentDistinctBatcher(params, models, req.user)),
        userLoader: new DataLoader(ids => userBatcher(ids, models, req.user))
      }
    }))
  );

if (isProduction) {
  // Files from react app
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('*', (req, res) => {
    // Remove cache of create-react-app
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');

    res.sendFile(path.join(__dirname, 'build/index.html'));
  });
} else {
  app.get('/graphiql', expressPlayground({ endpoint: process.env.GRAPHQL_END_POINT }));
}

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL).then(() => app.listen(process.env.PORT));
