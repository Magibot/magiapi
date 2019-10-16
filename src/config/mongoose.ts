import mongoose from 'mongoose';
import env from './env';

export const createMongooseConnection = function() {
  mongoose
    .connect(env.mongoUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('Connected to Mongo Database'))
    .catch(err => console.error(err));

  mongoose.Promise = global.Promise;
  return mongoose;
};

export default createMongooseConnection;
