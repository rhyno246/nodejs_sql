const pool = require('../utils/db');
const monent =  require('moment');
module.exports = {
    CreateComment : (data, callBack) => {
        pool.query(
            `insert into comments(comment, createdAt , userId, postId) values (?,?,?,?)`,
            [
                data.comment,
                monent(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                data.userId,
                data.postId,
            ],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results)
            }
        )
    },
    getComment : (id , callBack) => {
        pool.query(
            `select c.*,  user.id as userId, firstName, lastName, coverPic from comments as c join users as user on (user.id = c.userId)
            where c.postId = ? order by c.createdAt desc
            `,
            [id],
            (error, results , fields) => {
                if(error){
                    return callBack(error)
                 }
                 return callBack(null , results)
            }
        )
    },
    getAllCommentAdmin : (callBack) => {
        pool.query(
            `select c.*,  user.id as userId, firstName, lastName, coverPic from comments as c join users as user on (user.id = c.userId)
            order by c.createdAt desc
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
    deleteCommentAdmin : (id, callBack) => {
        pool.query(
            `delete from comments where id = ?`,
            [id],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results[0])
            }
        )
    },
    getCommentProfile : (id , callBack) => {
        pool.query(
            `select c.*,  post.id as postId, title , image , category from comments as c join posts as post on (post.id = c.postId)
            where c.userId = ? order by c.createdAt desc
            `,
            [id],
            (error, results , fields) => {
                if(error){
                    return callBack(error)
                 }
                 return callBack(null , results)
            }
        )
    }
}