const { getAdminPost, createPost } = require("../model/PostModel");
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
    }
}