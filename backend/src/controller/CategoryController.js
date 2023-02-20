const { CreateCategory } = require("../model/CategoryModel");

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
    }
}