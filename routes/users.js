var http = require('http');
var mongoose = require('mongoose');
var fs = require('fs');
var multiparty = require('multiparty');
var checkLogin = require('../middlewares/check.js').checkLogin;
var ObjectId = mongoose.Types.ObjectId;
var schemaObj = require('../database/database_schema');
var userSchema = schemaObj.userSchema,
    blogSchema = schemaObj.blogSchema;
var UserModel = mongoose.model('user' , userSchema)
    blogModel = mongoose.model('blog' , blogSchema);
var resObj = {'msg' : 'true'};

var uploadImg = function(req , res){
    var form = new multiparty.Form({
        uploadDir : './public/img/blog_img/'
    });
    form.parse(req , function(err , fields , files){
        if(err) return console.log(err);
        console.log(files);
        var inputImg = files.upload[0];
        var uploadedPath = inputImg.path;
        var newPath = 'public/img/blog_img/' + new Date().getTime() + inputImg.originalFilename;
        fs.renameSync(uploadedPath , newPath );
        res.send(newPath);
    })
}

var deleteImg = function(req , res){

}

var login = function(req , res , dbConnect){
    var resObj = {
        'msg': 'true',
        data : {}
    }
    console.log('login successfully');
    var data = req.body;
    UserModel.find( data , function(err , item){
        if(err) res.send({'msg' : 'error'});
        //console.log(item[0]._id);
        if(err) {
            return console.err(err);
        }
        if(item[0] == undefined){
            console.log('in if')
            resObj.msg = 'error';
        }else{
            console.log(req.session);
            req.session.username = resObj.data.username = item[0].username;
            res.cookie('username' , resObj.username);
            resObj.data._id = item[0]._id;
            resObj.data.attentionNumber = item[0].attention.length;
            resObj.data.isAttentionNumber = item[0].isAttention.length;
            resObj.data.blogNumber = item[0].blogNumber;
            //req.session.cookie
        }
        console.log(req.session);
        res.send(resObj);
    })

}

var register = function(req , res , dbConnect){
    var resObj = {
        'msg' : 'true'
    }
    var data = req.body;
    //var UserSchema = mongoose.model('user' , dbConnect);
    var user = new UserModel(data);
    user.save(function(err , res){
        if(err) return console.error(err);
        console.log(res);
    });
    console.log('register successfully')
    res.send(resObj);
}

var isLogin = function(req , res , dbConnect){
    var resObj = {
        'msg' : 'true'
    }
    console.log(req.session);
    console.log(resObj);
    if(req.session.username){
        res.send(resObj);
    }else{
        resObj.msg = 'false';
        res.send(resObj);
    }
    //res.send(resObj);
    //res.send('a');
}

var loginOut = function(req , res){
    var resObj = {
        'msg' : 'true'
    };
    req.session.username = null;
    console.log(req.session);
    res.send(resObj);
}

var getBlogList = function(req , res , schema){
    var resObj = {
        'msg' : 'true'
    };
    var type = req.body.type,
        number = Number(req.body.blogNumber),
        rank = Number(req.body.rank);
    console.log(req.body);
    //var blogModel= mongoose.model('blog' , schema);
        blogModel.find().sort({'likes' : -1}).limit(number).skip(rank).exec(function(err , item){
        console.log(item);
        res.send(item);
    });
}

var addOneBlog = function(req , res){
    //var isLogin = checkLogin(req , res , next);
    //if(!isLogin){
    //    return;
    //}
    var data = req.body,
        userId;
    console.log(data);
    UserModel.update({'username' : data.author} , {$inc : {'blogNumber' : +1 }} , function(){});
    UserModel.find({'username' : data.author} , function(err , item){
        userId = item[0]._id;
        data.authorId = userId;
        var blog = new blogModel(data);
        console.log(blog.id);
        blog.save();
        res.send(resObj);
    });
}

var addComment = function(req , res){
    // 验证登录
    //var isLogin = checkLogin(req , res , next);
    //if(!isLogin){
    //    return;
    //}
    var data = req.body;
    console.log(data);
    //var blogModel = mongoose.model('blog' , schema);
    //blogModel.update({'_id' : ObjectId('58762fab1af4d2408c1ffc4c')} , {'$addToSet' : {'comments' : data}});
    //blogModel.update({
    //    '_id' : ObjectId('58762fab1af4d2408c1ffc4c')
    //} , {
    //    $push : {
    //        'comments' : {'array' : '123'}
    //    }
    //} , function(err , number , raw){
    //    console.log( number);
    //    console.log('the raw is' + raw);
    //});
    blogModel.findOneAndUpdate({'_id' : '58762fab1af4d2408c1ffc4c'} , { $push : {'comments' : data}} , function(err){
            if(err)console.log(err);
    });
    res.send(resObj);
}

var addLikes = function(req , res , schema){
    //var isLogin = checkLogin(req , res , next);
    //if(!isLogin){
    //    return;
    //}
    var data = req.body;
    blogModel.update({'_id' : data.blogId} , {$inc : {'likes' : +1}} , function(err , item){
        if(err) console.error(err);
        console.log(item);
    });
    UserModel.update({'username' : data.username} , {$push : {'likes' : {'blogId' : data.blogId}}} ,function(){});
    res.send(resObj);
}

var addAttention = function(req , res , schema){
    //var isLogin = checkLogin(req , res , next);
    //if(!isLogin){
    //    return;
    //}
    var data = req.body;
    UserModel.update({'username' : data.username} , {$push : {'attention' : { 'username' : data.attentionUserName}}} , function(){});
    UserModel.update({'username' : data.attentionUserName} , {$push : {'isAttention' : {'username' : data.username}}} , function(){});
    res.send(resObj);
}


exports.uploadImg = uploadImg;
exports.login = login;
exports.register = register;
exports.isLogin = isLogin;
exports.loginOut = loginOut;
exports.getBlogList = getBlogList;
exports.addOneBlog = addOneBlog;
exports.addComment = addComment;
exports.addLikes = addLikes;
exports.addAttention = addAttention;
