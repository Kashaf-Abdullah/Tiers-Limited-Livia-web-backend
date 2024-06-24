const {check}=require('express-validator')





exports.loginValidator=[
    check('email','Please include a valid email').isEmail().normalizeEmail({

        gmail_remove_dots:true
    }),

    check('password','Password is required').not().isEmpty(),

]