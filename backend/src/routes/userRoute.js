const { 
    createUser, 
    getUser , 
    getUserById , 
    updateAdminUser , 
    deleteUser, 
    userLogin , 
    forgotPassword , 
    resetPassword,  
    createUserAdmin
} = require('../controller/userController');
const express = require('express');
const { checkAuthorization , checkRole } = require('../middleware/auth');
const { upload } = require('../middleware/uploadImage');
const router = express.Router();
router.route('/users').
    post(upload.single('file') , createUser).
    delete(checkAuthorization,deleteUser);
router.route('/login').post(userLogin);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:email').post(resetPassword);

//admin

router.route('/admin/users')
.get(checkAuthorization , checkRole('admin', 'content') , getUser)
.post(checkAuthorization , checkRole('admin') , createUserAdmin)
.patch(checkAuthorization , checkRole('admin') , updateAdminUser);

router.route('/admin/users/:id').get(checkAuthorization , checkRole('admin', 'content') , getUserById);





module.exports = router;
