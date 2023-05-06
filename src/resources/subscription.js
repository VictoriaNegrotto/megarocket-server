// Crear un Subscription (suscripción a una clase en determinada fecha)
// Editar un Subscription
// Obtener un Subscription
// Eliminar un Subscription
// Obtener la lista de Subscription con la opción de usar filtros

// const express = require('express');

import { Router } from 'express';

const subscriptions = require('../data/subscription.json');

const subscriptionsRouter = Router();

subscriptionsRouter.get('/', (req, res) => {
  res.status(200).json({
    data: subscriptions,
  });
  // res.send(subscriptions);
});

// module.exports = subscriptionsRouter;

export default subscriptionsRouter;
