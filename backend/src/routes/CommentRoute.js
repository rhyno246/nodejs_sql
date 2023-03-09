const express = require('express');
const { checkAuthorization, checkRole } = require("../middleware/auth");
const { CreateComment, getComment, getAllCommentAdmin, deleteCommentAdmin, getCommentProfile } = require('../controller/CommentController');
const router = express.Router();

router.route('/comment').post(CreateComment)

router.route('/comment/profile/:id').get(getCommentProfile)

router.route('/comment/all/:id').get(getComment)

router.route('/admin/comment').get(checkAuthorization , checkRole('admin','content'), getAllCommentAdmin)

router.route('/admin/comment/:id').delete(checkAuthorization , checkRole('admin'), deleteCommentAdmin)



module.exports = router;