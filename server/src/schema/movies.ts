import Joi from "joi";

export const GetMoviesQuerySchema = Joi.object({
     q: Joi.string().optional(),
     page: Joi.number()
          .min(1)
          .optional()
          .messages({
               "number.base": "page must be a number",
               "number.min": "page must be greater than or equal to 1",
          })
          .default(1),

     size: Joi.number()
          .min(1)
          .max(51)
          .optional()
          .messages({
               "number.base": "page must be a number",
               "number.min": "size must be greater than or equal to 1",
               "number.max": "size must be less than or equal to 50",
          })
          .default(9),
     sortBy: Joi.string().optional().default("releaseDateDesc").messages({
          "string.base": "sortBy must be string",
     }),
}).options({
     stripUnknown: true,
});

export const AddMoviesToWatchListSchema = Joi.object({
     movieId: Joi.number().required().messages({
          "number.base": "movieId must be a number",
          "any.required": "movieId is required",
     }),
     // watched: Joi.boolean().required().messages({
     //      "boolean.base": "watched field must be a boolean",
     //      "any.required": "watched field is required",
     // }),
}).options({
     stripUnknown: true,
});
