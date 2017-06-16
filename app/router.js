const AuthController = require('./controllers/auth-controller'),
    UserController = require('./controllers/user-controller'),
    express = require('express'),
    checkToken = require('./middelwares/check-token-midleware').checkTokenMiddleware;

module.exports = function (app) {
    const userRoutes = express.Router(),
        authRoutes = express.Router();

    userRoutes.get('/users', UserController.users);
    userRoutes.post('/users', UserController.createUser);

    authRoutes.post('/login', AuthController.login);

    app.use('/api', authRoutes);
    app.use('/api', checkToken, userRoutes);
};