var LeftContentModel = React.createClass({
    getInitialState : function(){
        return{
            isIndex : true,
            isCollection : false,
            isLike : false
        }
    },
    changeContentType : function(type){
        this.props.onChangeContentType(type);
        if(type == 'index'){
            this.setState({
                isIndex : true,
                isCollection : false,
                isLike : false

            });
        }else if(type == 'collect'){
            this.setState({
                isIndex : false,
                isCollection : true,
                isLike : false
            });
        }else if(type == 'like'){
            this.setState({
                isIndex : false,
                isCollection : false,
                isLike : true
            });
        }

    },
    render : function(){
        return(
            <nav className="left-nav">
                <ul id="left-nav-ul">
                    <li className={this.state.isIndex ? 'left-nav-li left-nav-hover' : 'left-nav-li'}  onClick={()=>{this.changeContentType('index')}}>
                        <div className="logo-left"></div>
                        <span className="left-text">首页</span>
                    </li>
                    <li className={this.state.isCollection ? 'left-nav-li left-nav-hover' : 'left-nav-li'} onClick={()=>{this.changeContentType('collect')}}>
                        <div className="logo-left"></div>
                        <span className="left-text">我的收藏</span>
                    </li>
                    <li className={this.state.isLike? 'left-nav-li left-nav-hover' : 'left-nav-li'}  onClick={()=>{this.changeContentType('like')}}>
                        <div className="logo-left"></div>
                        <span className="left-text">我的赞</span>
                    </li>
                </ul>
            </nav>
        )
    }
})