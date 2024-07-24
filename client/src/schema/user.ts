import Joi from "joi";

export const SignupSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "name is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "any.required": "email is required",
      "string.email": "email must be in valid format",
    }),
  password: Joi.string()
    .required()
    .min(8)
    .messages({
      "string.base": "Password must be string",
      "any.required": "password is required",
      "string.min": "Password must be at least 8 characters",
      "password.uppercase":
        "Password must have atleast one uppercase character",
      "password.lowercase":
        "Password must have at least one lowercase character",
      "password.special": "Password must have at least one special character",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }
      if (!/[!@#$%^&*()_+]/.test(value)) {
        return helpers.error("password.special");
      }

      return value;
    }),
});
