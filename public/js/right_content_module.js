var HotBlogModel = React.createClass({
    render : function(){
        return(
            <div id="hot-blog-wrap" className="content-right-inner">
                <div className="hot-blog-header">
                    <span className="hot-blog-title">热门文章</span>
                    <div className="hot-blog-change-button"><span className="hot-blog-icon"></span>换一换</div>
                </div>
                <div className="hot-blog-list">
                    <ul className="hot-blog-ul">
                        <li className="hot-blog-li"><span className="article-title">养生必知</span><span className="article-number">200人喜欢</span></li>
                        <li className="hot-blog-li"><span className="article-title">新闻必知</span><span className="article-number">200人喜欢</span></li>
                        <li className="hot-blog-li"><span className="article-title">养生必知</span><span className="article-number">200人喜欢</span></li>
                        <li className="hot-blog-li"><span className="article-title">养生必知</span><span className="article-number">200人喜欢</span></li>
                        <li className="hot-blog-li"><span className="article-title">养生必知</span><span className="article-number">200人喜欢</span></li>
                    </ul>
                </div>
            </div>
        )
    }
});
var LoginForm = React.createClass({
    getInitialState : function(){
        return {
            username : '',
            pwd : ''
        }
    },
    componentDidMount : function(){
        document.onkeydown = this.keyHandle();
    },
    handleUsername : function(e){
        this.state.username = e.target.value;
    },
    handlePwd : function(e){
        this.state.pwd = e.target.value;
    },
    clickHandle : function(){
        this.setState();
        var validation = this.validate();
        if(!validation){
            return;
        }
        this.context.isLogin = false;
        this.props.onLogin({username : this.state.username , pwd : this.state.pwd});
    },
    keyHandle : function(e){
        if(!e){
            return;
        }
        if(e.which == 13){
            this.clickHandle();
        }
        return;
    },
    validate : function(){
        var username = this.state.username,
            pwd = this.state.pwd;
        if(username == '' || pwd == ''){
            return false;
        }
        return true;
    },
    render : function(){
        return (
            <form>
                <div className="login-form-wrap">
                    <div className="login-input-wrap">
                        <span className="user-icon login-icon"></span>
                        <input type="text" id={"username-"+this.props.from} placeholder="请输入用户名"  onChange={this.handleUsername}></input>
                    </div>
                    <div className="login-input-wrap">
                        <span className="pwd-icon login-icon"></span>
                        <input type="password" id={"pwd-"+this.props.from} placeholder="请输入密码" onChange={this.handlePwd} onKeyDown={this.keyHandle}></input>
                    </div>
                </div>
                <div className="login-option-wrap">
                    <a href="">
                        <span id={'forget-pwd-' + this.props.from}>忘记密码</span>
                    </a>
                </div>
                <div className="login-button-wrap">
                    <div className="login-button" onClick={this.clickHandle}>登录</div>
                </div>
            </form>
        )
    }
});
var LoginModel = React.createClass({
    render : function(){
        if(this.props.isLogin){
            return (
                <UserDetailModel userData={this.props.userData}/>
            );
        }
        return (
            <div id="login-wrap" className="content-right-inner">
                <div className="login-header-wrap">
                    <span className="login-title">账号登录</span>
                </div>
                <LoginForm from="index" onLogin={this.props.onLogin}/>
                <div className="login-register-wrap">
                    <a href="">
                        <span id="register-text">还没有微博？<span>立即注册</span></span>
                    </a>
                </div>
            </div>

        )
    }
});
var UserDetailModel = React.createClass({
    render : function(){
        var data = this.props.userData.data;
        return (
            <div id="user-detail-wrap" className="content-right-inner">
                <div className="head-portrait-wrap">
                    <a href={'/main/userPage?currentUser=' + data.username}>
                        <img src="../img/test/header-portrait.jpg" alt=""/>
                    </a>
                </div>
                <div className="user-detail-bg">
                    <img src="../img/user_bg/test_bg.jpg" alt=""/>
                </div>
                <div className="username-wrap">
                    <a href="">
                        <span>{data.username}</span>
                    </a>
                </div>
                <div className="user-detail-content">
                    <ul className="user-detail-ul">
                        <li className="user-detail-li"><a href=""><p>{data.attentionNumber}</p><span>关注</span></a></li>
                        <li className="user-detail-li"><a href=""><p>{data.isAttentionNumber}</p><span>粉丝</span></a></li>
                        <li className="user-detail-li"><a href=""><p>{data.blogNumber}</p><span>微博</span></a></li>
                    </ul>
                </div>
            </div>
        )
    }
});
var RightContentModel = React.createClass({
    getInitialState : function(){
        return{
            isLogin : false
        }
    },
    doLogin : function(data){
        dataComm.login(data.username , data.pwd , this.loginCb.bind(this));
    },
    loginCb : function(data){
        if( data.msg == 'true'){
            this.setState({isLogin : true});
            this.props.onLogin(this.state.isLogin);
        }else{
            alert('pwd error');
        }
    },
    render : function(){
        return (
            <section id="content-right-wrap">
                <LoginModel isLogin={this.props.isLogin} onLogin={this.props.onLogin} userData={this.props.userData}></LoginModel>
                <HotBlogModel/>
            </section>
        )
    }
})