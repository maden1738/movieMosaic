import Joi, { optional } from "joi";

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
          .max(8)
          .optional()
          .messages({
               "number.base": "page must be a number",
               "number.min": "size must be greater than or equal to 1",
               "number.max": "size must be less than or equal to 9",
          })
          .default(8),
     sortBy: Joi.string().optional().default("releaseDateDesc").messages({
          "string.base": "sortBy must be string",
     }),
}).options({
     stripUnknown: true,
});
