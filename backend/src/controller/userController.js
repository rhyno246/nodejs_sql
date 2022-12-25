const { genSaltSync, hashSync } = require('bcryptjs');
const { create, getUserById , getUser , deleteUser , updateUser }  = require('../model/userModel');

module.exports = {
    createUser : (req , res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body,(error , results) => {
            if(error){
                console.log(error);
                return res.status(500).json({
                    success : false,
                    message : 'Database connection error'
                });
            }
            return res.status(200).json({
                success : true,
                data : results
            })
        })
    },
    getUser : (req, res) => {
        getUser((error, results) => {
            if(error){
                console.log(error);
                return;
            }
            return res.json({
                success : true,
                data : results
            })
        })
    },
    getUserById : (req , res) => {
        const id = req.params.id;
        getUserById(id, (error , results) => {
            if(error){
                console.log(error);
                return;
            }
            if(!results) {
                return res.json({
                    success : false,
                    message : "Users not found"
                })
            }
            return res.json({
                success : true,
                data : results
            })
        });
    },
    updateUser : (req , res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password , salt);
        updateUser(body , (error , results) => {
            if(error){
                console.log(error);
                return;
            }
            return res.json({
                success : true,
                massage : "updated user success"
            })
        })
    },
    deleteUser : (req, res) => {
        const data = req.body;
        deleteUser(data , (error , results) => {
            if(error){
                console.log(error);
                return;
            }
            if(!results) {
                return res.json({
                    success : false,
                    message : "Users not found"
                })
            }
            return res.json({
                success : true,
                massage : "delete user success"
            })
        })
    }
}