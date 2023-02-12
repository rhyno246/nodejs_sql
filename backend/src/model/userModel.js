const pool = require('../utils/db');

module.exports = {
    create : (data, callBack) => {
        pool.query(
            `insert into users(firstName, lastName, gender, email, password, showpass , phone , coverPic) values(?,?,?,?,?,?,?,?)` ,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.showpass,
                data.phone,
                data.image,
            ],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results)
            }
        )
    },

    createUserAdmin : (data, callBack) => {
        pool.query(
            `insert into users(firstName, lastName, gender, email, password , showpass , phone, role) values(?,?,?,?,?,?,?,?)` ,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.showpass,
                data.phone,
                data.role
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
            `select id ,firstName, lastName, gender, email, password , phone , role from users`,
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
            `select id ,firstName, lastName, gender, email, password , showpass , phone , role from users where id = ?`,
            [id],
            (error, results , fields) => {
                if(error){
                    return callBack(error)
                 }
                 return callBack(null , results[0])
            }
        )
    },
    
    getUserByEmail : (email , callBack) => {
        pool.query(
            `select id , firstName, lastName, gender, email, password , showpass , phone , coverPic , profilePic , role from users where email = ?`,
            [email],
            (error, results , fields) => {
                if(error){
                    return callBack(error)
                 }
                 return callBack(null , results[0])
            }
        )
    },


    updateAdminUser : (data, callBack) => {
        pool.query(
            `update users set firstName=?, lastName=?, gender=?, email=?, password=? , showpass=?, phone=? , role=? where id = ?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.showpass,
                data.phone,
                data.role,
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


    updateUser : (data, callBack) => {
        pool.query(
            `update users set firstName=?, lastName=?, gender=?, email=?, password=? , showpass=?, phone=?,coverPic=? where id = ?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.showpass,
                data.phone,
                data.image,
                data.id,
            ],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results)
            }
        )
    },

    updateProfilePic : (data, callBack) => {
        pool.query(
            `update users set profilePic=? where id = ?`,
            [
                data.image,
                data.id,
            ],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results)
            }
        )
    },


    deleteUser : (data, callBack) => {
        pool.query(
            `delete from users where id = ?`,
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
    },
    login : (email , callBack) => {
        pool.query(
            `select * from users where email = ? `,
            [email],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results[0])
            }
        )
    },
    forgotPassword : (email , callBack) => {
        pool.query(
            `select * from users where email = ? `,
            [email],
            (error , results , fields) => {
                if(error){
                   return callBack(error)
                }
                return callBack(null , results[0])
            }
        )
    },
    resetPassword : (email , password , showpass , callBack) => {
        pool.query(
            `update users set password = ?, showpass = ? where email = ?`,
            [password , showpass ,  email],
            (error , results , fields) => {
                if(error){
                    return callBack(error)
                 }
                 return callBack(null , results)
            }
        )
    }
}