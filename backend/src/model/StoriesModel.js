const pool = require('../utils/db');
const monent =  require('moment');
module.exports = {
    CreateStories : (data, callBack) => {
        pool.query(
            `insert into stories (image, userId, createdAt) values (?,?,?)`,
            [
                data.image,
                data.id,
                monent(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
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