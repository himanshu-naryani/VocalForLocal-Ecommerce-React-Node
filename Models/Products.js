const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    productName: { type: String },
    productId: { type: String, required: true },
    sellerEmailId:{type: String, required:true},
    //userId: { type: String, required: true },
    productState: {type: String, required: true},
    productImages: [String],
    productPrice: { type: Number },
    productDescription: { type: String },
    isRejected: { type: Boolean, default: false },
    approvalDate: { type: String ,default:null},
    quantityAvailable: { type: Number ,required:true},
    quantitySold: { type: Number,default: 0 },
    productRequestCount: { type: Number,default: 0 },
    averageRating: { type: Number,default: 0 },
    productCategory: { type: String},
    keywords:{type: [String]  },
    productState : {type:String , required:true}, //should get from user database in the backend...
  
})

const ProductModel = mongoose.model("ProductModel", productSchema)

module.exports = ProductModel;


