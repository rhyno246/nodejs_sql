const { createUser, getUser , getUserById , updateUser , deleteUser, userLogin , forgotPassword , resetPassword  } = require('../controller/userController');
const express = require('express');
const { checkAuthorization } = require('../middleware/auth');
const router = express.Router();


router.route('/').
    get(getUser).
    post(checkAuthorization ,createUser).
    patch(checkAuthorization ,updateUser).
    delete(checkAuthorization,deleteUser);

router.route('/login')
    .post(userLogin);

router.route('/forgot-password')
    .post(checkAuthorization , forgotPassword);
router.route('/reset-password/:email')
    .post(checkAuthorization , resetPassword);
   
router.route('/:id')
.get(checkAuthorization , getUserById);



module.exports = router;
