/**
 * Created by ptumkurseetharamu on 6/21/15.
 */
var mongoose = require('mongoose');

var authScheme1 = {
    features : {},
}

module.exports = mongoose.model('authScheme1', authScheme1, 'RampFeaturesDB')
