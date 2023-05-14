import Joi from 'joi';

const validateUpdate = (req, res, next) => {
  const classUpdateValidation = Joi.object({
    day: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
    hour: Joi.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
    trainer: Joi.string(),
    activity: Joi.string(),
    slots: Joi.number().min(0).max(30).integer(),
  });

  const updateValidation = classUpdateValidation.validate(req.body);

  if (!updateValidation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${updateValidation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};
const validations = {
  validateUpdate,
};

export default validations;
