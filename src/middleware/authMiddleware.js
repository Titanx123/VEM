const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();



exports.authenticate = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({message:'Access Denied'});

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(400).json({message : 'Invalid Token'});
    }
};

exports.authorizeOrganizer = (req,res,next)=>{
    if( req.user.role !== 'organizer'){
        return res.status(403).json({message: 'Access Denied'});
    }
    next()
}