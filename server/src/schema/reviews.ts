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
