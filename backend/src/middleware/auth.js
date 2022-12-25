const jwt = require('jsonwebtoken');

module.exports = {
    checkAuthorization : (req, res , next) => {
        const authHeader = req.header("Authorization");
        const token = authHeader && authHeader.split(" ")[1];
        if(token){
            jwt.verify(token , process.env.ACCESS_TOKEN, (error , decoded) => {
                if(error){
                    return res.json({
                        success : false,
                        message : "Invalid token"
                    });
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
    }
}