const pool = require('../utils/db');

module.exports = {
    create : (data, callBack) => {
        pool.query(
            `insert into register(firstName, lastName, gender, email, password , phone) values(?,?,?,?,?,?)` ,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.phone

            ],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results)
            }
        )
    },
    getUser : callBack => {
        pool.query(
            `select id ,firstName, lastName, gender, email, password , phone from register`,
            [],
            (error, results , fields) => {
                if(error){
                    return callBack(error)
                 }
                 return callBack(null , results)
            }
        )
    },
    getUserById : (id , callBack) => {
        pool.query(
            `select id ,firstName, lastName, gender, email, password , phone from register where id = ?`,
            [id],
            (error, results , fields) => {
                if(error){
                    return callBack(error)
                 }
                 return callBack(null , results[0])
            }
        )
    },
    updateUser : (data, callBack) => {
        pool.query(
            `update register set firstName=?, lastName=?, gender=?, email=?, password=?, phone=? where id = ?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.phone,
                data.id
            ],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results[0])
            }
        )
    },
    deleteUser : (data, callBack) => {
        pool.query(
            `delete from register where id = ?`,
            [
                data.id
            ],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results[0])
            }
        )
    }
}