// use "import" to import libraries
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes';

// use "require" to import JSON files

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

const DB_URL = 'mongodb+srv://juvi-team:bPKvUATQZFxqh2A7@megarocket-databases.inpprte.mongodb.net/juvi-database';

mongoose
  .connect(DB_URL, { maxPoolSize: process.env.MONGO_POOLSIZE || 1 })
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log('Error: ', err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
