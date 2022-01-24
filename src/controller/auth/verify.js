var jwt = require("jsonwebtoken");
function verifyToken(req,res,next){
  const tokenHeader = req.headers.authorization;
  if(!tokenHeader)
  return res.status(401).json({"message":"Token not found"});
  const token = tokenHeader.split(" ")[1];
  const verifiedToken = jwt.verify(token," process.env.SSP");
  if(!verifiedToken.id)
    return res.status(401).json(sendError("invalid token"))
  res.locals.auth = verifiedToken;
  return(res.locals.auth)
}

module.exports = verifyToken;