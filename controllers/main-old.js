//check username and passwrod in post (login) request
// if it exist create a new jwt
// send back front end

// send authentication so that only the request with jwt can assecc the dashboard

// import the custom errors
const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');


    const login = async (req, res) =>{
        const {username, password} = req.body
        if(!username || !password){
            // throw new CustomAPIError('Please enter your email and password', 400)
            res.status(400).json({msg: "Please enter your email and password"});
        }

        // ............creating a new jwt token...............
        // create a demo db
        const id = new Date().getDate();
    
    // try to keep payload small, better experience for user
    // just for demo, in production use long, complex and unguessable string value!!!
    const token = jwt.sign({id, username},process.env.JWT_SECRET, {expiresIn:'30d'})
        res.status(200).json({msg: "user created", token})
    }


    const dashboard = async(req, res) => {
        // console.log(req.headers)
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer')){
            res.status(400).json({msg: "No token Provided"});
        }
        const token = authHeader.split(' ')[1];
        // console.log(token);
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // console.log(decoded);
            const luckyNumber = Math.floor(Math.random() * 10);
            res.status(200).json({ msg:`hello ${decoded.username}`, 
            secret:`here is authorise data your lucky number is; ${luckyNumber}` })
        }catch(error){
            res.status(400).json({msg: "Not Authorised to access this Value"});
        }
       
    }

    module.exports = {
        login, dashboard
    }