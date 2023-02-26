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
    },
    CreateListImage : (data, callBack) =>{
        pool.query(
            `insert into stories_image (title, image , storiesId , createdAt) values (?,?,?,?)`,
            [
                data.title,
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
    },
    getAllAdminStories : (callBack) => {
        pool.query(
            `select * from stories order by stories.createdAt desc `,
            [],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results)
            }
        )
    },
    getListImage : (id , callBack) => {
        pool.query(
            ` select * from stories_image where storiesId = ? `,
            [ id ],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results)
            }
        )
    }
}