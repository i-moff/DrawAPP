const jwt = require('jsonwebtoken'),
    config = require('../config/main');

exports.setUserInfo = function setUserInfo(userData) {
    return {
        _id: userData._id,
        name: userData.name,
        role: userData.role
    };
};

exports.generateToken = function (user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 604800 // in seconds
    });
};