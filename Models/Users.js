const { boolean } = require('joi')
const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    productQuantity: { type: Number, required: true },
})

const productsOnSaleSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    adminpAprovalStatus: { type: Boolean, required: true },
})

const orderHistorySchema = new mongoose.Schema({
    productId: { type: String, required: true },
    productQuantity: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    isDelivered: { type: Boolean, required: true },
    dateOfOrder: { type: String, default: new Date().toLocaleDateString() },
    isCancelled: { type: Boolean, default: false },
})

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPassword: { type: String, required: true },
    userMobile: { type: String, required: true },
    userAddress: { type: String, required: true },
    userState: { type: String },

    userIsSignedIn: { type: Boolean },

    userIsSignedIn: { type: Boolean },
    userCart: [cartSchema],
    // userCardNumber: { type: String },
    // userCardExpiry: { type: String },
    userIsSeller: { type: Boolean, required: true },
    userIsAdmin: { type: Boolean, default: false },
    userRequestedProducts: [String],
    userBankAccountNumber: { type: String },
    userIfscCode: { type: String },
    userGstNumber: { type: String },
    userPanNumber: { type: String },
    userAadharNumber: { type: String },
    productsOnSale: [productsOnSaleSchema],
    // userStateId: { type: String, required: true },
    userOrderHistory: [orderHistorySchema]
})

const UserModel = mongoose.model("UserModel", userSchema)

module.exports = UserModel;


