import express from 'express';
import trainerController from '../controllers/trainer';

const router = express.Router();

router.get('/', trainerController.get).get('/:id', trainerController.get);
