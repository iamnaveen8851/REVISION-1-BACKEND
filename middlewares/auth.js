const jwt = require('jsonwebtoken')
require('dotenv').config()


const auth = async(req, res, next)=> {
    const token = req.headers.authorization.split(' ')[1]
try {

    if(token){
        jwt.verify(token, process.env.SECURITY_KEY, async(err, decoded) => {
           if(err){
             return res.status(403).json({message : err.message});
           }

           console.log(decoded)
        //    req.body.userId = docoded.
        req.body.userId = decoded.userId
        req.body.username = decoded.username        
           next()
        });
    }
    else{
        res.status(403).json({message : "Token is required"})
    }
    
} catch (error) {
     res.status(500).json({message : error.message});
}
}

module.exports = auth