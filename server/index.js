const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const helmet = require('helmet');
const json2xls = require('json2xls');
const compression = require('compression');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

// Controllers
const { downloadFile } = require('./controllers/downloadFile');

// Load environment variables from .env file
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL);

const resolvers = {
  Query,
  Mutation
};

const server = new GraphQLServer({
  typeDefs: './database/schema.graphql',
  resolvers,
  context: req => ({ ...req })
});

server.express.use(compression());
server.express.use(helmet());
server.express.use(json2xls.middleware);
server.express.get('/download/:CodigoPrograma/:TipoSemestre', downloadFile);

server.start(process.env.PORT, ({ port }) => console.log(`Running on ${port}. Let's go dude!`))
