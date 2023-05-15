import Joi from 'joi';

const validateCreate = (req, res, next) => {
  const superAdminCreateValidation = Joi.object({
    email: Joi.string().email().min(5).max(30)
      .lowercase()
      .required(),
    password: Joi.string().min(8).max(20).required(),
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
    email: Joi.string().email().min(5).max(30)
      .lowercase(),
    password: Joi.string().min(8).max(20),
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
