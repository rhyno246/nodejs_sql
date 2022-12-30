const { genSaltSync, hashSync, compareSync, hash} = require('bcryptjs');
const { create, getUserById , getUser , deleteUser , updateUser , login , forgotPassword , resetPassword }  = require('../model/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendMail');

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
                return;
            }
            if(!body.email || !body.password){
                return res.json({
                    success : false,
                    data : "Enter your email and password"
                })
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
    },
    forgotPassword : (req, res) => {
        const body = req.body;
        forgotPassword(body.email , (error , results) => {
            if (error) return
            if(!results){
                return res.json({
                    success : false,
                    message : "Email not found"
                })
            }else{
                hash(body.email, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedEmail) => {
                    const resetPasswordUrl = `${process.env.CLIENT}/password/reset?email=${body.email}&token=${hashedEmail}"`;
                    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
                    sendEmail({
                        email: body.email,
                        subject : `Password Recovery`,
                        message : message
                    })
                })
                return res.json({
                    success : true,
                    message : "Send mail success"
                })
            }
        })
    },
    resetPassword : (req, res) => {
        const email = req.params.email;
        const password = req.body.password;
        if(!password){
            return res.json({
                success : false,
                message : "Input empty"
            })
        }else{
            hash(password, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedPassword) => {
                resetPassword(email , hashedPassword , (error , results) => {
                    if(error) return
                    if(results){
                        return res.json({
                            success : true,
                            message : "Reset password success"
                        })
                    }
                })
            })
        }
    }
}