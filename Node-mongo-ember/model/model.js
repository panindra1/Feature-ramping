var mongoose = require('mongoose');

var authScheme = {
    customerNo: String,
    username : String,
    password: String
}

module.exports = mongoose.model('authScheme', authScheme, 'RampUsersDB')

