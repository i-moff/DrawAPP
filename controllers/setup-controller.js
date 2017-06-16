const User = require('../models/user-model');

exports.init = function (req, res, next) {
    let admin = new User({
        name: 'admin',
        password: 'admin',
        admin: true
    });

    admin.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
};