import Joi from "joi";

export const SignupSchema = Joi.object({
     name: Joi.string().required().messages({
          "any.required": "name is required",
     }),
     email: Joi.string().email().required().messages({
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
               "password.special":
                    "Password must have at least one special character",
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
     bio: Joi.string().optional(),
}).options({
     stripUnknown: true,
});

export const LoginSchema = Joi.object({
     email: Joi.string().email().required().messages({
          "string.email": "email must be in valid format",
          "any.required": "email is required",
     }),

     password: Joi.string().required().messages({
          "any.required": "password is required",
     }),
}).options({
     stripUnknown: true,
});

export const RefreshSchema = Joi.object({
     refreshToken: Joi.string().required().messages({
          "any.required": "refreshToken is required",
     }),
});

export const updateProfileSchema = Joi.object({
     name: Joi.string().required().messages({
          "any.required": "name is required",
     }),
     email: Joi.string().email().required().messages({
          "any.required": "email is required",
          "string.email": "email must be in valid format",
     }),
     bio: Joi.string().required(),
});

export const updatePasswordSchema = Joi.object({
     currentPassword: Joi.string().required().messages({
          "any.required": "current password is required",
     }),

     newPassword: Joi.string()
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
               "password.special":
                    "Password must have at least one special character",
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
