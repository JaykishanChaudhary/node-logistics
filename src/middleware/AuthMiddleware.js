const jwt=require('jsonwebtoken');

const jwtAuth=(async (req,res,next)=>{
    try{
        const jsonwt=req.headers['token'];
        jwt.verify(jsonwt,process.env.SECRET_KEY,(err,decodedToken)=>{
            if(err){
                res.status(401).json({
                    status:'failure',
                    result:"unauthorized"
                })
            }else {
                next();
            }
        })
    }catch (err){
        console.error('Error in JWT Authentication:', err);
        res.status(401).json({
            status: 'error',
            message: 'An error occurred while authenticating user',
            error: err.message
        });
    }
})

module.exports=jwtAuth;