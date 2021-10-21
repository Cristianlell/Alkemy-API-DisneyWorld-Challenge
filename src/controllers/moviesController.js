const db = require('../database/models');
const { validationResult } = require("express-validator");
const {Op} = require('sequelize')

module.exports = {
    list: (req,res)=>{ 
        console.log(req.query);
        let variable;
        if (req.query.title) {
            variable = "title"
        } else if (req.query.genre) {
            variable = "genreId"
        }else{
            variable = "title"
        }
        console.log("la variable es ",variable);
            try {
                db.Movie.findAll({
                    attributes: ["id", "title", "image", "releaseDate"], 
                    include:[
                        {association: "genre",attributes: ["id", "name", "image"]}
                    ],
                    where: {
                        title: {
                            [Op.substring]: req.query.title ? req.query.title : "",
                        },
                        genreId: {
                            [Op.substring]: req.query.genre ? req.query.genre : "",
                        },
                        
                    },
                    order : [
                        [variable,req.query.order && req.query.order.toUpperCase() !== "ASC" ? req.query.order : "ASC"]
                    ]
                }).then((data) => {
                    let respuesta = {
                        status: 200,
                        length: data.length,
                        data: data,
                    };
                    res.status(200).json(respuesta);
                });
            } catch (error) {
                let errorBD = {
                    status: 500,
                    msg: "Error Interno del Servidor",
                };
                res.status(500).json(errorBD);
            }
        }
    }