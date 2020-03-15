"use strict";

var User = require("../models/user");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../services/jwt.js");

var fs = require("fs");
var path = require("path");

var controller = {
  saveUser: function(req, res) {
    var user = new User();

    var params = req.body;
    user.name = params.name;
    user.username = params.username;
    user.email = params.email;
    user.password = params.password;
    user.rol = "ROLE_USER";
    user.image = "null";

    if (user.password) {
      //encriptar contraseña y guarsar lops datos
      bcrypt.hash(user.password, null, null, function(err, hash) {
        user.password = hash;
        if (user.name != null && user.username != null && user.email != null) {
          //guarda el usuario
          user.save((err, userStore) => {
            if (err) {
              res.status(500).send({ message: "Error al guardar...." });
            } else {
              if (!userStore) {
                res
                  .status(404)
                  .send({ message: "No se ha registrado el usuario" });
              } else {
                res.status(200).send({ user: userStore });
              }
            }
          });
        } else {
          res.status(200).send({ message: "Introduce todos los campos" });
        }
      });
    } else {
      res.status(500).send({ message: "Debe introducir cotraseña...." });
    }
  },

  loginUser: function(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        res.status(500).send({ message: "Error en la peticion...." });
      } else {
        if (!user) {
          res.status(404).send({ message: "El usuario no existe" });
        } else {
          //Comprobamos conntraseña
          bcrypt.compare(password, user.password, function(err, check) {
            if (check) {
              //devolver los datos del usuario loguaedo
              if (params.gethash) {
                //Devolvemos un token de jwt
                res.status(200).send({ token: jwt.createToken(user) });
              } else {
                res.status(200).send({ user });
              }
            } else {
              res
                .status(404)
                .send({ message: "El usuario no ha podido loguearse" });
            }
          });
        }
      }
    });
  },

  updateUser: function(req, res) {
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdate) => {
      if (err) {
        res.status(500).send({ message: "Error al actualizar el usuario" });
      } else {
        if (!userUpdate) {
          res
            .status(404)
            .send({ message: "No se ha podido actualizar el usuario" });
        } else {
          res.status(201).send({ user: userUpdate });
        }
      }
    });
  },
  uploadImage: function(req, res) {
    var userId = req.params.id;
    var fileName = "Imagen no subida...";

    if (req.files) {
      var filePath = req.files.img.path;
      var fileSplit = filePath.split("/");
      var fileName = fileSplit[1];
      var extSplit = fileName.split(".");
      var fileExt = extSplit[1];
      console.log(fileName);

      if (
        fileExt == "png" ||
        fileExt == "jpg" ||
        fileExt == "jpeg" ||
        fileExt == "gif"
      ) {
        User.findByIdAndUpdate(
          userId,
          { image: fileName },
          (err, userUpdate) => {
            if (!userUpdate) {
              res
                .status(404)
                .send({ message: "No se ha podido actualizar el usuario" });
            } else {
              res.status(201).send({ user: userUpdate });
            }
          }
        );
      } else {
        return res.status(200).send({ message: "Extension no valida" });
      }
    } else {
      return res
        .status(200)
        .send({ message: "No se ha subido la imagen....." });
    }
  }
};

module.exports = controller;
