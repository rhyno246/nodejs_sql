const { CreateStories } = require("../model/StoriesModel");

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
    }
}