// use "import" to import libraries
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import adminsRouter from './controllers/admins';
import activityRouter from './controllers/activity';
import superAdminsRoute from './controllers/super-admins';
import routerMembers from './controllers/member';
import classRoute from './controllers/class';
import subscriptionsRouter from './controllers/subscription';
import trainerRouter from './controllers/trainer';

// use "require" to import JSON files

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/trainer', trainerRouter);
app.use('/super-admins', superAdminsRoute);
app.use('/members', routerMembers);
app.use('/class', classRoute);
app.use('/activity', activityRouter);
app.use('/subscriptions', subscriptionsRouter);
app.use('/admins', adminsRouter);

const DB_URL = 'mongodb+srv://juvi-team:bPKvUATQZFxqh2A7@megarocket-databases.inpprte.mongodb.net/juvi-database';

mongoose
  .connect(DB_URL)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log('Error: ', err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
