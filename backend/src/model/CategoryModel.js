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
    }
}