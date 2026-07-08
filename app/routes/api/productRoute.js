const express = require('express');
const ProductController = require('../../controller/api/ProductController');
const Auth = require('../../middleware/auth');
const roleAccessCheck = require('../../middleware/roleAccessCheck');
const upload = require('../../middleware/upload');
const router = express.Router();

// User routes
router.post('/user/create/product', Auth, roleAccessCheck(['user']), upload.single('image'), ProductController.createProduct);
router.get('/user/get/product', Auth, roleAccessCheck(['user']), ProductController.getProduct);

// Admin routes
router.post('/admin/create/product', Auth, roleAccessCheck(['admin']), upload.single('image'), ProductController.createProduct);
router.get('/admin/get/product', Auth, roleAccessCheck(['admin']), ProductController.getProduct);
router.put('/admin/update/product/:id', Auth, roleAccessCheck(['admin']), upload.single('image'), ProductController.updateProduct);
router.delete('/admin/delete/product/:id', Auth, roleAccessCheck(['admin']), ProductController.deleteProduct);

module.exports = router;