import mongoose from 'mongoose';
import env from './env';

mongoose.Promise = global.Promise;

export const createMongooseConnection = function(params?: { logger?: boolean }) {
  mongoose
    .connect(env.mongoUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => {
      if (params && params.logger) { 
        console.log('Connected to Mongo Database');
      }
    })
    .catch(err => console.error(err));
  return mongoose;
};

export default mongoose;
