const jwt = require('jsonwebtoken');
module.exports = {
    checkAuthorization : (req, res , next) => {
        const authHeader = req.header("Authorization");
        const token = authHeader && authHeader.split(" ")[1];
        if(token){
            jwt.verify(token , process.env.ACCESS_TOKEN, (error , decoded) => {
                if(error){
                     return res.status(401).send(error)
                }else{
                    req.decoded = decoded;
                    next();
                }
            })
        }else{
            return res.json({
                success : false,
                message: "Access Denied! Unauthorized User"
            })
        }
    },
    checkRole : (...role) => {
        return (req, res, next) => {
            if(!role.includes(req.decoded.role)){
                return res.json({
                    warning : true,
                    message : `Role : ${req.decoded.role} is not allowed to access this resouce`
                })
            }
            next();
        }
    }
}