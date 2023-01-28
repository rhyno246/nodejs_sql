const { genSaltSync, hashSync, compareSync, hash} = require('bcryptjs');
const { create, getUserById , getUser , deleteUser , updateAdminUser , login , forgotPassword , resetPassword, createUserAdmin }  = require('../model/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendMail');


module.exports = {
    createUser : (req , res) => {
        const body = req.body;
        const salt =  genSaltSync(10);
        body.showpass = body.password;
        body.password = hashSync(body.password, salt);
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
    updateAdminUser : (req , res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password , salt);
        updateAdminUser(body , (error) => {
            if(error){
                console.log(error);
                return;
            }
            return res.json({
                success : true,
                message : "Cập nhật thành công"
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
                massage : "Xóa thành công"
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
                    const resetPasswordUrl = `${process.env.CLIENT}/password/reset?email=${body.email}&token=${hashedEmail}"`;
                    const message = `Reset mật khẩu mới của bạn có token là :- \n\n ${resetPasswordUrl} \n\n Nếu có bất cứ câu hỏi nào vui lòng gửi mail về địa chỉ mail trên hệ thống của chúng tôi.`;
                    sendEmail({
                        email: body.email,
                        subject : `Khôi phục mật khẩu đã quên`,
                        message : message
                    })
                })
                return res.json({
                    success : true,
                    message : "Gửi mail thành cmn công"
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
                message : "Chưa nhập email"
            })
        }else{
            hash(password, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedPassword) => {
                resetPassword(email , hashedPassword , (error , results) => {
                    if(error) return
                    if(results){
                        return res.json({
                            success : true,
                            message : "Reset mật khẩu thành  cmn công"
                        })
                    }
                })
            })
        }
    }
}