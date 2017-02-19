var RegisterLayerCom = React.createClass({

    render : function(){
        return (
            <section id="login-layer" ref='loginLayer' style={{display : this.props.showRegisterLayer}}>
                <div id="login-layer-wrap">
                    <div className="login-layer-close" onClick={this.props.onHide}></div>

                    <div id="login-layer-inner">
                        <div className="login-header-wrap">
                            <span className="login-title">注册账号</span>
                        </div>
                        <RegisterFormCom from="loginLayer" onRegister={this.props.onRegister}/>
                    </div>
                </div>
            </section>
        )
    }
})

var RegisterFormCom = React.createClass({
    getInitialState : function(){
        return{
            username : '',
            pwd : ''
        }
    },
    handleUsername : function(e){
        this.state.username =  e.target.value;
    },
    handlePwd : function(e){
        this.state.pwd = e.target.value;
    },
    clickHandle : function(){
        this.props.onRegister({username : this.state.username , pwd : this.state.pwd});
    },
    render : function(){
        return (
            <form>
                <div className="login-form-wrap">
                    <div className="login-input-wrap">
                        <span className="user-icon login-icon"></span>
                        <input type="text"  placeholder="请输入用户名"  onChange={this.handleUsername}></input>
                        <input type="text" style={{display : 'none'}} />
                    </div>
                    <div className="login-input-wrap">
                        <span className="pwd-icon login-icon"></span>
                        <input type="password"  placeholder="请输入密码" onChange={this.handlePwd} onKeyDown={this.keyHandle}></input>
                    </div>
                </div>

                <div className="login-button-wrap" style={{marginTop : 30}}>
                    <div className="login-button" onClick={this.clickHandle}>注册</div>
                </div>
            </form>
        )
    }
})