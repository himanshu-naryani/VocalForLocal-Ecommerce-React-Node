const ProductModel = require('../Models/Products');
const UserModel = require("../Models/Users");
const { all } = require('../Routes/routes');
const { v4: uuidv4 } = require('uuid');
const Joi = require('@hapi/joi')
const moment = require('moment');

const validations = require('../Validations/ProductValidations');
const { valid } = require('joi');
const { json } = require('body-parser');
const { ascending, descending, descendingByDate } = require('../Utilities/sort');
const { countDocuments } = require('../Models/Products');
const { response } = require('express');

// const createProduct = async (req, res, next) => {
//     try {
//         const product = new ProductModel(req.body);
//         await product.save();
//         return res.status(200).json(product);
//     }
//     catch (err) {
//         console.log(err)
//         return res.status(400).json({ message: err.message })
//     }
// }

const createProduct = async (req, res, next) => {
    console.log("before try")
    try {
        const product = new ProductModel();
        console.log("in post")
        product.productName = req.body.productName
        product.sellerEmailId = req.body.sellerEmailId
        product.productId = uuidv4()

        product.productState = req.body.productState

        product.productImages = req.body.productImages

        product.productPrice = req.body.productPrice

        product.productDescription = req.body.productDescription

        product.quantityAvailable = req.body.quantityAvailable || null

        product.productCategory = req.body.productCategory

        product.keywords = req.body.keywords

        await validations.newProductValidation.validateAsync(req.body)
        await product.save();
        console.log("posted")
        return res.status(200).json(product);


    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }
}

const allProducts = async (req, res, next) => {
    try {
        const results = await ProductModel.find({});

        if (req.query.sort === "low")
            results.sort(ascending);

        else if (req.query.sort === "high")
            results.sort(descending);

        return res.status(200).json(results)
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }
};

const getAllProducts = async (req, res, next) => {
    try {
        const allProducts = await ProductModel.find({});
        return res.status(200).json(allProducts);

    }
    catch (err) {
        return res.status(400).json(err);
    }
}


const getAllProductsByState = async (req, res) => {
    console.log("before try")
    try {
        const productsByState = await ProductModel.find({ "productState": req.params.productState });
        return res.status(200).json({ data: productsByState });
    }
    catch (err) {
        return res.status(400).json(err);
    }
}

const allProductsByCategory = async (req, res, next) => {
    try {
        ProductModel.find({ productCategory: req.params.category }, (err, products) => {
            if (err)
                return res.status(400).json({ message: err.message })
            if (req.query.sort === "low")
                products.sort(ascending);
            else if (req.query.sort === "high")
                products.sort(descending);
            res.status(200).json(products);

        });
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message })
    }
}

const similarCategoryProducts = async (req, res, next) => {
    try {

        console.log(req.body.productCategory);
        console.log(req.body.productId);

        const products = await ProductModel.find({ $and: [{ productCategory: req.body.productCategory }, { productId: { $ne: req.body.productId } }] });

        console.log('similar category');

        let threeProducts = [];
        for (let i = 0; i < 2; i++) {
            threeProducts[i] = products[i];
        }
        return res.status(200).json(threeProducts);
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
}


const getProducts = async (req, res, next) => {
    try {
        const allproducts = await ProductModel.find({});
        return res.status(200).json(allproducts);
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }
}

const searchedProduct = async (req, res, next) => {
    try {
        const matchedProducts = await ProductModel.find({ keywords: { $all: [req.params.product] } })

        if (req.query.sort === "low")
            matchedProducts.sort(ascending);

        else if (req.query.sort === "high")
            matchedProducts.sort(descending);

        return res.status(200).json(matchedProducts)
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }
}
const sellerProducts = async (req, res, next) => {
    try {
        const matchedProducts = await ProductModel.find({ sellerEmailId: req.query.email })
        return res.status(200).json(matchedProducts)
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }
}
const adminApprovalPendingProducts = async (req, res, next) => {
    try {
        let newProducts = []
        let pendingProducts = await ProductModel.find({ isRejected: false, approvalDate: null })
        let matchedUser = []
        for (let i = 0; i < pendingProducts.length; i++) {
            matchedUser.push(await UserModel.find({ userEmail: pendingProducts[i].sellerEmailId }))
            // console.log(matchedUser[i][0].userName)
            // Object.assign(pendingProducts[i], {userName: matchedUser[i][0].userName });
            // newProducts.push()
            // pendingProducts[i].userMobile = matchedUser[i][0].userMobile
            // pendingProducts[i].userState = matchedUser[i][0].userState
            // let newObj = pendingProducts[i]
            // newObj.userName = matchedUser[i][0].userName
            // pendingProducts[i] = newObj

            newObj = {
                productName: pendingProducts[i].productName,
                productPrice: pendingProducts[i].productPrice,
                productImages: pendingProducts[i].productImages,
                productDescription: pendingProducts[i].productDescription,
                userName: matchedUser[i][0].userName, userMobile: matchedUser[i][0].userMobile
            }


            newProducts.push(newObj)
        }
        console.log(newProducts[0])
        return res.status(200).json(newProducts)
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }
}
const adminApprovedProducts = async (req, res, next) => {


    try {
        if (req.body.approvalStatus) {
            await ProductModel.updateOne({ productId: req.body.productId }, { $set: { approvalDate: new Date().toLocaleDateString() } })

        }
        else {
            await ProductModel.updateOne({ productId: req.body.productId }, { $set: { isRejected: true } })
        }
        return res.status(200).json({ message: "Product approval succesful" })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: "error while approving" })
    }
}
const orderCancelUpdateQuantity = async (req, res, next) => {
    console.log("working update")

    try {
        console.log(req.body.productId);
        console.log("body", req.body.productQuantity);

        //const filter = { _id:req.body.productId };
        //await ProductModel.findOneAndUpdate(filter,{ quantityAvailable: req.body.productQuantity })
        const quantity = req.body.productQuantity
        await ProductModel.updateOne({ productId: req.body.productId }, { $inc: { quantityAvailable: quantity } })

        console.log("changed")
        return res.status(200).json({ message: "quantity changed succesfully" })



    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }

}
const getProductByIdIndrani = async (req, res) => {
    try {
        console.log(req.params.productId)
        const product = await ProductModel.find({ productId: req.params.productId });
        console.log(product)
        return res.status(200).json(product);
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }

}
const updateOrderRating = async (req, res, next) => {
    console.log("working")
    console.log(req.body);
    try {
        await ProductModel.updateOne({ productId: req.body.productId }, { averageRating: req.body.averageRating })
        console.log("working rating")
        return res.status(200).json({ message: "product rating updated succesfully" })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }

}

const updatedProductQuantity = async (req, res, next) => {
    var productIdCount = 0;
    console.log("working")
    await ProductModel.countDocuments({ productId: req.body.productId }, (err, count) => {
        console.log("working")
        if (err) {
            console.log(err);

        }
        else {
            console.log("else block")
            productIdCount = count;
        }
    })
    console.log(productIdCount)
    if (productIdCount == 1) {
        try {
            if (req.body.quantityAvailable > 0) {
                await ProductModel.updateOne({ productId: req.body.productId }, { $set: { quantityAvailable: req.body.quantityAvailable } })

                return res.status(200).json({ message: "quantity changed succesfully" })
            }
            return res.status(400).json({ message: "quantity cant be negative" });

        }
        catch (err) {
            console.log(err)
            return res.status(400).json({ message: err.message })
        }
    }
    else
        return res.status(400).json({ message: "invalid productId" })
}
const updateProductRequestCount = async (req, res, next) => {
    console.log("working")
    console.log(req.params);
    try {
        await ProductModel.updateOne({ productId: req.params.productId }, { $inc: { productRequestCount: 1 } })
        console.log("working")
        return res.status(200).json({ message: "product request updated succesfully" })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }

}

const getLatestProducts = async (req, res) => {
    try {

        let products = await ProductModel.find({ approvalDate: { $exists: true, $ne: null } });

        products.sort(descendingByDate);
        const limit = products.length > 12 ? 12 : products.length;

        const latestProducts = [];
        for (let i = 0; i < limit; i++) {
            latestProducts[i] = products[i];
        }

        return res.status(200).json(latestProducts);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message })
    }
}

const topMostLatestProducts = async (req, res, next) => {
    try {
        const products = await ProductModel.find({ approvalDate: { $exists: true, $ne: null } });
        products.sort(descendingByDate);

        const latestProducts = [];
        for (let i = 0; i < 3; i++) {
            latestProducts[i] = products[i];
        }
        return res.status(200).json(latestProducts);

    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message })
    }
}

const getProductRating = async (req, res) => {
    const isValidId = await (ProductModel.exists({ productId: req.params.productId }))
    if (!isValidId) {
        return res.status(400).json({ message: "invalid product id!" })
    }
    try {
        const rating = await ProductModel.find({ productId: req.params.productId }, "averageRating")
        return res.status(200).json(rating);
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }
}

const removeProduct = async (req, res) => {
    console.log(req.query.productId)
    try {
        await ProductModel.updateOne({ productId: req.query.productId }, { $set: { sellerEmailId: null } })
        return res.status(200).json({ message: "Succesfully Removed Product" })
    }
    catch (err) {
        return res.status(400).json({ message: err.message })
    }
}
const deleteProduct = async (req, res) => {
    console.log('working')
    try {
        const post = await ProductModel.remove({ productId: req.params.productId });
        console.log('deleted');
        alert('deleted succesfully');
        return res.status(200).json(post);

    }
    catch (err) {
        res.status(400).json({ message: err });
    }
}

const modifyProductDetailsBySeller = async (req, res) => {
    const isValidId = await (ProductModel.exists({ productId: req.body.productId }))
    if (!isValidId || req.body.quantity > 1000 || req.body.price <= 0 || req.body.quantity < 0)
        return res.status(400).json({ message: "Unable to update! An error occured!!" })
    try {
        await ProductModel.updateOne({ productId: req.body.productId }, { $set: { productPrice: req.body.price, quantityAvailable: req.body.quantity } })
        return res.status(200).json({ message: "Succesfully Updated Product Details" })
    }
    catch (err) {
        return res.status(400).json({ message: err.message })
    }
}


const getAllProductNames = async (req, res, next) => {
    try {
        let allProducts = await ProductModel.find({}, { productName: 1 }).distinct("productName");
        allProducts = allProducts.map(product => product.toLowerCase());
        allProducts = Array.from(new Set(allProducts))
        return res.status(200).json(allProducts);
    }
    catch (err) {
        return res.status(400).json(err);
    }
}

const getAllProductsByName = async (req, res, next) => {
    try {
        const query = new RegExp(req.query.productName);
        const allProducts = await ProductModel.find({ productName: { $regex: query, $options: 'i' } });
        //console.log(allProducts[0])
        //const allProductsByName = allProducts.map(product => product.productName);
        return res.status(200).json(allProducts);
    }
    catch (err) {
        return res.status(400).json(err);
    }
}


const getProductById = async (req, res, next) => {
    try {
        const product = await ProductModel.find({ productId: req.params.id })
        if (product.length === 0) return res.status(400).json({ message: "There is no product with given Id" })
        return res.status(200).json(product)
    }
    catch (err) {
        return res.status(400).json({ message: err.message })
    }

}


module.exports = {
    createProduct,
    allProducts,
    allProductsByCategory,
    searchedProduct,
    adminApprovalPendingProducts,
    adminApprovedProducts,
    getAllProducts,
    getProducts,
    adminApprovedProducts,
    updatedProductQuantity,
    updateProductRequestCount,
    getProductRating,
    sellerProducts,
    removeProduct,
    deleteProduct,
    getLatestProducts,
    modifyProductDetailsBySeller,
    getAllProductsByState,

    similarCategoryProducts,

    getAllProductNames,
    getAllProductsByName,

    topMostLatestProducts,

    orderCancelUpdateQuantity,
    updateOrderRating,
    getProductByIdIndrani,
    getProductById,

}





