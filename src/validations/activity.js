import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const activityValidation = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    description: Joi.string().min(10).max(120).required(),
  });
  const validation = activityValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};
const validateUpdate = (req, res, next) => {
  const activityUpdateValidation = Joi.object({
    name: Joi.string().min(3).max(20),
    description: Joi.string().min(10).max(120),
  });
  const validation = activityUpdateValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validations = {
  validateCreation,
  validateUpdate,
};

export default validations;
