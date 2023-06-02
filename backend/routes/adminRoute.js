const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/", adminController.getAdmins);
router.post("/", adminController.addAdmin);
router.delete("/:id", adminController.deleteAdmin);
router.put("/:id", adminController.updateAdmin);
router.get("/:id", adminController.getAdminById);

module.exports = router;
