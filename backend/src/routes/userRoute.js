const { createUser, getUser , getUserById , updateUser , deleteUser, userLogin } = require('../controller/userController');
const express = require('express');
const { checkAuthorization } = require('../middleware/auth');
const router = express.Router();


router.route('/').get(getUser).post(createUser).patch(updateUser).delete(deleteUser);
router.route('/login').post(userLogin);
router.route('/:id').get(getUserById);



module.exports = router;
