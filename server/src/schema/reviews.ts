import Joi from "joi";

export const CreateReviewSchema = Joi.object({
     content: Joi.string().optional().messages({
          "string.base": "content must be string",
     }),

     rating: Joi.number()
          .required()
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
}).options({
     stripUnknown: true,
});

export const getReviewSchema = Joi.object({
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
          .max(15)
          .optional()
          .messages({
               "number.base": "page must be a number",
               "number.min": "size must be greater than or equal to 1",
               "number.max": "size must be less than or equal to 15",
          })
          .default(3),
     sortBy: Joi.string().optional().default("createdDesc").messages({
          "string.base": "sortBy must be string",
     }),
});
