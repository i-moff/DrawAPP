const User = require('../models/user-model');
let admin = new User({
    name: 'admin',
    password: 'admin',
    admin: true
});
console.log('Create admin user...');
admin.save(function (err) {
    if (err) throw err;
});
