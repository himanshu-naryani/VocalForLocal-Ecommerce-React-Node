const Joi = require('joi')

const newUserValidation = Joi.object({
    userName: Joi.string().min(2).max(20).required(),
    userEmail:Joi.string().required(),
    userPassword:Joi.string().required(),
    userMobile:Joi.string().required(),
    userAddress:Joi.string().required(),
    userIsSeller:Joi.boolean(),
    userIsAdmin:Joi.boolean(),
    userBankAccountNumber:Joi.string(),
    userIfscCode:Joi.string(),
    userGstNumber:Joi.string(),
    userPanNumber:Joi.string(),
    userAadharNumber:Joi.string()
})

module.exports = {
    newUserValidation, //validating new user 
    
}