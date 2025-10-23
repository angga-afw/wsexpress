const bcrypt = require("bcrypt"); 
const { User } = require("../models"); 
const Validator = require("fastest-validator");
const jwt = require('jsonwebtoken'); 
const v = new Validator(); 

module.exports = async (req, res) => { 
    try {
        const schema = { 
            email: "email|empty:false", 
            password: "string|min:6", 
        }; 
    
        const validate = v.validate(req.body, schema); 

        if (validate.length) { 
        return res.status(400).json({ 
            status: "error", 
            message: validate, 
        }); 
        } 
    
        const user = await User.findAll({ 
        where: { email: req.body.email }, 
        }); 
    
        if (!user) { 
        return res.status(400).json({ 
            status: "error", 
            message: "User not found coy", 
        }); 
        } 
        const isValidPassword = await bcrypt.compare(req.body.password, user[0].password); 
    
        if (!isValidPassword) { 
        return res.status(400).json({ 
            status: "error", 
            message: "User not found", 
        }); 
        } 

        const idUser = user[0].id;
        const name = user[0].name;
        const profesi = user[0].profession;
        const role = user[0].role;
        const email = user[0].email;
        const avatar = user[0].avatar;


        const accesToken = jwt.sign({idUser, name, profesi, role, email, avatar }, process.env.ACCES_TOKEN_SECRET, {
            expiresIn : '120s'
        });

        return res.status(200).json({
            status : 'OK!',
            message: accesToken
        });
    }catch(error){
        console.log(error);
    }   
}; 