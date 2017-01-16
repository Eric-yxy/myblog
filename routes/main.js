var express = require('express');

var router = express();

router.get('/index' , function(req , res){
    res.render('index.jade');
});

module.exports = router;