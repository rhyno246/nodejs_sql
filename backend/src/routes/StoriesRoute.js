const { CreateStories, getAllAdminStories, CreateListImage, getListImage, getListImageChild, updateListImageChild, getStoriesDetail, updateStories, deleteListImageChild, deleteStories, getAllClientStories, getClientDetailStories, getClientStoriesId } = require('../controller/StoriesController');
const { checkAuthorization, checkRole } = require('../middleware/auth');
const { upload } = require('../middleware/uploadImage');
const express = require('express');
const router = express.Router();


router.route('/admin/stories').get(checkAuthorization , checkRole('admin' , 'content'), getAllAdminStories)
.post(upload.single('file') ,checkAuthorization , checkRole('admin' , 'content') , CreateStories)
.patch(upload.single('file') ,checkAuthorization , checkRole('admin' , 'content'), updateStories)


router.route('/admin/stories/:id').get(checkAuthorization , checkRole('admin' , 'content'), getStoriesDetail)
.delete(checkAuthorization , checkRole('admin' , 'content'), deleteStories)


router.route('/admin/list').post(upload.single('file') ,checkAuthorization , checkRole('admin' , 'content') , CreateListImage)
router.route('/admin/list/:id').get(checkAuthorization , checkRole('admin' , 'content'), getListImage)
.delete(checkAuthorization , checkRole('admin' , 'content'), deleteListImageChild)


router.route('/admin/list/child/:id').get(checkAuthorization , checkRole('admin' , 'content'), getListImageChild)
router.route('/admin/list/child').patch(upload.single('file') , checkAuthorization , checkRole('admin', 'content'), updateListImageChild)

//client 
router.route('/stories').get(getAllClientStories)
router.route('/stories/list/:id').get(getClientDetailStories)
router.route('/stories/:id').get(getClientStoriesId)


module.exports = router;
