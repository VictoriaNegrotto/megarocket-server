import Joi from 'joi';

const validateUpdate = (req, res, next) => {
  const suscriptionUpdateValidation = Joi.object({
    classSubs: Joi.string(),
    members: Joi.string(),
    date: Joi.date(),
    isActive: Joi.boolean().default(false),
  });

  const updateValidation = suscriptionUpdateValidation.validate(req.body);

  if (!updateValidation.error) return next();
  return res.status(400).json({
    message: `There was error: ${updateValidation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validations = {
  validateUpdate,
};

export default validations;
