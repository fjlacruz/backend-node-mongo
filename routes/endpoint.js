"use strict";

var express = require("express");
var ProjectController = require("../controllers/project");
var ImageController = require("../controllers/image");

var router = express.Router();

var multipart = require("connect-multiparty");
var multipartMiddleware = multipart({ uploadDir: "./uploads" });

router.get("/home", ProjectController.home);

router.post("/save-project", ProjectController.saveProject);
router.get("/project/:id?", ProjectController.getProject);
router.get("/projects", ProjectController.getProjects);
router.put("/project/:id", ProjectController.updateProject);
router.delete("/project/:id", ProjectController.deleteProject);
router.post(
  "/upload-image/:id",
  multipartMiddleware,
  ProjectController.uploadImage
);
router.get("/get-image/:image", ProjectController.getImageFile);
router.post("/imagen", multipartMiddleware, ImageController.subirImagen);
router.get("/getImage/:image", ImageController.getImage);

module.exports = router;
