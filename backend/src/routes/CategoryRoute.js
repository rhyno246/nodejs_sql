const { CreateCategory, getAdminCategory, deleteCategory, getCategoryById } = require("../controller/CategoryController");
const { checkAuthorization, checkRole } = require("../middleware/auth");
const express = require('express');
const router = express.Router();

router.route('/admin/category').post(checkAuthorization , checkRole('admin') , CreateCategory)
.get(checkAuthorization , checkRole('admin', 'content'), getAdminCategory)

router.route('/admin/category/:id').delete(checkAuthorization , checkRole('admin'), deleteCategory)
.get(checkAuthorization , checkRole('admin', 'content'), getCategoryById)

module.exports = router;