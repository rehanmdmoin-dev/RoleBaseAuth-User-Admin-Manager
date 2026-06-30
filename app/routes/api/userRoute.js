const express=require('express');
const userController = require('../../controller/userController');
const validate=require('../../middleware/validate')
const userValidation = require('../../utils/userValidation');


const router=express.Router();


router.post('/create/user',validate(userValidation),userController.userCreate)





module.exports=router;