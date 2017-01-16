var express = require('express');
var router = express();


var checkLogin = require('../middlewares/check').checkLogin;

router.get('/test' , function(req , res , next){
    console.log('in tesst -------');
    res.render('test.jade' , { title : 'test page' , content : 'this is test page!'});
});

router.get('/', function(req, res, next) {
    console.log('in router-------------------------');
    //console.log(req.session);
    //if(req.session.lastPage){
    //    console.log(req.session.lastPage);
    //};
    //console.log('start');
    //req.session.lastPage = '/poster';
    res.send('a');
    console.log('end');

});
router.get('/yang' , function(req , res){
    if(req.session.lasPage){
        console.log(req.session.lastPage);
    }
    req.session.lastPage = '/poster/yang';
    res.send('this is pages yang');
})

//// POST /posts 发表一篇文章
//router.post('/', checkLogin, function(req, res, next) {
//    res.send(req.flash());
//});
//
//// GET /posts/create 发表文章页
//router.get('/create', checkLogin, function(req, res, next) {
//    res.send(req.flash());
//});
//
//// GET /posts/:postId 单独一篇的文章页
//router.get('/:postId', function(req, res, next) {
//    res.send(req.flash());
//});
//
//// GET /posts/:postId/edit 更新文章页
//router.get('/:postId/edit', checkLogin, function(req, res, next) {
//    res.send(req.flash());
//});
//
//router.post('/:postId/edit', checkLogin, function(req, res, next) {
//    res.send(req.flash());
//});
//
//// GET /posts/:postId/remove 删除一篇文章
//router.get('/:postId/remove', checkLogin, function(req, res, next) {
//    res.send(req.flash());
//});
//
//// POST /posts/:postId/comment 创建一条留言
//router.post('/:postId/comment', checkLogin, function(req, res, next) {
//    res.send(req.flash());
//});
//
//// GET /posts/:postId/comment/:commentId/remove 删除一条留言
//router.get('/:postId/comment/:commentId/remove', checkLogin, function(req, res, next) {
//    res.send(req.flash());
//});

module.exports = router;