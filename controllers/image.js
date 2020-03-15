"use strict";

var Image = require("../models/image");
var fs = require("fs");
var path = require("path");

var controller = {
  subirImagen: function(req, res) {
    var img = new Image();
    var fileName = "Imagen no subida...";

    if (req.files) {
      var filePath = req.files.image.path;
      var fileSplit = filePath.split("/");
      var fileName = fileSplit[1];
      var extSplit = fileName.split(".");
      var fileExt = extSplit[1];
      console.log(fileName);
      //console.log(fileSplit);
    }
    var params = req.files;
    img.image = fileName;

    img.save((err, imageStored) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al guardar el documento." });

      if (!imageStored)
        return res
          .status(404)
          .send({ message: "No se ha podido guardar el proyecto." });

      return res
        .status(200)
        .send({ response: "Subida exitosa", img: imageStored });
    });
  },
  getImage: function(req, res) {
    var file = req.params.image;
    var path_file = "./uploads/" + file;

    fs.exists(path_file, exists => {
      if (exists) {
        return res.sendFile(path.resolve(path_file));
      } else {
        return res.status(200).send({
          message: "No existe la imagen..."
        });
      }
    });
  }
};

module.exports = controller;
