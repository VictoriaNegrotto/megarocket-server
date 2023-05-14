import { Router } from 'express';
import activityController from '../controllers/activity';
import validations from '../validations/activity';

// const express = require('express');

// const activityController = require('../controllers/activity');

// const validations = require('../validations/activity');

const activityRouter = Router();

activityRouter
  .get('/', activityController.getAllActivity)
  .get('/', activityController.getActivityById)
  .post('/', validations.validateCreation, activityController.createActivity);

export default activityRouter;
