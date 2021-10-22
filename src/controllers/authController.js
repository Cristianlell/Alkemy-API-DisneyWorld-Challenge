require('dotenv').config()
const db = require('../database/models');
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const nodemailerTransport = require('nodemailer-sendgrid-transport')
const transport = nodemailer.createTransport(nodemailerTransport({
    auth: {
        key: process.env.SENDGRID_API_KEY
    }
}))
console.log(process.env.SENDGRID_API_KEY);
module.exports = {
    register: (req, res) => {
        let errores = validationResult(req)
        if (errores.isEmpty()) {
            let { email, password } = req.body
            try {
                db.User.create({
                    email,
                    password: bcrypt.hashSync(password, 10)
                }).then(() => {
                  
                    transport.sendMail({
                        to: email,
                        from: process.env.SENDGRID_EMAIL,
                        subject: 'Challenge Backend - Node Alkemy',
                        text: 'and easy to do anywhere, even with Node.js',
                        html: `
                        <h2>¡Bienvenido <b>${email}</b>!</h2>
                        <p>Al loguearte se te brindara una clave <b>Token</b> para que puedas navegar por toda la <b>Api</b>.</p>
                        <p>En el archivo <b>Readme</b> encontraras todos los <b>Endpoints</b> disponibles sobre el mundo de Disney.</p>
                        `
                    })
                
                    let respuesta = {

                        status: 201,
                        msg: 'Registrado con éxito'
                    }
                    res.status(201).json(respuesta)
                })
            } catch (error) {

                let errorBD = {
                    status: 500,
                    msg: "Error Interno del Servidor"
                }
                res.status(500).json(errorBD)
            }

        } else {
            let error = {
                status: 400,
                msg: "Error en uno o más campos del form",
                errores: errores.mapped()
            }
            res.status(400).json(error)
        }
    },
    login: (req, res) => {
        let errores = validationResult(req);
        let { email } = req.body
        if (errores.isEmpty()) {
            try {
                db.User.findOne({
                    where: {
                        email: email
                    }
                }).then(user => {
                    const payload = {
                        id: user.id,
                        email: user.email,

                    }
                    let token = jwt.sign(payload, process.env.SECRET, { expiresIn: 60 * 5 });
                    let respuesta = {
                        status: 201,
                        msg: "Logueado con éxito",
                        email: `¡Bienvenido ${user.email}! su Token expira en 5 minutos`,
                        token: token
                    }

                    res.status(201).json(respuesta)

                })
            } catch (error) {
                let errorDB = {
                    status: 501,
                    error: error
                }
                res.status(501).json(errorDB)
            }

        } else {
            let error = {
                status: 401,
                error: "Credenciales inválidas"
            }

            res.status(401).json(error)
        }
    }
}