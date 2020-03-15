"use strict";

var express = require("express");
var ProjectController = require("../controllers/project");
var ImageController = require("../controllers/image");
var UserController = require("../controllers/user");

var router = express.Router();

//middelware para proteger rutas
var md_auth = require("../middelwares/autenticated");

var multipart = require("connect-multiparty");
var multipartMiddleware = multipart({ uploadDir: "./uploads" });

router.get("/home", ProjectController.home);

router.post("/save-project", ProjectController.saveProject);
router.get("/project/:id?", ProjectController.getProject);
router.get("/projects", md_auth.ensureAuth, ProjectController.getProjects);
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
router.post("/buscar", ProjectController.buscar);

////////////////////////////////////////////////////////
router.post("/register", UserController.saveUser);
router.post("/login", UserController.loginUser);
router.put("/update-user/:id", md_auth.ensureAuth, UserController.updateUser);
router.post(
  "/uploadImage/:id",
  [multipartMiddleware, md_auth.ensureAuth],
  UserController.uploadImage
);
module.exports = router;
