const User = require('../models/user-model');

exports.users = function (req, res, next) {
    User.find()
        .select('-password')
        .exec(function (err, users) {
            return res.json(users);
        });
};

exports.createUser = function (req, res, next) {
    let user = new User({
        name: req.body.name,
        password: req.body.password,
        admin: false
    });

    user.save(function (err, user) {
        if (err) {
            return res.json({success: false, message: err.message})
        }

        res.json({success: true, user: user});
    });
};


