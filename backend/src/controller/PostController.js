const { getAdminPost, createPost, deletePost, getPostById, updateAdminPost, getNewsClient, getNewsClientDetail, getAllPostInHome, getNewsCategory } = require("../model/PostModel");
const path = require('path');

module.exports = {
    createPost : (req, res) => {
        const body = req.body;
        if(body.image){
            body.image = `${req.protocol}://${req.get("host")}/${ body.image}`;
        }
        createPost(body, (error , results) => {
            if(!results) {
                return res.status(409).json({ 
                    success : false , message : "Something went wrong !" 
                })
            }
            if(error){
                console.log(error);
                return res.status(500).json({
                    success : false,
                    message : 'Database connection error'
                });
            }
            return res.status(200).json({
                success : true,
                message : 'Create Post success',
                data : results
            })
        })
    },

    contentUploadImage : (req, res) => {
        var TempFile = req.file;
        if(path.extname(TempFile.originalname).toLowerCase() === ".png" || ".jpg" || ".svg"){
            res.status(200).json({
                uploaded: true,
                url: `${req.protocol}://${req.get("host")}/${
                TempFile.originalname
                }`,
            });
        }
    },

    getAdminPost : (req, res) => {
        getAdminPost((error , results) => {
            if(error){
                console.log(error);
                return;
            }
            return res.json({
                success : true,
                data : results
            })
        })
    },

    deletePost : (req, res) => {
        const id = req.params.id;
        deletePost(id , (error) => {
            if(error){
                console.log(error);
                return;
            }
            return res.json({
                success : true,
                message : "Delete success"
            })
        })
    },
    getPostById : (req , res) => {
        const id = req.params.id;
        getPostById(id, (error , results) => {
            if(error){
                console.log(error);
                return;
            }
            if(!results) {
                return res.json({
                    success : false,
                    message : "Post not found"
                })
            }
            return res.json({
                success : true,
                data : results
            })
        });
    },
    updateAdminPost : (req, res) => {
        const body = req.body;
        if(req.file){
            body.image = `${req.protocol}://${req.get("host")}/${ body.image}`
        }
        updateAdminPost(body , (error) => {
            if(error){
                console.log(error);
                return;
            }
            return res.json({
                success : true,
                message : "Updated success"
            })
        })
    },
    getNewsClient : (req, res) => {
        const slug =  req.params.slug;
        getNewsClient(slug, (error , results) => {
            if(error){
                console.log(error);
                return;
            }
            if(!results) {
                return res.json({
                    success : false,
                    message : "Post not found"
                })
            }
            return res.json({
                success : true,
                data : results
            })
        });
    },
    getNewsClientDetail : (req, res) => {
        const id =  req.params.id;
        getNewsClientDetail(id, (error , results) => {
            if(error){
                console.log(error);
                return;
            }
            if(!results) {
                return res.json({
                    success : false,
                    message : "Post not found"
                })
            }
            return res.json({
                success : true,
                data : results
            })
        });
    },
    getAllPostInHome : (req, res) => {
        getAllPostInHome((error , results) => {
            if(error){
                console.log(error);
                return;
            }
            return res.json({
                success : true,
                data : results
            })
        })
    },
    getNewsCategory : (req,res) => {
        const id =  req.params.id;
        getNewsCategory(id, (error , results) => {
            if(error){
                console.log(error);
                return;
            }
            if(!results) {
                return res.json({
                    success : false,
                    message : "Post not found"
                })
            }
            return res.json({
                success : true,
                data : results
            })
        });
    }
}