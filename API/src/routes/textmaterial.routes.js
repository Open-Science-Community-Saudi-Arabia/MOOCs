const router = require("express").Router();
const permit = require("../middlewares/permission_handler");
const { basicAuth } = require("../middlewares/auth");

const {
    getTextMaterials,
    getTextMaterialData, addTextMaterial,
    updateTextMaterial, deleteTextMaterial,
} = require("../controllers/textmaterial.controllers");

router.use(basicAuth());

router
    .get("/", getTextMaterials)
    .get("/:id", getTextMaterialData)
    .post("/new", permit("Admin SuperAdmin"), addTextMaterial)
    .patch("/update/:id", permit("Admin SuperAdmin"), updateTextMaterial)
    .delete("/delete/:id", permit("Admin SuperAdmin"), deleteTextMaterial);

module.exports = router;
