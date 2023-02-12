const { getAdminPost } = require("../model/PostModel")
const { create } = require("../model/userModel")

module.exports = {
    createPost : (req, res) => {
        create(body, (error , results) => {

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