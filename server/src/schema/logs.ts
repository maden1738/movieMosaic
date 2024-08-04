import Joi from "joi";

export const CreateLogSchema = Joi.object({
     filmId: Joi.string().required(),

     content: Joi.string().optional(),

     rating: Joi.number()
          .optional()
          .min(0)
          .max(5)
          .messages({
               "rating.float": "rating must be multiple of 0.5",
               "number.base": "rating must be number",
          })
          .custom((value, helpers) => {
               if (value % 0.5 !== 0) {
                    return helpers.error("rating.float");
               }

               return value;
          }),

     likeStatus: Joi.boolean().required(),
}).options({
     stripUnknown: true,
});

export const GetLogsQuerySchema = Joi.object({
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
          .max(20)
          .optional()
          .messages({
               "number.base": "page must be a number",
               "number.min": "size must be greater than or equal to 1",
               "number.max": "size must be less than or equal to 20",
          })
          .default(20),
});
