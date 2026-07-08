const adminRoleCheck = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      status: false,
      message: 'Access denied. Admin only.'
    });
  }

  return next();
};

module.exports = adminRoleCheck;
