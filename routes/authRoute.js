const express = require('express');
// Initialize Express app
const router = express();
const auth=require('../middlewares/authMiddleware')
const authController=require('../controllers/authController')
const { loginValidator }=require('../helpers/validator')
router.post('/login',loginValidator,authController.loginUser)

module.exports=router
