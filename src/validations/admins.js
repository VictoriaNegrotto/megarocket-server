import Joi from 'joi';

const adminValidation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z]+$/),
    lastName: Joi.string()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z]+$/),
    email: Joi.string()
      .min(5)
      .max(30).regex(/^[^@]+@[^@]+.[a-zA-Z]{2,}$/)
      .email(),
    password: Joi.string()
      .min(3)
      .max(20)
      .regex(/^(?!.*\s)[A-Za-z\d!@#$%^&*]+$/),
    dni: Joi.number()
      .min(1000000)
      .max(99999999)
      .integer(),
    phone: Joi.number()
      .min(1000000000)
      .max(9999999999)
      .integer(),
    city: Joi.string()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z]+(?:[\s-][A-Za-z]+)*$/),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(500).json({
      message: error.details[0].message,
      data: undefined,
      error: true,
    });
  }

  return next();
};

export default adminValidation;
