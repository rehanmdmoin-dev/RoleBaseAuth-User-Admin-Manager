const express=require('express');
const AuthEjsController = require('../../controller/api/AuthEjsController');
const AuthCheck = require('../../middleware/authCheck');
const AdminAuthCheck = require('../../middleware/adminAuthCheck');
const ManagerAuthCheck = require('../../middleware/managerAuthCheck');


const router=express.Router();



router.get('/register',AuthEjsController.register)
router.post('/register/store',AuthEjsController.registerstore)
router.get('/login',AuthEjsController.login)
router.post('/login/store',AuthEjsController.loginstore)
router.get('/dashboard',AuthCheck,AuthEjsController.dashboard);
router.get('/logout',AuthCheck,AuthEjsController.logout);


router.get('/admin/login',AuthEjsController.adminlogin)
router.post('/admin/login/store',AuthEjsController.adminloginstore)

router.get('/admin/dashboard',AuthEjsController.admindashboard);
router.get('/admin/logout',AdminAuthCheck,AuthEjsController.adminlogout);

router.get('/manager/login',AuthEjsController.managerlogin)
router.post('/manager/login/store',AuthEjsController.managerloginstore)
router.get('/manager/dashboard',ManagerAuthCheck,AuthEjsController.managerdashboard);
router.get('/manager/logout',ManagerAuthCheck,AuthEjsController.managerlogout);



module.exports=router;