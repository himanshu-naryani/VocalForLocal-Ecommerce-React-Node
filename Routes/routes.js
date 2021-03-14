const express = require('express')
const router = express.Router();

const UserController = require('../Controllers/UserController')
const ProductController = require('../Controllers/ProductController')
const StateController = require('../Controllers/StateController')
const CategoryController = require('../Controllers/CategoryController');
const AdminController = require('../Controllers/AdminController');
const ProductModel = require('../Models/Products');
const UserModel = require('../Models/Users');

router.get('/', (req, res) => res.send("Server is fine"))

router.get('/products', ProductController.allProducts) //query: sort=high,low
router.get('/products/category/:category', ProductController.allProductsByCategory) //query: sort=high,low
router.get('/products/search/:product/', ProductController.searchedProduct)  //query: sort=high,low
router.get('/product/rating/:productId', ProductController.getProductRating) //params:productIds
router.get('/products/sold', ProductController.sellerProducts)
router.get('/products/state/:productState', ProductController.getAllProductsByState);

router.get('/latestProducts', ProductController.getLatestProducts)
router.get('/topLatestProducts', ProductController.topMostLatestProducts)

router.get('/products/unapproved', ProductController.adminApprovalPendingProducts)
router.get('/getAllProducts', ProductController.getAllProducts);

router.get('/getAllProductNames', ProductController.getAllProductNames);
router.get('/getAllProductsByName', ProductController.getAllProductsByName);

router.post('/getSimilarCategoryProducts', ProductController.similarCategoryProducts);

router.get('/getProfileDetails/:userId', UserController.getProfileDetails);
router.get('/startSelling', UserController.startSelling);
router.post('/createUser', UserController.createUser)
// router.post('/createOrder',UserController.createOrder)
router.post('/createProduct', ProductController.createProduct)
router.post('/createState', StateController.createState);
router.post('/createCategory', CategoryController.createCategory);
router.get('/getAllProducts', ProductController.getAllProducts);
router.get('/getProfileDetails/:userEmail', UserController.getProfileDetails);
router.post('/userSignIn', UserController.userSignIn);
router.put('/updatepassword', UserController.updatePassword);
router.post('/userverification', UserController.userVerification);

router.get('/getProducts', ProductController.getProducts);
router.get('/getStates', StateController.getStates);
router.get('/getCategories', CategoryController.getCategories);
router.get('/product/:productId', ProductController.getProductByIdIndrani);

// router.get('/getUsers',UserController.getUsers)

// router.put('/editUser/:id',UserController.editUser)
router.patch('/orderCancelUpdateQuantity', ProductController.orderCancelUpdateQuantity)
router.patch('/product/approved', ProductController.adminApprovedProducts);//body: productid="abcd", approvalStatus=true/false
router.patch('/users/makeadmintrue', AdminController.makeAdmin);//body: useremail:"abcd@c.com"
router.patch('/product/updatequantity', ProductController.updatedProductQuantity);//body: productid="abcd", productquantity=Number
router.patch('/product/updaterequestcount/:productId', ProductController.updateProductRequestCount);//params:productId="abcd"
router.patch('/products/removeseller', ProductController.removeProduct) // query:productId
router.patch('/updateRating', ProductController.updateOrderRating)
router.delete('/product/delete/:productId', ProductController.deleteProduct);
router.get('/getAllProducts', ProductController.getAllProducts);
router.get('/getProfileDetails/:userEmail', UserController.getProfileDetails);
router.get('/getOrder/:userEmail', UserController.getOrder);
router.get('/getProduct/:productId', ProductController.getProductById);
router.post('/userSignIn', UserController.userSignIn);
router.patch('/seller/updateproduct', ProductController.modifyProductDetailsBySeller);
router.put('/updateUser/:id', UserController.updateUserDetails);

router.patch('/orderCancelled', UserController.cancelOrder);
router.post('/cart/addproduct', UserController.addProductToCart);

router.post('/cart/removeproduct', UserController.deleteProductInCart);

module.exports = router;

