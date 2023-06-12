import Joi from 'joi';

const validateUpdate = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).max(20).regex(/^[a-zA-Z]+(?: [a-zA-Z]+)?$/),
    lastName: Joi.string().min(3).max(20).regex(/^[a-zA-Z]+(?: [a-zA-Z]+)?$/),
    dni: Joi.number().min(1000000).max(99999999).integer(),
    phone: Joi.number().min(1000000000).max(9999999999).integer(),
    email: Joi.string().min(5).max(30).regex(/^[^@]+@[^@]+.[a-zA-Z]{2,}$/)
      .lowercase(),
    city: Joi.string().min(3).max(20).regex(/^[a-zA-Z]+(?:[\s-][A-Za-z]+)*$/),
    password: Joi.string().min(3).max(20).regex(/^(?!.*\s)[A-Za-z\d!@#$%^&*]+$/),
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
      .required(),
    lastName: Joi.string().min(3).max(20).regex(/^[a-zA-Z]+(?: [a-zA-Z]+)?$/)
      .required(),
    dni: Joi.number().integer().min(1000000).max(99999999)
      .required(),
    phone: Joi.number().integer().min(1000000000).max(9999999999)
      .required(),
    email: Joi.string().min(5).max(30).regex(/^[^@]+@[^@]+.[a-zA-Z]{2,}$/)
      .lowercase()
      .required(),
    city: Joi.string().min(3).max(20).regex(/^[a-zA-Z]+(?:[\s-][A-Za-z]+)*$/)
      .required(),
    password: Joi.string().min(8).regex(/^(?!.*\s)[A-Za-z\d!@#$%^&*]+$/).required(),
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
