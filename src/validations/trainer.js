import Joi from 'joi';

const validateUpdate = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).max(20).regex(/^[a-zA-Z]+(?: [a-zA-Z]+)?$/)
      .messages({
        'string.pattern.base': 'First name must be only made of letters(it can be a compound Name)',
      }),
    lastName: Joi.string().min(3).max(20).regex(/^[a-zA-Z]+(?: [a-zA-Z]+)?$/)
      .messages({
        'string.pattern.base': 'Last name must be only made of letters(it can be a compound Name)',
      }),
    dni: Joi.number().min(1000000).max(99999999).integer(),
    phone: Joi.number().min(1000000000).max(9999999999).integer(),
    email: Joi.string().min(5).regex(/^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-z-]+)*(\.[a-z]{2,4})$/)
      .lowercase()
      .messages({
        'string.pattern.base': 'Email is not valid, muy contain only one @ and a valid domain',
      }),
    city: Joi.string().min(3).max(20).regex(/^[a-zA-Z]+(?:[\s-][A-Za-z]+)*$/)
      .messages({
        'string.pattern.base': 'City name must be only made of letters(it can be a compound city name)',
      }),
    password: Joi.string().min(8).max(20).regex(/^(?!.*\s)[A-Za-z\d!@#$%^&*]+$/)
      .messages({
        'string.pattern.base': 'Password must contain at least 8 characters and cannot contain blank spaces',
      }),
    salary: Joi.number().min(0),
  });

  const validation = trainerValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error:${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const trainerCreate = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).max(20).regex(/^[a-zA-Z]+(?: [a-zA-Z]+)?$/)
      .messages({
        'string.pattern.base': 'First name must be only made of letters(it can be a compound Name)',
      })
      .required(),
    lastName: Joi.string().min(3).max(20).regex(/^[a-zA-Z]+(?: [a-zA-Z]+)?$/)
      .messages({
        'string.pattern.base': 'Last name must be only made of letters(it can be a compound Name)',
      })
      .required(),
    dni: Joi.number().integer().min(1000000).max(99999999)
      .required(),
    phone: Joi.number().integer().min(1000000000).max(9999999999)
      .required(),
    email: Joi.string().min(5).regex(/^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-z-]+)*(\.[a-z]{2,4})$/).messages({
      'string.pattern.base': 'Email is not valid, muy contain only one @ and a valid domain',
    })
      .lowercase()
      .required(),
    city: Joi.string().min(3).max(20).regex(/^[a-zA-Z]+(?:[\s-][A-Za-z]+)*$/)
      .messages({
        'string.pattern.base': 'City name must be only made of letters(it can be a compound city name)',
      })
      .required(),
    password: Joi.string().min(8).max(20).regex(/^(?!.*\s)[A-Za-z\d!@#$%^&*]+$/)
      .messages({
        'string.pattern.base': 'Password must contain at least 8 characters and cannot contain blank spaces',
      })
      .required(),
    salary: Joi.number().required(),
  });

  const validation = trainerValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error:${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validations = {
  validateUpdate,
  trainerCreate,
};

export default validations;
