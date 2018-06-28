import path from 'path';
import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import json2xls from 'json2xls';
import compression from 'compression';
import { graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { apolloUploadExpress } from 'apollo-upload-server';
import expressPlayground from 'graphql-playground-middleware-express';

import models from './models';
import controllers from './controllers';
import { refreshTokens } from './utils/auth';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

// Load environment variables from .env file
require('dotenv').config();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();
const corsOptions = {
  origin: 'http://181.51.3.153:3000',
  optionsSuccessStatus: 200
};

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

app
  .use(cors(corsOptions))
  .use(compression())
  .use(helmet())
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
        user: req.user,
        SECRET: process.env.SECRET1,
        SECRET2: process.env.SECRET2
      }
    }))
  );

if (process.env.NODE_ENV === 'development') {
  app.get('/graphiql', expressPlayground({ endpoint: process.env.GRAPHQL_END_POINT }));
}

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL).then(() => app.listen(process.env.PORT));
