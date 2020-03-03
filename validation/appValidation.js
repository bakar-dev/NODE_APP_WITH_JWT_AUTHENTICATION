const Joi = require("@hapi/joi");

//create job application validation
const validateNewApplication = data => {
  const schema = Joi.object({
    title: Joi.string().required(),
    email: Joi.string(),
    website: Joi.string(),
    industry: Joi.string().required(),
    type: Joi.string().required(),
    shift: Joi.string(),
    salary: Joi.number(),
    description: Joi.string().required(),
    location: Joi.string().required()
  });
  return schema.validate(data);
};

module.exports = { validateNewApplication };
