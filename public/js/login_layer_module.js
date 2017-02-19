var LoginLayerModel = React.createClass({
    handleLoginClick : function(){

    },
    render : function(){
        return (
            <section id="login-layer" ref='loginLayer' style={{display : this.props.showLoginLayer}}>
                <div id="login-layer-wrap">
                    <div className="login-layer-close" onClick={this.props.onHideLoginLayer}></div>

                    <div id="login-layer-inner">
                        <div className="login-header-wrap">
                            <span className="login-title">账号登录</span>
                        </div>
                        <LoginForm from="loginLayer" onLogin={this.props.onLogin}/>
                        <div className="login-register-wrap">
                        <a href="">
                            <span id="register-text">还没有微博？<span>立即注册</span></span>
                        </a>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
})