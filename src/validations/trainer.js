import Joi from 'joi';

const trainerCreate = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).max(20).regex()
      .required(),
    lastName: Joi.string().min(3).max(20).required(),
    dni: Joi.number().integer().min(1000000).max(99999999)
      .required(),
    phone: Joi.number().integer().min(1000000).max(99999999)
      .required(),
    email: Joi.string().email().lowercase()
      .required(),
    city: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(8).required(),
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
  trainerCreate,
};

export default validations;
