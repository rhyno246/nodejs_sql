const { CreateCategory, getAdminCategory, deleteCategory, getCategoryById } = require("../model/CategoryModel");

module.exports = {
    CreateCategory : (req,res) => {
        const body = req.body;
            CreateCategory(body, (error , results) => {
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
                    message : 'Create category success',
                    data : results
                })
            })
    },
    getAdminCategory : (req, res) => {
        getAdminCategory((error , results)=> {
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
    deleteCategory : (req, res) => {
        const id = req.params.id;
        deleteCategory(id , (error) => {
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
    getCategoryById : (req, res) => {
        const id = req.params.id;
        getCategoryById(id, (error , results) => {
            if(error){
                console.log(error);
                return;
            }
            if(!results) {
                return res.json({
                    success : false,
                    message : "Category not found"
                })
            }
            return res.json({
                success : true,
                data : results
            })
        });
    }
}