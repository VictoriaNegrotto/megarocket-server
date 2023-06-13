import Joi from 'joi';

const validateCreate = (req, res, next) => {
  const superAdminCreateValidation = Joi.object({
    email: Joi.string().regex(/^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-z-]+)*(\.[a-z]{2,4})$/).min(5).messages({
      'string.pattern.base': 'Email is not valid, muy contain only one @ and a valid domain',
    })
      .lowercase()
      .required(),
    password: Joi.string().min(8).max(20).regex(/^(?!.*\s)[A-Za-z\d!@#$%^&*]+$/)
      .messages({
        'string.pattern.base': 'Password must contain at least 8 characters and cannot contain blank spaces',
      })
      .required(),
  });

  const createValidation = superAdminCreateValidation.validate(req.body);

  if (!createValidation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${createValidation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateUpdate = (req, res, next) => {
  const superAdminUpdateValidation = Joi.object({
    email: Joi.string().regex(/^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-z-]+)*(\.[a-z]{2,4})$/).min(5)
      .messages({
        'string.pattern.base': 'Email is not valid, muy contain only one @ and a valid domain',
      })
      .lowercase(),
    password: Joi.string().min(8).max(20).regex(/^(?!.*\s)[A-Za-z\d!@#$%^&*]+$/)
      .messages({
        'string.pattern.base': 'Password must contain at least 8 characters and cannot contain blank spaces',
      }),
  });

  const updateValidation = superAdminUpdateValidation.validate(req.body);

  if (!updateValidation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${updateValidation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validations = {
  validateCreate,
  validateUpdate,
};

export default validations;
