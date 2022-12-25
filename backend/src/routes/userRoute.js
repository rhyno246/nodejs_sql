const { createUser, getUser , getUserById , updateUser , deleteUser } = require('../controller/userController');
const express = require('express');
const router = express.Router();
router.route('/').get(getUser).post(createUser).patch(updateUser).delete(deleteUser);
router.route('/:id').get(getUserById);
module.exports = router;
