const express = require("express");
const router = express.Router();
const controller = require("../controllers/contactsController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/", controller.getAll);
router.post("/", controller.create);
router.get("/:id", controller.getOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.post("/:id/interact", controller.interact);
router.post("/:id/notes", upload.array("files", 6), controller.addNote);

module.exports = router;
