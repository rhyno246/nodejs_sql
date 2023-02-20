const { CreateCategory } = require("../controller/CategoryController");
const { checkAuthorization, checkRole } = require("../middleware/auth");
const express = require('express');
const router = express.Router();

router.route('/admin/category').post(checkAuthorization , checkRole('admin') , CreateCategory)

module.exports = router;