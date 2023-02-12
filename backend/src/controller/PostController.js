const { getAdminPost, createPost } = require("../model/PostModel")

module.exports = {
    createPost : (req, res) => {
        const body = req.body;
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