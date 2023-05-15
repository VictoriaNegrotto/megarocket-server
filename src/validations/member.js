import Joi from 'joi';

const validateCreate = (req, res, next) => {
  const createMemberValidate = Joi.object({
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    dni: Joi.number().min(1000000).max(99999999).integer()
      .required(),
    phone: Joi.number().max(99999999).interger().required(),
    email: Joi.string().email().min(5).max(30)
      .lowercase()
      .required(),
    city: Joi.string().min(2).max(20).required(),
    birthDate: Joi.date().required(),
    postalCode: Joi.number().max(9999).required(),
    isActive: Joi.boolean().default(true).required(),
    memberships: Joi.string().valid('Black', 'Classic', 'Only Classes').default('Classic').required(),
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
    firstName: Joi.string().min(3).max(20),
    lastName: Joi.string().min(3).max(20),
    dni: Joi.number().min(1000000).max(99999999).integer(),
    phone: Joi.number().max(99999999).integer(),
    email: Joi.string().email().min(5).max(30)
      .lowercase(),
    city: Joi.string().min(2).max(20),
    birthDate: Joi.date(),
    postalCode: Joi.number().max(9999).integer(),
    memberships: Joi.string().valid('Black', 'Classic', 'Only Classes'),
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
