const db = require('../database/models');
const { validationResult } = require("express-validator");
const { Op } = require('sequelize')
const path = require('path')
const fs = require('fs');
const { get } = require('http');
const getURLBase = req => `${req.protocol}://${req.get('host')}/movies/`;
module.exports = {
    list: (req, res) => {
        console.log(req.query);
        let query;
        if (req.query.title) {
            query = "title"
        } else if (req.query.genre) {
            query = "genreId"
        } else {
            query = "title"
        }
        try {
            db.Movie.findAll({
                attributes: ["id", "title", "image", "releaseDate"],
                include: [
                    { association: "genre", attributes: ["id", "name", "image"] }
                ],
                where: {
                    title: {
                        [Op.substring]: req.query.title ? req.query.title : "",
                    },
                    genreId: {
                        [Op.substring]: req.query.genre ? req.query.genre : "",
                    },

                },
                order: [
                    [query, req.query.order && req.query.order.toUpperCase() !== "ASC" ? req.query.order : "ASC"]
                ]
            }).then((data) => {
                let respuesta = {
                    status: 200,
                    length: data.length,
                    url:getURLBase(req),
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
        
        try {
            db.Movie.findByPk(+req.params.id, {
                include: [
                    { association: "genre", attributes: ["id", "name", "image"] },
                    { association: "characters", attributes: ["id", "name", "image"] }
                ],
            }).then((data) => {
                let respuesta = {
                    status: 200,
                    url:getURLBase(req)+`detail/${data.id}`,
                    data: data,
                };
                res.status(200).json(respuesta);
            }).catch(e => {
                let errorBD = {
                    status: 404,
                    msg: "Recurso no encontrado",
                };
                res.status(404).json(errorBD);

            })
        } catch (error) {
            let errorBD = {
                status: 500,
                msg: "Problema interno del servidor",
            };
            res.status(404).json(errorBD);
        }
    },
    create: (req, res) => {
        let errores = validationResult(req);
        if (errores.isEmpty()) {
            let { title, releaseDate, rating, genreId } = req.body;
            try {
                db.Movie.create({
                    title,
                    image: req.file.filename,
                    releaseDate,
                    rating,
                    genreId,
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
                    "../images/movies/" + req.file.filename);
                console.log(imgABorrar);
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
        try {
            console.log("llego aqui try");

            let movie = await db.Movie.findByPk(+req.params.id).then(
                (movie) => movie.dataValues);
            console.log(movie);
            let errores = validationResult(req);
            if (errores.isEmpty()) {

                if (req.file) {
                    let imgABorrar = path.join(
                        __dirname,
                        "../images/movies/" + movie.image
                    );
                    fs.unlinkSync(imgABorrar);
                }
                let { title, rating, releaseDate } = req.body;

                db.Movie.update(
                    {
                        title: title ? title : movie.title,
                        image: req.file ? req.file.filename : movie.image,
                        rating: rating ? rating : movie.rating,
                        releaseDate: releaseDate ? releaseDate : movie.releaseDate,
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
                }).catch(e => {
                    let respuesta = {
                        status: 404,
                        msg: "Recurso no encontrado",
                    };
                    res.status(404).json(respuesta);
                })
            } else {
                if (req.file) {
                    let imgABorrar = path.join(
                        __dirname,
                        "../images/movies/" + req.file.filename
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
            let movie = await db.Movie.findByPk(+req.params.id).then((movie) => movie.dataValues);
            db.Movie.destroy({
                where: { id: +req.params.id },
            }).then(() => {
                let imgABorrar = path.join(
                    __dirname,
                    "../images/movies/" + movie.image
                );
                fs.unlinkSync(imgABorrar);
                let respuesta = {
                    status: 200,
                    msg: "Recurso eliminado con éxito",
                };
                res.status(200).json(respuesta);
            }).catch(e => {
                let error = {
                    status: 404,
                    msg: "Recurso no encontrado",
                };
                res.status(500).json(error);
            })
        } catch (err) {
            let error = {
                status: 500,
                msg: "Error interno del servidor",
            };
            res.status(500).json(error);

        }

    }
}