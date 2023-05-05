import { Router } from 'express';

const classJSON = require('../data/class.json');

const classRoute = Router();

classRoute.get('/:id', (req, res) => {
  const { id } = req.params;
  const classFilter = classJSON.find(
    (classElement) => classElement.id.toString() === id,
  );

  if (!classFilter) return res.send('Not exists this ID');

  return res.send(classFilter);
});

export default classRoute;
