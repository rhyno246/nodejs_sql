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
    getStoriesDetail : (id, callBack) => {
        pool.query(
            ` select * from stories where id = ? `,
            [ id ],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results[0])
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
    },
    getListImageChild : (id, callBack) => {
        pool.query(
            ` select * from stories_image where id = ? `,
            [ id ],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results)
            }
        )
    },
    updateListImageChild : (data , callBack) => {
        pool.query(
            `update stories_image set title= ? , image= ?, createdAt=? where id = ? `,
            [   
                data.title,
                data.image,
                monent(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                data.id 
            ],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results)
            }
        )
    },
    updateStories : (data, callBack) => {
        pool.query(
            `update stories set image= ?, userId =? , createdAt=? where id = ? `,
            [   
                data.image,
                data.userId,
                monent(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                data.id 
            ],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results)
            }
        )
    },
    deleteListImageChild : (id , callBack) => {
        pool.query(
            `delete from stories_image where id = ?`,
            [id],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results[0])
            }
        )
    },
    deleteStories : (id, callBack) => {
        pool.query(
            `delete from stories where id = ?`,
            [id],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results[0])
            }   
        )
    },
    getAllClientStories : (callBack) => {
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
    getClientDetailStories : (id, callBack) => {
        pool.query(
            ` select * from stories_image where storiesId = ? order by stories_image.createdAt desc `,
            [ id ],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results)
            }
        )
    },
    getClientStoriesId : (id, callBack) => {
        pool.query(
            ` select * from stories where id = ? order by stories.createdAt desc `,
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