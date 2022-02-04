const User = require('../models/user')
const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken')

const cookieParser = require('cookie-parser')


const UserController = {

    newUser: async(req, res) =>{
        try{
            const {
                full_name,
                username,
                email,
                mobile_number,
                nationality,
                country_zip_code,
                city,
                street,
                gender,
                password,
                user_role
            } = req.body;

            const user = await User.findOne({email})

            if(full_name ==="" || username === "" || email === "" || password === "" ){
                return  res.status(400).json ({msg:"Empty fields"})}

            if(!/^[a-zA-Z ]*$/.test(full_name)){
                return res.status(400).json({msg: "Invalid name entered"})}

            if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
                return res.status(400).json({msg: "Invalid email entered"})}

            if(user) return res.status(400).json({msg: "the email already exists"})

            if(password.length < 8){
                return res.status(400).json({msg: "Password is too short"})}


            const hashedPassword = bcrypt.hashSync(password,10)
            //console.log("hashed password is" +hashedPassword)

            const newUser = new User({
                full_name,
                username,
                email,
                mobile_number,
                nationality,
                country_zip_code,
                city,
                street,
                gender,
                password: hashedPassword,
                user_role
            })

            await newUser.save()

            const accesstoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/api/users/refresh_token'
            })

            res.status(200).json({message: "Registered successfully", accesstoken})

        } catch (e) {
            //console.log("error is "+ e.message)
            return  res.status(500).json({msg: e.message})
        }
},

    login: async (req, res) => {
        try {
            const {email, password,} = req.body;

            if (email == "" || password == "") res.json({status: "Failed", message: "Empty credentials supplied",})

            //check if user exists
            const user = await User.findOne({email})
            if (!user) return res.status(400).json({msg: "User not found"})

            /*const hashedPassword = user_[0].password;*/

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch)
                return res.status(400).json({msg: "Incorrect password."})

            // If login success , create access token and refresh token
            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/api/users/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
            })

            res.json({accesstoken, msg: "Login Successful"})

        }
        catch
            (err)
            {
                return res.status(500).json({msg: err.message})
            }
    },

    //make updatePassword to receive old and new password and compare old password before changing it.
    //idea: if not the user has to use email verification and reset or change password
    logout: async (req, res) =>{
        try {
            res.clearCookie('refreshtoken', {path: '/api/users/refresh_token'})
            return res.json({msg: "Logged out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
     updatePassword: async(req, res) =>{
    console.log("update password controller");
        try {
            const { userId } =  req.user.id;
            console.log("user ID is " + userId)
            /*const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(req.body.password, salt);*/
            //const pass = 10;
            const pass =  bcrypt.genSaltSync(10)
            const newPassword = await bcrypt.hashSync(req.body.password, pass);
            console.log("new hashed password is " + newPassword)
            const userPassword = await User.findOneAndUpdate({_id: req.user.id}, { password: newPassword}, {new: true});
            return res.status(200).json({data: userPassword});
            }
            catch(err)
            {
                return res.status(500).json({msg: err.message})
            }
    },

    getUser: async (req, res) =>{
        try {
            const user = await User.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg: "User does not exist."})

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    refreshToken: (req, res) => {
        try {
            //Refresh token isn't working well
            const rf_token = req.cookies.refreshtoken;
            /*const rf_token = req.cookies.refreshtoken;
            res.json({rf_token});
            console.log ("rf_token is "+ rf_token)*/
            if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(400).json({msg: "Not authenticated"})

                const accesstoken = createAccessToken({id: user.id})

                return res.json({user, accesstoken})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

}
const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports =  UserController;

