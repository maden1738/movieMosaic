import Joi from "joi";

export const CreateLogSchema = Joi.object({
     filmId: Joi.string().required(),

     reviewContent: Joi.string().optional(),

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
});
