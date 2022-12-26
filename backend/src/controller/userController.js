const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const { create, getUserById , getUser , deleteUser , updateUser , login }  = require('../model/userModel');
const sendToken = require('../utils/jwtToken');

module.exports = {
    createUser : (req , res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body,(error , results) => {
            if(!results) {
                return res.status(409).json({ 
                    success : false , message : "User already exists !" 
                })
            }
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
        updateUser(body , (error) => {
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
        deleteUser(data , (error) => {
            if(error){
                console.log(error);
                return;
            }
            return res.json({
                success : true,
                massage : "delete user success"
            })
        })
    },
    userLogin : (req , res) => {
        const body = req.body;
        login(body.email , (error, results) => {
            if(error){
                console.log(error);
            }
            if (!results) {
                return res.json({
                  success: false,
                  data: "Invalid email or password"
                });
            }
            const matchPass = compareSync(body.password , results.password);
            if(matchPass){
                return sendToken(results , 200 , res)
            }else{
                return res.json({
                    success: false,
                    data: "Invalid email or password"
                });
            }
        })
    }
}