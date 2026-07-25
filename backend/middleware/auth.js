const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).populate("role");
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, token failed" });
  }
};

const authorize = (moduleName, permissionType) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res
        .status(403)
        .json({ success: false, message: "User role not defined" });
    }

    // Super Admin has absolute access
    if (req.user.role.name === "Super Admin") {
      return next();
    }

    const rolePermissions = req.user.role.permissions;
    if (
      rolePermissions &&
      rolePermissions[moduleName] &&
      rolePermissions[moduleName][permissionType]
    ) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: `Access denied. Insufficient permissions for ${moduleName} -> ${permissionType}`,
      });
    }
  };
};

module.exports = { protect, authorize };
