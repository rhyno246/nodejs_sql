const moment =  require('moment');
const pool = require('../utils/db');
const slug = require('slug');
module.exports = {
    CreateCategory : (data, callBack) => {
        pool.query(
            `insert into category (name, slug , userId, createdAt) values (?,?,?,?)`,
            [
                data.name,
                slug(data.name),
                data.id,
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            ],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results)
            }
        )
    },
    getAdminCategory : callBack => {
        pool.query(
            `select categories.*,  user.id as userId, firstName, lastName, coverPic , role from category as categories join users as user on (user.id = categories.userId)
            order by categories.createdAt desc
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
    deleteCategory : (id, callBack) => {
        pool.query(
            `delete from category where id = ?`,
            [id],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results[0])
            }
        )
    },
    getCategoryById : (id, callBack) => {
        pool.query(
            `select id , name , slug , userId , createdAt from category where id = ?`,
            [id],
            (error, results , fields) => {
                if(error){
                    return callBack(error)
                 }
                 return callBack(null , results[0])
            }
        )
    }
}