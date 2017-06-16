const jwt = require('jsonwebtoken'),
    config = require('../config/main');

exports.checkTokenMiddleware = function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            success: false,
            message: 'Invalid token.'
        });
    }

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            return res.json({success: false, message: 'Failed to authenticate token.'});
        } else {
            req.decoded = decoded;
            next();
        }
    });
};