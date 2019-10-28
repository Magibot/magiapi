import Logger from '../app/api.logger';
import mongoose from 'mongoose';
import env from './env';

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', function() {
  Logger.ApiConsole.success('Opened connection with Mongo Database');
});

mongoose.connection.on('error', function(err) {
  Logger.ApiConsole.error('Occured an error in Mongo connection');
  Logger.ApiConsole.error(err);
});

mongoose.connection.on('disconnected', function() {
  Logger.ApiConsole.normal('Disconnected from Mongo Database');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    Logger.ApiConsole.normal('Closed Mongo Database connection');
    process.exit(0);
  });
});

export const createMongooseConnection = function() {
  mongoose
    .connect(env.mongoUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .catch(err => Logger.ApiConsole.error(err));
  return mongoose;
};

export default mongoose;
