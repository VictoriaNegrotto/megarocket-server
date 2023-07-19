import Joi from 'joi';
import mongoose from 'mongoose';

const isObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('invalid');
  }
  return value;
};

const validateUpdate = (req, res, next) => {
  const suscriptionUpdateValidation = Joi.object({
    classes: Joi.string().custom(isObjectId).messages({
      invalid: 'The Class id must be a valid ObjectId',
    }),
    members: Joi.array().items(Joi.string().custom(isObjectId).messages({
      invalid: 'The Member id must be a valid ObjectId',
    })),
    date: Joi.date(),
  });

  const updateValidation = suscriptionUpdateValidation.validate(req.body);
  if (!updateValidation.error) return next();
  return res.status(400).json({
    message: `There was error: ${updateValidation.error.details[0].message}`,
  });
};

const validateCreate = (req, res, next) => {
  const subscriptionCreateValidation = Joi.object({
    classes: Joi.string().custom(isObjectId).messages({
      invalid: 'The Class id must be a valid ObjectId',
    })
      .required(),
    members: Joi.array().items(Joi.string().custom(isObjectId).messages({
      invalid: 'The Member id must be a valid ObjectId',
    })),
    date: Joi.date().required(),
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
  validateUpdate,
  validateCreate,
};

export default validations;
