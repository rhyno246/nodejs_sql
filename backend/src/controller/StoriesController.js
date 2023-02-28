const { CreateStories, getAllAdminStories, CreateListImage, getListImage, getListImageChild, updateListImageChild, getStoriesDetail, updateStories, deleteListImageChild, deleteStories } = require("../model/StoriesModel");

module.exports = {
    CreateStories : (req,res) => {
        const body = req.body;
        if(body.image){
            body.image = `${req.protocol}://${req.get("host")}/${ body.image}`;
        }
        CreateStories(body, (error , results) => {
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
                message : 'Create Stories success',
                data : results
            })
        })
    },

    getStoriesDetail : (req, res) => {
        const id = req.params.id;
        getStoriesDetail(id, (error, results) => {
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

   



    CreateListImage : (req, res) => {
        const body = req.body;
        if(body.image){
            body.image = `${req.protocol}://${req.get("host")}/${ body.image}`;
        }
        CreateListImage(body, (error, results) => {
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
                message : 'Create list image success',
                data : results
            })
        })
    },
    getAllAdminStories : (req, res) => {
        getAllAdminStories((error, results) => {
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
    getListImage : (req, res) => {
        const id = req.params.id;
        getListImage(id , (error, results) => {
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
    getListImageChild : (req, res) => {
        const id = req.params.id;
        getListImageChild(id, (error, results) => {
            if(error){
                console.log(error);
                return;
            }
            return res.json({
                success : true,
                data : results[0]
            })
        })
    },
    updateListImageChild : (req, res) => {
        const body =  req.body;
        if(req.file){
            body.image = `${req.protocol}://${req.get("host")}/${ body.image}`;
        }
        updateListImageChild(body , (error) => {
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


    updateStories : (req, res) => {
        const body = req.body;
        if(req.file){
            body.image = `${req.protocol}://${req.get("host")}/${ body.image}`;
        }
        updateStories(body , (error) => {
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
    deleteListImageChild : (req , res) => {
        const id = req.params.id;
        deleteListImageChild(id , (error) => {
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
    deleteStories : (req, res) => {
        const id = req.params.id
        deleteStories(id,(error) => {
            if(error){
                console.log(error);
                return;
            }
            return res.json({
                success : true,
                message : "Delete success"
            })
        })
    }
}