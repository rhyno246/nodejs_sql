const pool = require('../utils/db');
module.exports = {
    createPost : (data, callBack) => {

    },
    getAdminPost : callBack => {
        pool.query(
            `select post.*, user.id as userId, firstName, lastName, coverPic from posts as post join users user on (user.id = post.userId)`,
            [],
            (error, results , fields) => {
                if(error){
                    return callBack(error)
                 }
                 return callBack(null , results)
            }
        )
    },
}