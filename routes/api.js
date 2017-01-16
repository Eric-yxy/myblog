var http = require('http'),
    users = require('./users');
var schemaObj = require('../database/database_schema');
var userSchema = schemaObj.userSchema;
var blogSchema = schemaObj.blogSchema;

exports.api = function(req , res , next){
    // mongodb connect
    console.log(req.query.do + '=============');
    //distribute api
    if(req.query.do == 'express.user.uploadImg'){
        users.uploadImg(req , res);
    }

    if(req.query.do == 'express.user.login'){
        users.login(req , res);
    }
    if(req.query.do == 'express.user.register'){
        users.register(req , res);
    }
    if(req.query.do == 'express.user.isLogin'){
        users.isLogin(req , res);
    }
    if(req.query.do == 'express.user.loginOut'){
        users.loginOut(req , res);
    }
    if(req.query.do == 'express.user.getBlogList'){
        users.getBlogList(req , res , blogSchema);
    }
    if(req.query.do == 'express.user.addOneBlog'){
        users.addOneBlog(req , res , blogSchema , next);
    }
    if(req.query.do == 'express.user.addComment'){
        users.addComment(req , res , blogSchema);
    }
    if(req.query.do == 'express.user.addLikes'){
        users.addLikes(req , res , blogSchema);
    }
    if(req.query.do == 'express.user.addAttention'){
        users.addAttention(req , res , blogSchema);
    }


}