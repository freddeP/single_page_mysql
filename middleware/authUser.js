const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){

   // enklare sätt att läsa en viss header...
   //const token = req.header('x-auth');
   const token = req.cookies.token;

   if(!token || token ===""){ res.status(401).send("No token provided");
    return false;
    }
    else
    {
   // kolla om token är valid
   try{
    const checkToken = jwt.verify(token,"secret");
    req.user = checkToken;
    next();
   }
   catch(exeption)
   {
       res.send({"token":"Invalid token"});
   }
}

}