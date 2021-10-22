const db = require("../database/models");
const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");
const getURLBase = req => `${req.protocol}://${req.get('host')}/relations/`;
module.exports = {
    create: (req, res) => {
        let errores = validationResult(req);
        if (errores.isEmpty()) {
            let { characterId, movieId } = req.body;
            try {
                db.CharacterMovie.create({
                characterId,
                movieId
                }).then(() => {
                    let respuesta = {
                        status: 201,
                        msg: "Recurso creado con éxito",
                    };
                    res.status(201).json(respuesta);
                })
            } catch (error) {
                let errorBD = {
                    status: 500,
                    msg: "Error Interno del Servidor",
                };
                res.status(500).json(errorBD);
            }
        } else {
            let error = {
                status: 400,
                msg: "Error en uno o más campos del form",
                errores: errores.mapped(),
            };
            res.status(400).json(error);
        }
    },
    edit: async (req, res) => {
        try {

            let relation = await db.CharacterMovie.findByPk(+req.params.id).then(
                (relation) => relation.dataValues);
            let errores = validationResult(req);
            if (errores.isEmpty()) {
                if (req.file) {
                    let imgABorrar = path.join(
                        __dirname,
                        "../images/characters/" + character.image
                    );
                    fs.unlinkSync(imgABorrar);
                }
                let { characterId,movieId } = req.body;

                db.CharacterMovie.update(
                    {
                        characterId: characterId ? characterId : relation.characterId,
                        movieId: movieId ? movieId : relation.movieId,
                    },
                    {
                        where: {
                            id: req.params.id,
                        },
                    }
                ).then(() => {
                    let respuesta = {
                        status: 200,
                        url:getURLBase(req)+`edit/${req.params.id}`,
                        msg: "Recurso actualizado con éxito",
                    };
                    res.status(200).json(respuesta);
                })
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
        } catch (err) {
            let error = {
                status: 500,
                msg: "Recurso no encontrado",
            };
            res.status(500).json(error);
        }
    },

    destroy: async (req, res) => {
        try {
            let relation = await db.CharacterMovie.findByPk(+req.params.id).then(
                (user) => user.dataValues
            );
            db.CharacterMovie.destroy({
                where: { id: +req.params.id },
            }).then(() => {
                let respuesta = {
                    status: 200,
                    msg: "Recurso eliminado con éxito",
                };
                res.status(200).json(respuesta);
            })
        } catch (err) {
            let error = {
                status: 500,
                msg: "Recurso no encontrado",
            };
            res.status(500).json(error);

        }

    },
};
