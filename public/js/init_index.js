//public_module['userModule'].init({
//    targetId : 'content-right-wrap',
//    username : 'yang' ,
//    pwd : 1234
//});

var MainContentModel = React.createClass({
    getInitialState : function(){
        return{
            isLogin : false,
            showLoginLayer : 'none',
            showRegisterLayer : 'none',
            userData : {},
            userRank : 0,
            visitorRank : 0,
            blogLists : [],
            contentType : 'index'
        }
    },
    componentWillMount : function(){
        console.log(this.context);
        this.initContext();
        this.context.transferTime =function(str){
            var date = new Date(parseInt(str) * 1000);
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day= date.getDate();
            var hour= date.getHours();
            var minute= date.getMinutes();
            var second= date.getSeconds();
            return year+'-'+month+'-'+day+' '+hour+':'+minute;
        };
        dataComm.login($.cookie('username') , '' , this.loginCb.bind(this));
    },
    componentDidMount : function(){
        console.log('inupdate');
    },
    initContext : function(){
        $('#all-wrap').removeClass('login-bg');
        this.attention = [];
        this.context.isLogin=false;
        this.context.userRank = 0;
        this.context.visitorRank = 0;
        this.context.attention = [];
        this.context.blogType = 'likes';
        this.context.username = '';
        this.context.className = '';
        this.context.blogImgArray = [];
        this.context.store = [];
        this.context.likes = [];
    },
    doLogin : function(data){
        dataComm.login(data.username , data.pwd , this.loginCb.bind(this));
    },
    loginCb : function(userData){
        if( userData.msg == 'true'){//登录成功
            $('#all-wrap').addClass('login-bg');
            this.context.isLogin = true;
            this.context.className = 'top-login-background';
            this.context.username = userData.data.username;
            this.context.blogType = userData.data.username;
            this.context.attention = userData.data.attention;
            this.context.store = userData.data.store;
            this.context.likes = userData.data.likes;
            this.setState({isLogin : true , userData : userData , showLoginLayer : 'none' , blogLists : []});
            this.getBlogList('personal');
        }else{
            if(userData.loginType == 'pwd'){//密码错误
                alert('pwd error');
            }else{//未登录
                this.context.blogType = 'likes';
                this.getBlogList('likes');
                return;
            }
        }
    },
    loginOut : function(){
        dataComm.loginOut(this.context.username , this.loginOutCb.bind(this));

    },
    loginOutCb : function(){
        window.location.pathname = 'main/index';
        this.setState({isLogin : false , userData : {} , blogLists : []});
        this.initContext();
        this.getBlogList('likes');
    },
    doRegister : function(data){
        dataComm.register(data.username , data.pwd , this.registerCb.bind(this));
    },
    registerCb : function(data){
        if(data.msg == 'true'){
            this.setState({showLoginLayer : 'block' , showRegisterLayer : 'none'});
        }else{
            alert('register fail');
        }
    },
    getBlogList : function(type){
        var rank , authorArray;
        if(this.context.blogType == 'likes'){
            rank = this.context.visitorRank++;
        }else{
            rank = this.context.userRank++;
            authorArray = this.context.attention.concat([this.context.username])
        }
        console.log(authorArray);
        dataComm.getBlogList(type , authorArray, 4 , rank , this.getBlogCb.bind(this));
    },
    addBlog : function(data){
        dataComm.addOneBlog(this.context.username , Math.round(new Date().getTime()/1000) , 'personal' , data.blogContent , this.context.blogImgArray, this.addBlogCb.bind(this));
    },
    addBlogCb : function(data){
        console.log('in add blog cb');
    },
    toggleLoginLayer : function(){
        this.setState({showLoginLayer : 'block'});
    },
    hideLoginLayer : function(){
        this.setState({showLoginLayer : 'none'});
    },
    toggleRegisterLayer : function(){
        this.setState({showRegisterLayer : 'block'});
    },
    hideRegisterLayer : function(){
        this.setState({showRegisterLayer : 'none'});
    },
    getBlogCb : function(data){
        console.log('in GetBlogCb');
        console.log(data);
        this.setState({blogLists : data.data});
    },
    changeContentType : function(type){
        if(type == this.state.contentType){
            return;
        }
        this.setState({contentType : type});
        //this.initContext();
        this.context.userRank = 0;
        if(type == 'index'){
            this.getBlogList('personal');
        }else if(type == 'collect'){
            this.getBlogList('likes');
        }
    },
    render : function(){
        //if(window.location.pathname == '/main/userPage'){
        //    return (
        //        <div id="top-background" className="top-login-background">
        //            <HeaderModel isLogin={this.state.isLogin} onLogin={this.doLogin} onLoginOut={this.loginOut} onShowLoginLayer={this.toggleLoginLayer}/>
        //            <UserPagePortraitCom></UserPagePortraitCom>
        //            <section id="content-wrap">
        //                <UserPageNavCom></UserPageNavCom>
        //                <UserContentLeftCom></UserContentLeftCom>
        //                <UserContentRightCom isLogin={this.state.isLogin} blogDatas={this.state.blogLists} onAddBlog={this.addBlog} onBottom={this.getBlogList}/>
        //            </section>
        //        </div>
        //    )
        //}

        return (
            <div id="top-background" className={this.context.className}>
                <HeaderModel isLogin={this.state.isLogin} onLogin={this.doLogin} onLoginOut={this.loginOut} onShowLoginLayer={this.toggleLoginLayer} onShowRegisterLayer={this.toggleRegisterLayer}/>
                <LoginLayerModel showLoginLayer={this.state.showLoginLayer} onLogin={this.doLogin} onHideLoginLayer={this.hideLoginLayer}/>
                <RegisterLayerCom showRegisterLayer={this.state.showRegisterLayer} onRegister={this.doRegister} onHide={this.hideRegisterLayer}></RegisterLayerCom>
                <section className="content-wrap">
                    <LeftContentModel onChangeContentType={this.changeContentType}/>
                    <MiddleContentModel isLogin={this.state.isLogin} contentType={this.state.contentType} blogDatas={this.state.blogLists} onAddBlog={this.addBlog} onBottom={this.getBlogList} />
                    <RightContentModel isLogin={this.state.isLogin} onLogin={this.doLogin} userData={this.state.userData}/>
                </section>
            </div>
        )
    }
})


//ReactDOM.render(<LeftContentInner/> ,
//    document.getElementById('content-right-wrap')
//);
ReactDOM.render(
    <div>
        <MainContentModel/>
    </div> ,
    document.getElementById('all-wrap'));


