const User = require('../models/user-model');

exports.users = function (req, res, next) {
    User.find()
        .select('-password')
        .exec(function (err, users) {
            return res.json({success: true, data: users});
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

/**
 * @apiUse commonHeaders
 * @apiUse authHeaders
 * @api {get} /users Get list of users
 * @apiName List
 * @apiGroup Users
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "data": [
 *        {
 *            "_id": "594275211142b603f8c5b596",
 *            "name": "admin",
 *            "admin": true
 *        }
 *    ]
 * }
 */


