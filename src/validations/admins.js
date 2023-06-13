import Joi from 'joi';

const adminValidation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)?$/)
      .messages({
        'string.pattern.base': 'First name must be only made of letters(it can be a compound Name)',
      }),
    lastName: Joi.string()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)?$/)
      .messages({
        'string.pattern.base': 'Last name must be only made of letters(it can be a compound Name)',
      }),
    email: Joi.string()
      .min(5)
      .regex(/^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-z-]+)*(\.[a-z]{2,4})$/)
      .messages({
        'string.pattern.base': 'Email is not valid, must contain only one @ and a valid domain',
      }),
    password: Joi.string()
      .min(3)
      .max(20)
      .regex(/^(?!.*\s)[A-Za-z\d!@#$%^&*]+$/)
      .messages({
        'string.pattern.base': 'Password must contain at least 8 characters and cannot contain blank spaces',
      }),
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
      .regex(/^[a-zA-Z]+(?:[\s-][A-Za-z]+)*$/)
      .messages({
        'string.pattern.base': 'Password must contain at least 8 characters and cannot contain blank spaces',
      }),
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
