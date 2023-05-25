import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

mongoose.connect(process.env.MONGO_DB_CONNECT_URL, { maxPoolSize: process.env.MONGO_POOLSIZE || 1 })
// eslint-disable-next-line no-console
  .then(() => console.log('MongoDB connected'))
  .then(() => {
    app.listen(process.env.PORT, (err) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log(`server listening on port: ${process.env.PORT}`);
    });
  })
// eslint-disable-next-line no-console
  .catch((e) => console.log(e));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
