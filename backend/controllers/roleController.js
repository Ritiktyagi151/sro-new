const Role = require("../models/Role");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json({ success: true, roles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateRolePermissions = async (req, res) => {
  const { id } = req.params;
  const { permissions } = req.body;
  try {
    const role = await Role.findById(id);
    if (!role)
      return res.status(404).json({ success: false, message: "Role not found" });

    // Prevent editing Super Admin permissions to avoid lockout
    if (role.name === "Super Admin") {
      return res.status(400).json({
        success: false,
        message: "Super Admin permissions are fixed and cannot be edited",
      });
    }

    role.permissions = permissions;
    await role.save();
    res.json({ success: true, role });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAdminUsers = async (req, res) => {
  try {
    const users = await User.find().populate("role").select("-password");
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createAdminUser = async (req, res) => {
  const { username, email, password, roleId } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username or email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      username,
      email,
      password: hashedPassword,
      role: roleId,
      profilePic: "",
    });

    res
      .status(201)
      .json({ success: true, message: "Admin user created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteAdminUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Admin user not found" });

    // Check if it's the last super admin to prevent locking out
    const superAdminRole = await Role.findOne({ name: "Super Admin" });
    const superAdminsCount = await User.countDocuments({
      role: superAdminRole._id,
    });

    if (
      user.role.toString() === superAdminRole._id.toString() &&
      superAdminsCount <= 1
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Cannot delete the only Super Admin" });
    }

    await user.deleteOne();
    res.json({ success: true, message: "Admin user deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getRoles,
  updateRolePermissions,
  getAdminUsers,
  createAdminUser,
  deleteAdminUser,
};
