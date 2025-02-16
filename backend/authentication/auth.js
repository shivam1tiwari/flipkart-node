const jwt = require('jsonwebtoken');
const auth = async(req, res, next) => {
  try{
    // const token = await req.headers["authorization"];
    const token = req.headers["authorization"]?.split(" ")[1];  // gets the token after "Bearer"
  console.log(token);
  if(token){
    const authentication = jwt.verify(token, "thisisvalidation",(err)=>{
      if(err){
        res.status(403).json({message:"Unauthorized"});
      }else{ 
        next();
      }
    });
   
    
  }else{
    res.json({message:"Please login"})
  }
}catch(err){
  res.status(500).json({"Messaage": "Server side error"})
}
}

module.exports = auth;