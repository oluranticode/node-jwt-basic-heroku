
const UnauthenticatedError = require('../errors');
const jwt = require('jsonwebtoken');

    const authMiddleware = async (req, res, next) => {
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer')){
            res.status(400).json({msg: "No token Provided"});
            // throw new UnauthenticatedError('No token Provided')
        }
        const token = authHeader.split(' ')[1];
        // console.log(token);
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // console.log(decoded);
            const {id, username} = decoded;
            req.user = {id, username};
            next();
        }catch(error){
            res.status(401).json({msg: "Not Authorised to access this Value"});
            //  throw new UnauthenticatedError('Not Authorised to access this Value')
        }
        
    }

    module.exports = authMiddleware;