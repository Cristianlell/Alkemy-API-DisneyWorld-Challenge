const db = require("../database/models");
const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");

module.exports = {
    list: (req, res) => {
        console.log(req.query);
        let variable;
        if (req.query.name) {
            variable = "name"
        } else if (req.query.age) {
            variable = "age"
        } else if(req.query.weight){
            variable = "weight"
        }else{
            variable = "name"
        }
  

        try {
            db.Character.findAll({
                attributes: ["id", "name", "image", "history","age"],
                where: {
                    name: {
                        [Op.substring]: req.query.name ? req.query.name : "",
                    },
                    age: {
                        [Op.substring]: req.query.age ? req.query.age : "",
                    },
                    weight: {
                        [Op.substring]: req.query.weight ? req.query.weight : "",
                    },
                },
                include:req.query && req.query.name || req.query.age  || req.query.weight ? [
                    {association: "movies",attributes: ["id", "title", "image"]}
                ] : null,
                order : [
                    [variable ,req.query.order && req.query.order.toUpperCase() !== "ASC" ? req.query.order : "ASC"]
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
    },
    detail: (req, res) => {
        if (isNaN(req.params.id)) {
            let respuesta = {
                status: 400,
                msg: "El id debe ser un Número",
            };
            res.status(400).json(respuesta);
        } else {
            db.Character.findByPk(+req.params.id, {
                include: [
                    { association: "movies", attributes: ["id", "title", "image"] },
                ],
            })
                .then((data) => {
                    let respuesta = {
                        status: 200,
                        length: data.length,
                        data: data,
                    };
                    res.status(200).json(respuesta);
                })
                .catch((error) => {
                    let errorBD = {
                        status: 404,
                        msg: "Recurso no encontrado",
                    };
                    res.status(404).json(errorBD);
                });
        }
    },

    create: (req, res) => {
        let errores = validationResult(req);
        if (errores.isEmpty()) {
            let { name, age, weight, history } = req.body;
            try {
                db.Character.create({
                    name,
                    image: req.file.filename,
                    age,
                    weight,
                    history,
                }).then(() => {
                    let respuesta = {
                        status: 201,
                        msg: "Recurso creado con éxito",
                    };
                    res.status(201).json(respuesta);
                });
            } catch (error) {
                let errorBD = {
                    status: 500,
                    msg: "Error Interno del Servidor",
                };
                res.status(500).json(errorBD);
            }
        } else {
            if (req.file) {
                let imgABorrar = path.join(
                    __dirname,
                    "../images/characters/" + req.file.filename
                );
                fs.unlinkSync(imgABorrar);
            }
            let error = {
                status: 400,
                msg: "Error en uno o más campos del form",
                errores: errores.mapped(),
            };
            res.status(400).json(error);
        }
    },
    edit: async (req, res) => {
        let character = await db.Character.findByPk(+req.params.id).then(
            (user) => user.dataValues
        );
        let errores = validationResult(req);
        if (errores.isEmpty()) {
            if (req.file) {
                let imgABorrar = path.join(
                    __dirname,
                    "../images/characters/" + character.image
                );
                fs.unlinkSync(imgABorrar);
            }
            let { name, age, weight, history } = req.body;

            db.Character.update(
                {
                    name: name ? name : character.name,
                    image: req.file ? req.file.filename : character.image,
                    age: age ? age : character.age,
                    weight: weight ? weight : character.weight,
                    history: history ? history : character.history,
                },
                {
                    where: {
                        id: req.params.id,
                    },
                }
            )
                .then(() => {
                    let respuesta = {
                        status: 200,
                        msg: "Recurso actualizado con éxito",
                    };
                    res.status(200).json(respuesta);
                })
                .catch((e) => {
                    let error = {
                        status: 500,
                        msg: "Recurso no encontrado",
                    };
                    res.status(500).json(error);
                });
        } else {
            if (req.file) {
                let imgABorrar = path.join(
                    __dirname,
                    "../images/characters/" + req.file.filename
                );
                fs.unlinkSync(imgABorrar);
            }
            let error = {
                status: 400,
                msg: "Error en uno o más campos del form",
                errores: errores.mapped(),
            };
            res.status(400).json(error);
        }
    },
    destroy: async (req, res) => {
        let character = await db.Character.findByPk(+req.params.id).then(
            (user) => user.dataValues
        );
        db.Character.destroy({
            where: { id: +req.params.id },
        })
            .then(() => {
                let imgABorrar = path.join(
                    __dirname,
                    "../images/characters/" + character.image
                );
                fs.unlinkSync(imgABorrar);
                let respuesta = {
                    status: 200,
                    msg: "Recurso eliminado con éxito",
                };
                res.status(200).json(respuesta);
            })
            .catch((error) => {
                let respuesta = {
                    status: 500,
                    msg: error,
                };
                res.status(500).json(respuesta);
            });
    },
};
