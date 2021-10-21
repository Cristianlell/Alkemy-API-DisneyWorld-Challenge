const jwt = require("jsonwebtoken");

module.exports = (req,res,next) =>{
    const token = req.header("Authorization");

    if(!token || !token.toLowerCase().includes("bearer")){
        const response = {
            status: 401,
            msg: "Carece de token válido"
        }
        return res.status(401).json(response)
    }
    try {
        const verifyToken = jwt.verify(token.substring(7),process.env.SECRET)
        
        if(!verifyToken.id && !verifyToken.email){
            const response = {
                status: 401,
                msg: "Acceso denegado"
            }
            return res.status(401).json(response)
        }
        
        next()
    } catch (error) {
        const response = {
            status: 401,
            msg: "Token no válido o ha expirado"
        }
        console.log(error);
        return res.status(401).json(response)    
    }
}