var UserPageNavCom = React.createClass({
    render : function(){
        if(this.context.username == this.context.currentUser){
            return (
                <nav id="user-page-nav">
                    <ul className="user-page-nav-ul">
                        <li className="user-page-nav-li"><div className="li-inner"><span onClick={()=>{this.props.onChangeContent('blog')}}>我的主页</span></div></li>
                        <li className="user-page-nav-li"><div className="li-inner" onClick={()=>{this.props.onChangeContent('pic')}}><span>我的相册</span></div></li>
                        <li className="user-page-nav-li"><div className="li-inner" onClick={()=>{this.props.onChangeContent('manage')}}><span>管理中心</span></div></li>
                    </ul>
                </nav>
            )
        }else{
            return(
                <nav id="user-page-nav">
                    <ul className="user-page-nav-ul">
                        <li className="other-page-nav-li"><div className="li-inner"><span onClick={()=>{this.props.onChangeContent('blog')}}>TA的主页</span></div></li>
                        <li className="other-page-nav-li"><div className="li-inner" onClick={()=>{this.props.onChangeContent('pic')}}><span>TA的相册</span></div></li>
                    </ul>
                </nav>
            )
        }
    }
})