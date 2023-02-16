const pool = require('../utils/db');
const monent =  require('moment');
module.exports = {
    createPost : (data, callBack) => {
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
            `select post.*,  user.id as userId, firstName, lastName, coverPic , role from posts as post join users as user on (user.id = post.userId)
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
    deletePost : (id, callBack) => {
        pool.query(
            `delete from posts where id = ?`,
            [id],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results[0])
            }
        )
    },
    getPostById : (id , callBack) => {
        pool.query(
            `select id , title , image, description , content, userId , status , category from posts where id = ?`,
            [id],
            (error, results , fields) => {
                if(error){
                    return callBack(error)
                 }
                 return callBack(null , results[0])
            }
        )
    },
}