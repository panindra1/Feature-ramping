var express = require('express');
var router = express.Router();
var user = require("../model/model.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    /*user.find({password : "Pani"}, function(error, object) {
      console.log(object);
    });*/
    //console.log(object)
    var obj = {
      username: "pani",
      password: "pani"
    };

     user.create(obj, function(error, object) {
       //user.remove({});
       console.log(object);
     });

      res.send("response");
});
/*
var obj = {
  firstName: "Pani",
  lastName: "TS",
  email: "pani.da"
}

Person.create(obj, function(error, object) {
  console.log(object)
});



*/
module.exports = router;
