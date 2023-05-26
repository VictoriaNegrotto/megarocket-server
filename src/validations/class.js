import Joi from 'joi';
import mongoose from 'mongoose';

const isObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('invalid');
  }
  return value;
};

const validateUpdate = (req, res, next) => {
  const classUpdateValidation = Joi.object({
    day: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
    hour: Joi.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
    trainer: Joi.string().custom(isObjectId).messages({
      invalid: 'The Trainer id must be a valid ObjectId',
    }).required(),
    activity: Joi.string().custom(isObjectId).messages({
      invalid: 'The Activity id must be a valid ObjectId',
    }).required(),
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
    trainer: Joi.string().custom(isObjectId).messages({
      invalid: 'The Trainer id must be a valid ObjectId',
    }).required(),
    activity: Joi.string().custom(isObjectId).messages({
      invalid: 'The Activity id must be a valid ObjectId',
    }).required(),
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
