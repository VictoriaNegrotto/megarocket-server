import subscriptionRouter from './subscription';

const express = require('express');

const router = express.Router();

router.use('/subscriptions', subscriptionRouter);

export default router;
