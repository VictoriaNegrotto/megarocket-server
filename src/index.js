// use "import" to import libraries
import express from 'express';
import cors from 'cors';
import adminsRouter from './resources/admins';
import activityRouter from './resources/activity';
import superAdminsRoute from './resources/super-admins';
import routerMembers from './resources/member';
import classRoute from './resources/class';
import subscriptionsRouter from './resources/subscription';
import trainerRouter from './resources/trainer';

// use "require" to import JSON files

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/trainer', trainerRouter);
app.use('/class', classRoute);
app.use('/super-admins', superAdminsRoute);
app.use('/members', routerMembers);
app.use('/class', classRoute);
app.use('/activity', activityRouter);
app.use('/subscriptions', subscriptionsRouter);
app.use('/admins', adminsRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
