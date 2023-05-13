import Joi from 'joi';

const validateUpdate = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).max(20),
    lastName: Joi.string().min(3).max(20),
    dni: Joi.number().min(1000000).max(99999999),
    phone: Joi.number().max(99999999),
    email: Joi.string().min(5).max(20).regex(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
      .lowercase(),
    city: Joi.string().min(3).max(20),
    password: Joi.string().min(3).max(20),
    salary: Joi.number().min(0),
    isActive: Joi.boolean().default(false),
  });
  const validation = trainerValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validations = {
  validateUpdate,
};

export default validations;
