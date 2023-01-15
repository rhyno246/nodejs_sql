const { createUser, getUser , getUserById , updateUser , deleteUser, userLogin , forgotPassword , resetPassword  } = require('../controller/userController');
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
router.route('/:id').get(getUserById);

//admin

router.route('/admin/users').get(checkAuthorization , checkRole('admin') , getUser);





module.exports = router;
