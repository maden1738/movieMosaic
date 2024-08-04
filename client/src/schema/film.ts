import Joi from "joi";

export const CreateMoviesBodySchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "film title is required",
  }),
  releaseDate: Joi.date().required().messages({
    "any.required": "release date is required",
  }),
  trailer: Joi.string().required().messages({
    "any.required": "film trailer is required",
  }),
  overview: Joi.string().required().messages({
    "any.required": "film overview is required",
  }),
  poster: Joi.required(),
  backdrop: Joi.required(),
}).options({
  stripUnknown: true,
});
