const { 
    createUser, 
    getUser , 
    getUserById , 
    updateUser , 
    deleteUser, 
    userLogin , 
    forgotPassword , 
    resetPassword,  
    createUserAdmin
} = require('../controller/userController');
const express = require('express');
const { checkAuthorization , checkRole } = require('../middleware/auth');
const router = express.Router();
router.route('/users').
    post(createUser).
    patch(updateUser).
    delete(checkAuthorization,deleteUser);
router.route('/login').post(userLogin);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:email').post(resetPassword);

//admin

router.route('/admin/users')
.get(checkAuthorization , checkRole('admin', 'content') , getUser)
.post(checkAuthorization , checkRole('admin') , createUserAdmin);
router.route('/admin/users/:id').get(checkAuthorization , checkRole('admin', 'content') , getUserById);





module.exports = router;
