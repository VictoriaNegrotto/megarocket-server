// use "import" to import libraries
import express from 'express';
import cors from 'cors';
import routerMembers from './resources/member';
import classRoute from './resources/class';
import superAdminRoute from './resources/super-admins';

// use "require" to import JSON files
const admins = require('./data/admins.json');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/members', routerMembers);
app.use('/class', classRoute);
app.use('/super-admins', superAdminRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
