import Joi from 'joi';

const validateCreate = (req, res, next) => {
  const subscriptionCreateValidation = Joi.object({
    class: Joi.string().min(3).required(),
    members: Joi.string().min(3).required(),
    date: Joi.date().min('now').required(),
  });

  const createValidation = subscriptionCreateValidation.validate(req.body);

  if (!createValidation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${createValidation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validations = {
  validateCreate,
};

export default validations;
