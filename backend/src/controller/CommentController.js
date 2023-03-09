const { CreateComment, getComment, getAllCommentAdmin, deleteCommentAdmin, getCommentProfile } = require("../model/CommentModel");

module.exports = {
    CreateComment : (req,res) => {
        const body = req.body;
        CreateComment(body, (error , results) => {
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
                message : 'Comment create success',
                data : results
            })
        })
    },
    getComment : (req, res) => {
        const id = req.params.id
        getComment(id, (error , results) => {
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
    getAllCommentAdmin : (req, res) => {
        getAllCommentAdmin((error , results) => {
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
    deleteCommentAdmin : (req, res) => {
        const id = req.params.id;
        deleteCommentAdmin(id , (error) => {
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
    getCommentProfile : (req , res) => {
        const id = req.params.id
        getCommentProfile(id, (error , results) => {
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