const Users = require("../models/usersModel");

// get all the users
exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to get all users" });
  }
};

// post users
exports.addUser = async (req, res) => {
  try {
    const newUsers = new Users({
      name: {
        firstName: req.body.name.firstName,
        lastName: req.body.name.lastName,
      },
      email: req.body.email,
      password: req.body.password,
    });
    await newUsers.save();
    res.json({ status: "ok", user: newUsers });
  } catch (error) {
    res.status(500).json({ error: "Failed to add users" });
  }
};

// delete users
exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await Users.findByIdAndDelete(req.params.id);
    res.json(deleteUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

//update user
exports.updateUser = async (req, res) => {
  try {
    const updateUser = await Users.findByIdAndUpdate(
      req.params.id,
      {
        name: {
          firstName: req.body.name.firstName,
          lastName: req.body.name.lastName,
        },
        email: req.body.email,
        password: req.body.password,
        posting_date: req.body.posting_date,
      },
      { new: true }
    );
    res.json(updateUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

//get user by id
exports.getUserById = async (req, res) => {
  try {
    const userById = await Users.findById(req.params.id);
    res.json(userById);
  } catch (error) {
    res.status(500).json({ error: "Failed to get this user" });
  }
};
