var express = require('express');
var router = express();

router.get('/' , function(req , res){
    console.log('in login');
    res.render('login.jade' , {title : '登陆'});
});

module.exports = router;