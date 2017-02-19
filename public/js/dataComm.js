var DataComm = function(ip){
    this.ip = ip;
    this.ajaxObj = {
        url : this.ip + '/express?do=',
        dataType : 'json',
        type : 'post',
        data : {},
        success : function(data){

        },
        error : function(error){
            //alert(error);
            console.log(error);
        }
    }
};

DataComm.prototype.fillObj = function(url , data , callback){
    this.ajaxObj.url = this.ip + url;
    this.ajaxObj.data = data;
    if(callback){
        this.ajaxObj.success = (function(callback){
            return function(data){
                callback(data);
            }
        })(callback);
    }
}

DataComm.prototype.login = function(username , password , callback){
    this.fillObj('/express/?do=express.user.login' , {'username' : username , 'password' : password } , callback);
    $.ajax(this.ajaxObj);
}

DataComm.prototype.register = function(username , password , callback){
    this.fillObj('/express/?do=express.user.register' , {'username' : username , 'password' : password } , callback);
    $.ajax(this.ajaxObj);
}

DataComm.prototype.isLogin = function(username , callback){
    this.fillObj('/express/?do=express.user.isLogin' , {'username' : username} , callback);
    $.ajax(this.ajaxObj);
}

DataComm.prototype.loginOut = function(username , callback){
    this.fillObj('/express/?do=express.user.loginOut' , {'username' : username} , callback);
    this.ajaxObj.dataType = null;
    $.ajax(this.ajaxObj);
}

DataComm.prototype.getBlogList = function(type , blogAuthorArray , blogNumber , rank , callback){
    this.fillObj('/express/?do=express.user.getBlogList' , {'type' : type , 'blogAuthorArray' : blogAuthorArray , 'blogNumber' : blogNumber , 'rank' : rank} , callback);
    $.ajax(this.ajaxObj);
}

DataComm.prototype.addOneBlog = function(author , date , type , contentText , contentPic , callback){
    this.fillObj('/express/?do=express.user.addOneBlog' , {'author' : author , 'date' : date , 'type' : type , 'contentText' : contentText , 'img' : contentPic} , callback);
    console.log(this.ajaxObj);
    $.ajax(this.ajaxObj);
}

DataComm.prototype.addComment = function(blogId , author ,date , contentText , callback){
    this.fillObj('/express/?do=express.user.addComment' , {'blogId' : blogId , 'author' : author , 'date' : date , 'contentText' : contentText} , callback);
    $.ajax(this.ajaxObj);
}

DataComm.prototype.addLikes = function(username , blogId , callback){
    this.fillObj('/express/?do=express.user.addLikes' , {'username' : username , 'blogId' : blogId} , callback);
    $.ajax(this.ajaxObj);
}

DataComm.prototype.addCollection = function(username , blogId , callback){
    this.fillObj('/express/?do=express.user.addCollection' , {'username' : username , 'blogId' : blogId} , callback);
    $.ajax(this.ajaxObj);
}

DataComm.prototype.addAttention = function(username , attentionUserName , callback){
    this.fillObj('/express/?do=express.user.addAttention' , {'username' : username , 'attentionUserName' : attentionUserName} , callback);
    $.ajax(this.ajaxObj);
}

DataComm.prototype.getUserData = function(username , callback){
    this.fillObj('/express/?do=express.user.getUserData' , {'username' : username} , callback);
    $.ajax(this.ajaxObj);
}

DataComm.prototype.getComment = function(blogId , callback){
    this.fillObj('/express/?do=express.user.getComment' , {'blogId' : blogId} , callback);
    $.ajax(this.ajaxObj);
}

DataComm.prototype.updateUserDetail = function(username , userData , callback){
    var data = {'username' : username , 'userData' : userData};
    this.fillObj('/express/?do=express.user.updateUserDetail' , { data : JSON.stringify(data) }, callback);
    console.log(this.ajaxObj);
    $.ajax(this.ajaxObj);
}


var dataComm = new DataComm('http://localhost:8000');