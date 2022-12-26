const { createUser, getUser , getUserById , updateUser , deleteUser, userLogin } = require('../controller/userController');
const express = require('express');
const { checkAuthorization } = require('../middleware/auth');
const router = express.Router();


router.route('/').
    get(checkAuthorization ,getUser).
    post(createUser).
    patch(checkAuthorization ,updateUser).
    delete(checkAuthorization,deleteUser);

router.route('/login')
    .post(userLogin);
router.route('/:id')
.get(checkAuthorization , getUserById);



module.exports = router;
