import Joi from 'joi';

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
  validateUpdate,
};

export default validations;
