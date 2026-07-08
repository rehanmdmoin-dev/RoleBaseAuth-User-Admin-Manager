const express=require('express');
const AuthController = require('../../controller/api/AuthController');
const Auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const userValidation = require('../../utils/userValidation');
const adminRoleCheck = require('../../middleware/adminRoleCheck');
const router=express.Router();



router.post('/register', validate(userValidation), AuthController.register)
router.post('/login', validate(userValidation.loginValidation), AuthController.login)
router.use(Auth)
router.get('/dashboard',AuthController.dashboard)
router.post('/update-profile', validate(userValidation.updateProfileValidation), AuthController.updateProfile)
router.post('/assign-role', adminRoleCheck, validate(userValidation.assignRoleValidation), AuthController.assignRole)
router.post('/logout', AuthController.logout)
router.post('/refresh-token', AuthController.refreshToken)

module.exports=router;