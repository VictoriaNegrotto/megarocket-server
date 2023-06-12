import Joi from 'joi';

const validateCreate = (req, res, next) => {
  const createMemberValidate = Joi.object({
    firstName: Joi.string().min(3).max(20).pattern(/[a-zA-Z ]+$/)
      .required(),
    lastName: Joi.string().min(3).max(20).pattern(/[a-zA-Z ]+$/)
      .required(),
    dni: Joi.number().min(1000000).max(99999999).integer()
      .required(),
    phone: Joi.number().min(1000000000).max(9999999999).integer()
      .required(),
    email: Joi.string().email().min(5).max(30)
      .lowercase()
      .required(),
    city: Joi.string().min(2).max(20).pattern(/[a-zA-Z ]+$/)
      .required(),
    birthDate: Joi.date().required(),
    postalCode: Joi.number().max(9999).required(),
    memberships: Joi.string().valid('Black', 'Classic', 'Only Classes').default('Classic').required(),
    password: Joi.string().min(8).max(12).required(),
  });
  const validation = createMemberValidate.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateUpdate = (req, res, next) => {
  const updateMemberValidate = Joi.object({
    firstName: Joi.string().min(3).max(20).pattern(/[a-zA-Z ]+$/),
    lastName: Joi.string().min(3).max(20).pattern(/[a-zA-Z ]+$/),
    dni: Joi.number().min(1000000).max(99999999).integer(),
    phone: Joi.number().min(1000000000).max(9999999999).integer(),
    email: Joi.string().email().min(5).max(30)
      .lowercase(),
    city: Joi.string().min(2).max(20).pattern(/[a-zA-Z ]+$/),
    birthDate: Joi.date(),
    postalCode: Joi.number().max(9999).integer(),
    memberships: Joi.string().valid('Black', 'Classic', 'Only Classes'),
    password: Joi.string().min(8).max(12),
  });

  const validationUpdate = updateMemberValidate.validate(req.body);

  if (!validationUpdate.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validationUpdate.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validationsMember = {
  validateUpdate,
  validateCreate,
};

export default validationsMember;
