var check = {
    checkLogin : function( req , res , next){
        if(!req.session.username){
            res.send({'isLogin' : 'false'});
            return false;
        }
        return true;
    },
    checkNotLogin : function(req , res , next){
        if(req.session.user){
            req.flash('error' , '已登录');
            return res.redirect('back');
        }
    }
};
module.exports = check;