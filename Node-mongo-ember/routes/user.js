var express = require('express');
var router = express.Router();
var user = require("../model/model.js");
var feature = require("../model/Features.js")
var userFeatures = require("../model/RampUsersFeaturesDB.js")

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  var username = getParameterByName("username", req.url);
  var password = getParameterByName("password", req.url);

  user.find({username: username, password : password}, function(error, object) {
    console.log(error);
    if (object.length != 0) {
      //res.send({"authentication": "success"});
      res.send({"customerNo" : object[0]["customerNo"]})
    }
    else {
      res.send("failure");
    }

    console.log(object);
  });

});

router.get('/addUser', function(req, res, next) {
  //res.send('respond with a resource');
  var username = getParameterByName("username", req.url);
  var password = getParameterByName("password", req.url);
  var customerNo = getParameterByName("customerNo", req.url);
  //res.send("success");

  user.create({customerNo: customerNo, username: username, password : password}, function(error, object) {
    console.log(error);
    if (object.length != 0) {
      res.send("Added!");

      var defaultfeatures = {"Logging" : true, "Authentication": false, "Instrumentation" : true, "Notificaitons": false, "Email_marketting": true, "GoSocial": true }
      userFeatures.create({customerNo: customerNo, features: defaultfeatures}, function(error, object) {
        console.log(object);
      });
    }
    else {
      res.send("Could not add");
    }

    console.log(object);
  });

});

router.get('/listUsers', function(req, res, next) {
  user.find(function(error, object) {
    if (object.length != 0) {
      res.send(object);
    }
    else {
      res.send("failure");
    }
  });
});

router.get('/getUser', function(req, res, next) {
  var username = getParameterByName("username", req.url);
  var password = getParameterByName("password", req.url);

  user.find({username: username, password : password}, function(error, object) {
    if (object.length != 0) {
      res.send(object);
    }
    else {
      res.send("failure");
    }
  });
});

router.get('/getUserSettings', function(req, res, next) {
  var customerNo = getParameterByName("customerNo", req.url);

  userFeatures.find({customerNo: customerNo}, function(error, object) {
    if (object.length != 0) {
      var cacheMinutes = new Date();
      var newDateObj = new Date(cacheMinutes.getTime() + 2*60000);
      object[0]["features"]["Exp_date"] =  newDateObj.getTime();
      //console.log(object)
      res.send(object);
    }
    else {
      res.send("failure");
    }
  });
});


router.get('/getSettings', function(req, res, next) {
  feature.find(function(error, object) {
    if (object.length != 0) {
      res.send(object);
    }
    else {
      res.send("failure");
    }
  });
});

router.get('/saveSettings', function(req, res, next) {
    var features =  req.query.features;
    var customerNo = req.query.customerNo;
    //console.log(features.Logging);
    var keys = Object.keys(features);

    for(var i = 0; i < keys.length; i++) {
      features[keys[i]] = (features[keys[i]] === 'true')
    }
    //console.log(features);
    userFeatures.update({customerNo : customerNo}, {features : features}, function(error, object) {
      if (object.length != 0) {
        res.send("success");
      }
      else {
        res.send("failure");
      }
    });

});

router.get('/saveDefaultSettings', function(req, res, next) {
  var defaultFeatures =  req.query.features;
  //console.log(features.Logging);
  var keys = Object.keys(defaultFeatures);

  for(var i = 0; i < keys.length; i++) {
    defaultFeatures[keys[i]] = (defaultFeatures[keys[i]] === 'true')
  }

  console.log("Default : " + JSON.stringify(defaultFeatures));

  feature.update({features : defaultFeatures}, function(error, object) {
    if (object.length != 0) {
      res.send("success");
    }
    else {
      res.send("failure");
    }
  });

});


function getParameterByName(name, url) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

module.exports = router;
