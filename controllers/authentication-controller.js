const crypto = require('crypto');
const User = require('../models/user-model');
const userHelper = require('../helpers/user-helper');
const config = require('../config/main');

exports.login = function (req, res, next) {
    // find the user
    User.findOne({name: req.body.name}, function (err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(422).json({success: false, message: 'Authentication failed. User not found.'});
            }

            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch) {
                    res.json ({success: false, error: 'Your login details could not be verified. Please try again.'});
                }

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: userHelper.generateToken(user)
                });
            });
        }
    );
};

