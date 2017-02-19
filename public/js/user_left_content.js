var UserContentLeftCom = React.createClass({

    render : function(){
        var data = this.props.currentUserData;
        console.log(data);
        if(data == undefined){
            return (<div></div>);
        }
        return(
            <div id="left-content-wrap">
                <div className="user-detail-content">
                    <ul className="user-detail-ul">
                        <li className="user-detail-li"><a href=""><p>关注</p><span>{data.attentionNumber}</span></a></li>
                        <li className="user-detail-li"><a href=""><p>粉丝</p><span>{data.isAttentionNumber}</span></a></li>
                        <li className="user-detail-li"><a href=""><p>微博</p><span>{data.blogNumber}</span></a></li>
                    </ul>
                </div>
            </div>
        )
    }
})