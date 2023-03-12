const router = require("express").Router();
const permit = require("../middlewares/permission_handler");
const { basicAuth } = require("../middlewares/auth");
const multer = require('multer')
const storage = multer.diskStorage({
  destination: './public/tempfiles/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

const {
    getTextMaterials,
    getTextMaterialData, addTextMaterial,
    updateTextMaterial, deleteTextMaterial,
} = require("../controllers/textmaterial.controllers");

router.use(basicAuth());

router
    .get("/:id", getTextMaterialData)
    .get("/", getTextMaterials)
    .post("/new", permit("Admin SuperAdmin"), upload.single('file'), addTextMaterial)
    .patch("/update/:id", permit("Admin SuperAdmin"), updateTextMaterial)
    .delete("/delete/:id", permit("Admin SuperAdmin"), deleteTextMaterial);

module.exports = router;
