const AuthenticationController = require('./controllers/authentication-controller'),
    UserController = require('./controllers/user-controller'),
    SetupController = require('./controllers/setup-controller'),
    express = require('express'),
    checkToken = require('./middelwares/check-token-midleware').checkTokenMiddleware;

module.exports = function (app) {
    const userRoutes = express.Router(),
        authRoutes = express.Router(),
        setupRoutes = express.Router();

    setupRoutes.get('/setup', SetupController.init);

    userRoutes.get('/users', UserController.users);
    userRoutes.post('/users', UserController.createUser);

    authRoutes.post('/login', AuthenticationController.login);

    app.use('/', setupRoutes);
    app.use('/api', authRoutes);
    app.use('/api', checkToken, userRoutes);
};