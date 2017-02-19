var OneBlogWrapCom = React.createClass({
    render : function(){
        console.log(this);
        var data = this.props.blogData;
        return(
            <div className="one-blog-wrap">
                <div className="one-blog-left">
                    <div className="head-portrait-wrap">
                        <a href={'/main/userPage?currentUser=' + data.author}>

                            <img src="../img/test/header-portrait.jpg" alt=""/>
                        </a>
                    </div>
                </div>
                <div className="one-blog-content-wrap">
                    <a href={'/main/userPage?currentUser=' + data.author}>
                        <h2 className="one-blog-title">{data.author}的微博</h2>
                    </a>
                    <span className="one-blog-time">{this.context.transferTime(data.date)}   <span className="one-blog-from">来自 微博</span></span>
                    <div className="one-blog-text">
                        <p>{data.contentText}</p>
                    </div>
                </div>
                <OneBlogImgCom imgArray={data.img}></OneBlogImgCom>


                <OneBlogFunctionCom blogData={data}></OneBlogFunctionCom>

            </div>
        )
    }
})

var OneBlogFunctionCom = React.createClass({
    getInitialState : function(){
        return{
            showComment : 'none',
            commentArray : [],
            commentContent : '',
            isLikes : '',
            isCollection : '',
            likesNumber : 0,
            commentNumber : 0,
            reprintNumber : 0
        }
    },
    handleChange : function(e){
        console.log(e.target.value);
        this.state.commentContent = e.target.value;
    },
    submitComment : function(){
        dataComm.addComment(this.props.blogData._id , this.context.username , Math.round(new Date().getTime()/1000) , this.state.commentContent , this.submitCommentCb.bind(this));
    },
    submitCommentCb : function(){
        dataComm.getComment(this.props.blogData._id , this.getCommentCb.bind(this));
    },
    //function btn
    addLike : function(){
        var isLike = this.context.likes.includes(this.props.blogData._id);
        if(isLike){
            this.context.likes.find((value , index) =>{
                if(value == this.props.blogData._id){
                    this.context.likes.splice(index , 1);
                }
            });
            this.setState({isLikes : '' , likesNumber : --this.state.likesNumber})
        }else{
            this.context.likes.push(this.props.blogData._id);
            this.setState({isLikes : '-hover' , likesNumber : ++this.state.likesNumber})
        }
        dataComm.addLikes(this.context.username , this.props.blogData._id , this.addLikesCb.bind(this));
    },
    addLikesCb : function(){

    },
    reprint : function(){

    },
    showComment : function(e){
        if(this.state.showComment == 'none'){
            dataComm.getComment(this.props.blogData._id , this.getCommentCb.bind(this));
            this.setState({showComment : 'block'})
        }else{
            this.setState({showComment : 'none'})
        };
    },
    addCollection : function(){
        var isCollection = this.context.store.includes(this.props.blogData._id);
        if(isCollection){
            this.context.store.find((value , index) =>{
                if(value == this.props.blogData._id){
                    this.context.store.splice(index , 1);
                }
            });
            this.setState({isCollection : ''})
        }else{
            this.context.store.push(this.props.blogData._id);
            this.setState({isCollection : '-hover'})
        }
        dataComm.addCollection(this.context.username , this.props.blogData._id , ()=>{});
    },
    getCommentCb : function(data){
        this.setState({commentArray : data.data});

    },
    componentWillMount : function(){
        let isExist = (type)=>{
            if(this.context[type].includes(this.props.blogData._id)){
                return '-hover'
            }else{
                return ''
            }
        };
        this.state.isLikes = isExist('likes');
        this.state.isCollection = isExist('store');
        this.state.likesNumber = this.props.blogData.likes;
        this.state.commentNumber = this.props.blogData.commentNumber;
    },
    componentWillReceiveProps : function(){

    },
    render : function(){
        var data = this.props.blogData;
        var commentList = this.state.commentArray.map((data) => {
            return (
                <div className="comment-list-wrap">
                    <div className="one-comment-wrap">
                        <div className="comment-portrait-wrap">
                            <img src="../img/test/header-portrait.jpg" alt=""/>
                        </div>
                        <div className="comment-content">
                            <div className="comment-p">
                                <span className="comment-username">{data.author}</span>
                                <span className="comment-text">：{data.contentText}</span>
                            </div>
                            <div className="comment-option-layer">
                                <span className="comment-time">{this.context.transferTime(data.date)}   </span>
                                <span className="comment-callback-btn">回复</span>
                            </div>

                            <DbCommentListCom dbCommentData ={data.childComment}></DbCommentListCom>
                        </div>
                    </div>
                </div>
            )
        });
        return (
            <div>
                <div className="function-wrap">
                    <ul className="function-ul">
                        <li className="function-li" onClick={this.addLike}><span className="function-button-wrap"><span
                            className={"button-icon likes-icon" + this.state.isLikes}></span><span className="likes-number">{this.state.likesNumber}</span></span></li>
                        <li className="function-li" onClick={this.reprint}><span className="function-line"><span className="function-button-wrap"><span
                            className={"button-icon reprint-icon" }></span><span className="reprint-number">123</span></span></span></li>
                        <li className="function-li" onClick={this.showComment}><span className="function-line"><span className="function-button-wrap"><span
                            className="button-icon comment-icon"></span><span className="comment-number">{this.state.commentNumber}</span></span></span>
                            <div style = {{display : this.state.showComment}}>
                                <span className="comment-arrow-position">
                                    <span className="arrow-wrap">
                                        <i className='arrow-icon-border'></i>
                                        <em className='arrow-icon'></em>
                                    </span>
                                </span>
                            </div>
                        </li>
                        <li className="function-li" onClick={this.addCollection}><span className="function-line"><span className="function-button-wrap"><span
                            className={"button-icon collection-icon" + this.state.isCollection}></span><span>收藏</span></span></span></li>
                    </ul>
                </div>


                <div className="comment-wrap" style = {{display : this.state.showComment}}>
                    <div className="comment-inner">
                        <div className="add-comment-wrap">
                            <div className="user-portrait-wrap">
                                <img src="../img/test/header-portrait.jpg" alt=""/>
                            </div>
                            <div className="comment-input-wrap">
                                <input type="text" id="add-comment-content" onChange={this.handleChange}/>
                            </div>
                            <div className="add-comment-btn-wrap">
                                <div className="add-comment-btn" onClick={this.submitComment}>评论</div>
                            </div>
                        </div>

                        {commentList}
                    </div>
                </div>
            </div>
        )
    }
});

var DbCommentListCom = React.createClass({
    render : function(){
        var data = this. props.dbCommentData;
        if(data.length == 0){
            return(
                <div></div>
            )
        }
        return(
            <div className="db-comment-list">
                <span className="db-comment-content">
                    <span className="db-comment-username">{data.author}</span>
                    <span className="db-comment-text">：{data.contentText}</span>
                    <div className="db-comment-time-wrap">
                        <p className="db-comment-time">{this.context.transferTime(data.date)}   </p>
                    </div>
                </span>
            </div>
        )

    }
})