const { genSaltSync, hashSync, compareSync, hash} = require('bcryptjs');
const { create, getUserById , getUser , deleteUser , updateAdminUser , login , forgotPassword , resetPassword, createUserAdmin, updateUser, getUserByEmail, updateProfilePic }  = require('../model/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendMail');




module.exports = {
    createUser : (req , res) => {
        const body = req.body;
        const salt =  genSaltSync(10);
        body.showpass = body.password;
        body.password = hashSync(body.password, salt);
        if(body.image){
            body.image = `${req.protocol}://${req.get("host")}/${ body.image}`;
        }
        create(body,(error , results) => {
            if(!results) {
                return res.status(409).json({ 
                    success : false , message : "Tài khoản đã tồn tại hoặc bạn chưa điền đủ thông tin !" 
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
                message : 'Tạo tài khoản thành công',
                data : results
            })
        })
    },

    createUserAdmin : (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.showpass = body.password;
        body.password = hashSync(body.password, salt);
        createUserAdmin(body,(error , results) => {
            if(!results) {
                return res.status(409).json({ 
                    success : false , message : "The account already exists or you have not filled in enough information !" 
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
                message : 'Create account successfully',
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
                    message : "Không tìm thấy tài khoản"
                })
            }
            return res.json({
                success : true,
                data : results
            })
        });
    },
    getUserByEmail : (req, res) => {
        const email = req.params.email;
        getUserByEmail(email, (error , results) => {
            if(error){
                console.log(error);
                return;
            }
            if(!results) {
                return res.json({
                    success : false,
                    message : "Không tìm thấy tài khoản"
                })
            }
            return res.json({
                success : true,
                data : results
            })
        });
    },


    updateAdminUser : (req , res) => {
        const body = req.body;
        body.showpass = body.password;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password , salt);
        updateAdminUser(body , (error) => {
            if(error){
                console.log(error);
                return;
            }
            return res.json({
                success : true,
                message : "Updated success"
            })
        })
    },


    updateUser : (req , res) => {
        const body = req.body;
        body.showpass = body.password;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password , salt);
        if(req.file){
            body.image = `${req.protocol}://${req.get("host")}/${ body.image}`
        }
        updateUser(body , (error , results) => {
            if(error){
                console.log(error);
                return;
            }
            return res.json({
                success : true,
                message : "Cập nhật thành công",
            })
        })
    },

    updateProfilePic : (req, res) => {
        const body = req.body;
        if(req.file){
            body.image = `${req.protocol}://${req.get("host")}/${ body.image}`
        }
        updateProfilePic(body, (error, results) => {
            if(error){
                console.log(error);
                return;
            }
            return res.json({
                success : true,
                message : "Cập nhật thành công",
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
                message : "Delete success"
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
            if (!results) {
                return res.json({
                  success: false,
                  data: "Sai hoặc chưa nhập email hoặc mật khẩu"
                });
            }
            const matchPass = compareSync(body.password , results.password);
            if(matchPass){
                return sendToken(results , 200 , res)
            }else{
                return res.json({
                    success: false,
                    data: "Sai hoặc chưa nhập email hoặc mật khẩu"
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
                    message : "Không tìm thấy email"
                })
            }else{
                hash(body.email, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedEmail) => {
                    const resetPasswordUrl = `${process.env.CLIENT}/reset-pass?email=${body.email}&token=${hashedEmail}"`;
                    const message = `Reset mật khẩu mới của bạn có token là :- \n\n ${resetPasswordUrl} \n\n Nếu có bất cứ câu hỏi nào vui lòng gửi mail về địa chỉ mail trên hệ thống của chúng tôi.`;
                    sendEmail({
                        email: body.email,
                        subject : `Khôi phục mật khẩu đã quên`,
                        message : message
                    })
                })
                return res.json({
                    success : true,
                    message : "Gửi mail thành công vui lòng kiểm tra mail"
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
                message : "Chưa nhập password hoặc link đã hết hạn"
            })
        }else{
            hash(password, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedPassword) => {
                resetPassword(email , hashedPassword , password , (error , results) => {
                    if(error) return
                    if(results){
                        return res.json({
                            success : true,
                            message : "Reset mật khẩu thành công"
                        })
                    }
                })
            })
        }
    }
}