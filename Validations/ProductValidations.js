const Joi = require('joi')

const newProductValidation = Joi.object({
    productName: Joi.string().min(3).max(20).required(),
    sellerEmailId: Joi.string().required(),
    productImages : Joi.string().required(),
    productPrice : Joi.number().min(1),
    productState: Joi.string().required(),
    quantityAvailable : Joi.number().min(1),
    productDescription: Joi.string().min(3).max(200),
    keywords : Joi.array().items(Joi.string()),
    productId:Joi.number(),
    productCategory:Joi.string().required()
})

module.exports = {
    newProductValidation, //validating new product created by seller
}