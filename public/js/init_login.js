//
//var UserModule = function(){
//    this.validation = function(){}
//};
//UserModule.prototype.renderHtml = function(data){
//    var obj = data.data;
//    console.log(obj);
//    var render = template.compile(public_html.user_detail_html);
//    var html = render({
//        username : obj.username,
//        attentionNumber : obj.attentionNumber,
//        isAttentionNumber : obj.isAttentionNumber,
//        blogNumber : obj.blogNumber
//    });
//    this.appendHtml(html);
//}
//UserModule.prototype.appendHtml = function(html){
//    console.log(this.id);
//    $('#' + this.id).prepend(html);
//}
//UserModule.prototype.validate = function(html){
//}
//UserModule.prototype.bindToEle = function(){
//    $('#' + this.usernameId)
//}
//UserModule.prototype.init = function(obj){
//    this.id = obj.targetId;
//    this.usernameId = obj.usernameId;
//    this.pwdId = obj.pwdId;
//    dataComm.login('yang' , 1234 , this.renderHtml.bind(this));
//};
//public_module.userModule = new UserModule();
//
//
//
//
