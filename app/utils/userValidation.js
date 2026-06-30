const Joi = require("joi");

const userValidation = Joi.object({
  name: Joi.string()
    .min(3)
    .required(),

  username: Joi.string()
    .min(5)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  address: Joi.object({
    street: Joi.string().required(),
    suite: Joi.string().required(),
    city: Joi.string().required(),
    zipcode: Joi.string().required(),
    geo: Joi.object({
      lat: Joi.string().required(),
      lng: Joi.string().required()
    }).required()
  }).required(),

  phone: Joi.string().required(),

  website: Joi.string().required(),

  company: Joi.object({
    name: Joi.string().required(),
    catchPhrase: Joi.string().required(),
    bs: Joi.string().required()
  }).required()
});

module.exports = userValidation;