// use "import" to import libraries
import express from 'express';
import cors from 'cors';
import activityRouter from './resources/activity';

// use "require" to import JSON files
const activities = require('./data/activity.json');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/activity', activityRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/activity', (req, res) => {
  res.status(200).json({
    data: activities,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
