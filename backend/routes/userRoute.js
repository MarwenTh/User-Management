const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  userController.getUsers(req, res);
});
router.post("/", userController.addUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);
router.get("/:id", userController.getUserById);

module.exports = router;
