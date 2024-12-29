const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {users} = require('../models/User');
const {sendEmail} = require('../utils/email');
const dotenv = require('dotenv');

dotenv.config();


exports.register = async (req,res)=>{
    const {name,email,password,role} = req.body;
    if(users.find((user)=> user.email === email)){
        return res.status(400).json({message: 'User already Exists'});
    }
    const hashedPasswrod = await bcrypt.hash(password,10);
    const newUser = {
        id:users.length + 1,
        name,
        email,
        password : hashedPasswrod,
    };
    users.push(newUser);

    await sendEmail(email,'Registration Succesful','Welcome to the Platform!');
    res.status(201).json({message : 'User Registred Successfully'});
};
exports.login = async (req,res) =>{
    const {email,password} = req.body;
    const user = users.findIndex((user)=> user.email === email);
    if(!user || !(await bcrypt.compare(password,user.password))){
        return res.status(401).json({message: 'Invalid credentials.'});
    }
    const token = jwt.sign({
        id: user.id,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: '1h'
    }
);
    res.json({token});
};