const User = require('../models/user-model');
const userHelper = require('../helpers/user-helper');

exports.login = function (req, res, next) {
    User.findOne({name: req.body.name}, function (err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(422).json({success: false, message: 'Authentication failed. User not found.'});
            }

            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch) {
                    return res.json({success: false, message: 'Invalid credentials.'});
                }

                return res.json({
                    success: true,
                    token: userHelper.generateToken(user)
                });
            });
        }
    );
};

/**
 * @apiDefine commonHeaders
 * @apiHeader {String} Content-Type application/json
 */

/**
 * @apiDefine authHeaders
 * @apiHeader {String} x-access-token USER_TOKEN
 */

/**
 * @apiUse commonHeaders
 * @api {post} /login Login user
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiParam {String} name Username
 * @apiParam {String} password User password
 *
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "success": false,
 *   "message": "Invalid credentials."
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "message": "Enjoy your token!",
 *    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZzI1NiIsInR5cC45GFGI6IkpXVCJ9"
 * }
 */

