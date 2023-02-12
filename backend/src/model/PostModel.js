const pool = require('../utils/db');
const monent =  require('moment');
module.exports = {
    createPost : (data, callBack) => {
        pool.query(
            `insert into posts(title, image, description, content, userId , status , category, createdAt) values (?,?,?,?,?,?,?,?)`,
            [
                data.title,
                data.image,
                data.description,
                data.content,
                data.id,
                data.status,
                data.category,
                monent(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            ],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results)
            }
        )
    },
    getAdminPost : callBack => {
        pool.query(
            `select post.*, user.id as userId, firstName, lastName, coverPic from posts as post join users user on (user.id = post.userId)
            order by post.createdAt desc
            `,
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