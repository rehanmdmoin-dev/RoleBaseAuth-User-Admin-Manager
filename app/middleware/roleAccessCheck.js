const roleAccessCheck = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: false,
        message: 'Access denied. Please login first.'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: false,
        message: 'Access denied. You do not have permission to perform this action.'
      });
    }

    return next();
  };
};

module.exports = roleAccessCheck;
