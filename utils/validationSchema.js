const joi = require('joi');

module.exports.productValidationSchema = joi.object({
    product: joi.object({
        name: joi.string()
            .required(),

        cost: joi.number()
            .min(0)
            .required(),

        wholesalePrice: joi.number()
            .min(0)
            .required(),

        retailPrice: joi.number()
            .min(0)
            .required(),

        colour: joi.string()
            .required(),

        isUnique: joi.boolean(),

        isBase: joi.boolean(),

        frameSet: joi.string(),

        qty: joi.number()
            .required(),

        isRetired:joi.boolean(),
    })
})