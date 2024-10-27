const express = require("express");
const router = express.Router();
const authController = require('../controllers/userController');
const productController=require('../controllers/productController');
const orderController=require('../controllers/orderController');
const {verifyToken}=require('./../middleware/authmiddleware');


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/userDetails',verifyToken,authController.userDetails);
router.get('/logout',authController.logout);

//admin-panel
router.get('/alluser',verifyToken,authController.allUser);
router.post('/updateUser',verifyToken,authController.updateUser)

//product
router.post('/upload-Product',verifyToken,productController.UploadProductController);
router.get('/getAllProduct',verifyToken,productController.getProduct)
router.post("/update-product",verifyToken,productController.updateProduct)
router.get("/get-categoryProduct",productController.getCategoryProduct)
router.post('/category-product',productController.getCategoryWiseProduct)
router.post('/product-details',productController.getProductDetails)
router.get('/search',productController.searchProduct)
router.post('/filter-product',productController.filterProductController)

//user add To cart
router.post('/addToCart',verifyToken,authController.addCartController)
router.get('/countAddToCartProduct',verifyToken,authController.countAddToCart)
router.get('/view-card-product',verifyToken,authController.addToCartViewProduct)
router.post('/update-cart-product',verifyToken,authController.updateAddToCartProduct)
router.post('/delete-cart-product',verifyToken,authController.deleteAddToCartProduct)

router.post('/checkout',verifyToken,orderController.paymentController);
router.post('/verify-payment',orderController.paymentverification)
router.post('/fetchOrder',verifyToken,orderController.fetchAllOrder);
router.get('/order-list',verifyToken,orderController.getAllOrderList);




module.exports = router;

