const pool = require('../utils/db');
const slug = require('slug');
const moment =  require('moment');
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
    getMenu : callBack => {
        pool.query(
            ` select * from category `,
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
    },
    updateCategory : (data, callBack) => {
        pool.query(
            `update category set name=?, slug=?, userId=?, createdAt=? where id = ? `,
            [
                data.name,
                slug(data.name),
                data.userId,
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                data.id
            ],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results)
            }
        )
    }
}