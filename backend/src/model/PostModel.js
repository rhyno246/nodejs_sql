const pool = require('../utils/db');
const monent =  require('moment');
module.exports = {
    createPost : (data, callBack) => {
        console.log(data)
        pool.query(
            `insert into posts(title, description , content, userId , status , category, image, createdAt) values (?,?,?,?,?,?,?,?)`,
            [
                data.title,
                data.description,
                data.content,
                data.id,
                data.status,
                data.category,
                data.image,
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