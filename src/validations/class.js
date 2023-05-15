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

const validateCreate = (req, res, next) => {
  const classValidation = Joi.object({
    day: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday').required(),
    hour: Joi.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    activity: Joi.string().required(),
    trainer: Joi.string().required(),
    slots: Joi.number().min(0).max(30).integer()
      .required(),
  });

  const validationCreateClass = classValidation.validate(req.body);

  if (!validationCreateClass.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validationCreateClass.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validations = {
  validateUpdate,
  validateCreate,
};

export default validations;
