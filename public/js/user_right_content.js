var UserContentRightCom = React.createClass({
    render : function(){
        console.log(this.props.blogDatas);
        if(this.props.contentName == 'blog'){
            return (
                <div id="right-content-wrap">
                    <UserBlogListCom blogDatas={this.props.blogDatas} onBottom={this.props.onBottom}></UserBlogListCom>
                </div>
            )
        }else if(this.props.contentName == 'pic'){
            return (
                <div id="right-content-wrap">
                    <UserImgContentCom blogData={this.props.blogDatas}></UserImgContentCom>
                </div>
            )
        }else if(this.props.contentName == 'manage'){
            return (
                <div id="right-content-wrap">
                    <UserInfoCom></UserInfoCom>
                </div>
            )
        }
    }
});

var UserBlogListCom = React.createClass({
    getInitialState : function(){
        return {
            blogArray : [],
            isIndex : true
        }
    },
    componentWillMount : function(){
        this.handleScroll = this.handleScroll.bind(this);
        window.addEventListener('scroll' , this.handleScroll);
    },
    handleScroll : function(e , eventName){
        if($(window).scrollTop() >= $(document).height() - $(window).height()){
            this.props.onBottom('personal');
        }
    },
    componentWillUnmount : function(){
        window.removeEventListener('scroll' , this.handleScroll);
    },
    shouldComponentUpdate : function(nextP , nextS){
        console.log('in should update');
        //this.setState({blogArray : [1,2]});
        //if(this.context !=){
        //    this.state.blogArray = [];
        //}
        //this.state.isLogin = this.context.isLogin;
        this.state.blogArray = this.state.blogArray.concat(nextP.blogDatas);
        return true;
    },
    render : function(){
        if(this.state.blogArray.length == 0){
            return (<div></div>)
        };
        var blogList = this.state.blogArray.map(function(data){
            return(
                <OneBlogWrapCom blogData={data}></OneBlogWrapCom>
            )
        }.bind(this));
        return (
            <div>
                {blogList}
            </div>
        )
    }
});

var OneBlogImgCom = React.createClass({

    render : function(){
        let imgUrl = '../public/img/blog_img/1485056908082屏幕快照 2016-12-28 下午5.49.21.png'.replace(/\s/g , '%20');
        let imgArray = this.props.imgArray;
        let imgList = imgArray.map(function(url){
            if(url == ''){
                return(
                    <div></div>
                )
            }
            return(
                <div className="img-wrap" style={{backgroundImage : 'url(../' + url.replace(/\s/g , '%20') + ')'}}></div>
            )
        })
        return(
            <div className="one-blog-img-list">
                {imgList}
            </div>
        )
    }
})