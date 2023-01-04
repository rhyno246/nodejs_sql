const { createUser, getUser , getUserById , updateUser , deleteUser, userLogin , forgotPassword , resetPassword  } = require('../controller/userController');
const express = require('express');
const { checkAuthorization } = require('../middleware/auth');
const router = express.Router();
router.route('/').
    get(getUser).
    post(createUser).
    patch(updateUser).
    delete(checkAuthorization,deleteUser);
router.route('/login').post(userLogin);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:email').post(resetPassword);
router.route('/:id').get(getUserById);



module.exports = router;
