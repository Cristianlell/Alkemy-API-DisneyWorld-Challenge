const db = require('../database/models');
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports = {
    register: (req,res)=>{ 
        let errores = validationResult(req)
        if(errores.isEmpty()){
            let {email,password} = req.body
            try {
                db.User.create({
                    email,
                    password : bcrypt.hashSync(password,10)
                }).then( (user) => {
                    let respuesta = {
                        status:201,
                        msg:'Registrado con éxito'
                    }
                    res.status(201).json(respuesta)
            })    
            } catch (error) {
                
                let errorBD ={
                    status : 500,
                    msg : "Error Interno del Servidor"
                }
                res.status(500).json(errorBD)
            }
            
        }else{
            let error = {
                status: 400,
                msg: "Error en uno o más campos del form",
                errores : errores.mapped()
            }
            res.status(400).json(error)
        }
    },
    login: (req,res)=>{
        let errores = validationResult(req);
        let {email} = req.body
        if (errores.isEmpty()) {
            try {
                db.User.findOne({
                    where:{
                        email: email
                    }
                }).then(user =>{
                    const payload = {
                        id: user.id,
                        email: user.email,

                    }
                    let token = jwt.sign(payload,process.env.SECRET,{expiresIn:60*5}) ;
                    let respuesta = {
                        status:201,
                        msg:"Logueado con éxito",
                        email: `¡Bienvenido ${user.email}! su Token expira en 5 minutos`,
                        token : token
                    }

                    res.status(201).json(respuesta)
                    
                })
            } catch (error) {
                let errorDB = {
                    status:501,
                    error:error
                }
                res.status(501).json(errorDB)
            }
           
        }else{
            let error = {
                status:401,
                error:"Credenciales inválidas"
            }

            res.status(401).json(error)
        }
    }
}