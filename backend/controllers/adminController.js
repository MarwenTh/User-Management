const Admin = require("../models/adminModel");

exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: "Failed to get all admins" });
  }
};

exports.addAdmin = async (req, res) => {
  try {
    const addAdmin = new Admin({
      username: req.body.username,
      password: req.body.password,
    });
    addAdmin.save();
    res.json(addAdmin);
  } catch (error) {
    res.status(500).json({ error: "Failed to add admin" });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const addAdmin = await Admin.findByIdAndDelete(req.params.id);
    res.json(addAdmin);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete this admin" });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const updateAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        password: req.body.password,
      },
      { new: true }
    );
    res.json(updateAdmin);
  } catch (error) {
    res.status(500).json({ error: "Failed to update this admin" });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const adminById = await Admin.findById(req.params.id);
    res.json(adminById);
  } catch (error) {
    res.status(500).json({ error: "Failed to get this admin" });
  }
};
