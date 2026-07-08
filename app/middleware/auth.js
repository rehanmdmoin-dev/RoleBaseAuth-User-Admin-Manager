const jwt = require('jsonwebtoken');

const Auth = (req, res, next) => {
    const token = req.headers['Authorization'];

    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Access denied. No token provided",
        });
    }

    const bearerToken = token.split(' ')[1];
    if (!bearerToken) {
        return res.status(401).json({
            status: false,
            message: "Access denied. Invalid token format",
        });
    }

    try {

        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
        req.user = decoded;
        return next();

    } catch (err) {


        if (err.name === 'TokenExpiredError') {
            return handleTokenRefresh(req, res, next);
        }


        return res.status(401).json({
            status: false,
            message: "Invalid token. Please log in again.",
        });
    }
};


// ----- Refresh Handler -------------------------------------------

const handleTokenRefresh = async (req, res, next) => {
    try {

        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                status: false,
                message: "Session expired. Please log in again.",
            });
        }


        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        } catch (err) {
            return res.status(403).json({
                status: false,
                message: err.name === 'TokenExpiredError'
                    ? "Refresh token expired. Please log in again."
                    : "Invalid refresh token.",
            });
        }


        const newAccessToken = jwt.sign(
            { id: decoded.id, email: decoded.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' }
        );

        res.setHeader('x-new-access-token', newAccessToken);


        req.user = decoded;
        return next();

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong during token refresh.",
        });
    }
};


module.exports = Auth;