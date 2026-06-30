const jwt = require('jsonwebtoken');

const ManagerAuthCheck = (req, res, next) => {
    if (req.cookies && req.cookies.managertoken) {
        const token = req.cookies.managertoken;
        const decoded = jwt.verify(token, process.env.MANAGER_JWT_SECRET);
        req.manager = decoded;
        return next();
    } else {
        console.log('not logged in please login first');
        res.redirect('/manager/login');
    }
};

module.exports = ManagerAuthCheck;
