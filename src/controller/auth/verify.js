const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken = async(req, res, next) => {
    const tokenHeader = req.headers.authorization;
    if(!tokenHeader)
    return res.status(402).send({'message': 'Token not found'});
    const Token = tokenHeader.split(" ")[1];
    const verifiedToken = await jwt.verify(Token, process.env.SSP);
    if(!verifiedToken._id)
    return res.status(401).send({status:0, msg:'Invalid Token' });
    res.locals.auth = verifiedToken;
    return(res.locals.auth);
    }

    module.exports = verifyToken;