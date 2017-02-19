var HeaderModel = React.createClass({
    render : function(){
        return (
            <header>
                <section id="header-wrap">
                    <div className="logo-wrap">
                        <a href="/main/index">
                            <span className="logo-sapn"></span>
                        </a>
                    </div>
                    <HeaderLoginModel isLogin={this.props.isLogin} onLoginOut={this.props.onLoginOut} onShowLoginLayer={this.props.onShowLoginLayer} onShowRegisterLayer={this.props.onShowRegisterLayer}/>
                    <div className="header-ul-wrap">
                        <ul className="header-ul">
                            <HeaderNavUserModel isLogin={this.props.isLogin}/>
                            <li className="header-li">
                                <a href="/">
                                    <div className="header-png">
                                        <div className="header-png-inner header-3"></div>
                                    </div>
                                    <span className="header-text"><p>发现</p></span>
                                </a>
                            </li>
                            <li className="header-li">
                                <a href="/">
                                    <div className="header-png">
                                        <div className="header-png-inner header-2"></div>
                                    </div>
                                    <span className="header-text"><p>视频</p></span>
                                </a>
                            </li>
                            <li className="header-li">
                                <a href="/main/index">
                                    <div className="header-png">
                                        <div className="header-png-inner header-1"></div>
                                    </div>
                                    <div className="header-text"><p>首页</p></div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
            </header>
        )
    }
});
var HeaderLoginModel = React.createClass({
    showLoginLayer : function(){
        this.props.onShowLoginLayer();
    },
    showRegisterLayer : function(){
        this.props.onShowRegisterLayer();
    },
    render : function(){
        if(this.props.isLogin){
            return(
                <div className="login-wrap set-wrap">
                    <div className="user-icon user-set-icon"></div>
                    <div className="user-icon user-loginOut-icon" onClick={this.props.onLoginOut}></div>
                </div>
            )
        }
        var a = this.props.isLogin;
        return (
            <div className="login-wrap">
                <div className="login-inner"><span onClick={this.showRegisterLayer}>注册</span></div>
                <div className="vertical-line"></div>
                <div className="login-inner" ><span onClick={this.showLoginLayer}>登录</span></div>
            </div>
        )
    }
})
var HeaderNavUserModel = React.createClass({
    render : function(){
        if(this.props.isLogin){
            return(
                <li className="header-li">
                    <a href="/main/userPage">
                        <div className="header-png">
                            <div className="header-png-inner header-4"></div>
                        </div>
                        <span className="header-text"><p>{this.context.username}</p></span>
                    </a>
                </li>
            )
        }
        return(
            <div></div>
        )
    }
})
