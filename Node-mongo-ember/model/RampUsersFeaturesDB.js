/**
 * Created by ptumkurseetharamu on 6/22/15.
 */

var mongoose = require('mongoose');

var usersFeatures = {
    customerNo: String,
    features : {}
};

module.exports = mongoose.model('usersFeatures', usersFeatures, 'RampUsersFeaturesDB');
