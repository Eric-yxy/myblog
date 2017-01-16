module.exports = function(app){
    app.get('/' , function(req , res){
        res.render('/posts');
    });
    app.use('/posts' , require('./posts'));
    app.use('/login' , require('./login'));
    app.use('/main' , require('./main'));
    //app.use('/signin' , require('./signin'));
    //app.use('/signup' , require('./signup'));
    //app.use('/signout' , require('./signout'));
    app.post('/express' , require('./api').api);
}