import mongoose from 'mongoose';
import env from './env';

mongoose
  .connect(env.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

mongoose.Promise = global.Promise;

export default mongoose;
