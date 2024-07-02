const jwt = require('jsonwebtoken');  // memanggil json web token dan env
require('dotenv').config();

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');       //cek token pada header
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};