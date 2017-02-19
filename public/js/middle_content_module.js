var MiddleContentModel = React.createClass({
    render : function(){
        return (
            <section id="content-list-wrap">
                <EditBlogModel isLogin={this.props.isLogin} onAddBlog={this.props.onAddBlog}/>
                <BlogListModel blogDatas={this.props.blogDatas} contentType={this.props.contentType} onBottom={this.props.onBottom}></BlogListModel>
            </section>
        )
    }
});
var EditBlogModel = React.createClass({
    getInitialState : function(){
        return {
            blogText : '',
            showNumber : 'none',
            imgHasUploaded : 'false'
        }
    },
    handleChange : function(e){
        this.setState({blogText : e.target.value})
    },
    showNumber : function(){
        this.setState({showNumber : 'inline'})
    },
    hideNumber : function(){
        if(this.state.blogText.length == 0){
            this.setState({showNumber : 'none'});
        }
    },
    handleClick : function(){
        if(this.state.blogText.length == 0){
            return;
        }
        this.props.onAddBlog({blogContent : this.state.blogText});
        this.setState({blogText : '' , showNumber : 'none' , imgHasUploaded : 'true'});
        console.log(this.state.blogText);
    },
    render : function(){
        if(this.props.isLogin){
            return (
                <div id="edit-blog-wrap">
                    <h2 className="edit-blog-title">想要告诉大家什么有趣的事？<span style={{display : this.state.showNumber}} className="textareaNumber">已输入<span>{this.state.blogText.length}</span>字</span></h2>
                    <div className="edit-input-wrap">
                        <textarea rows="10" id="edit-input" onInput={this.showNumber} onBlur={this.hideNumber} onChange={this.handleChange} value={this.state.blogText}></textarea>
                    </div>
                    <div className="edit-option-wrap">
                        <UpLoadImgCom imgHasUploaded={this.state.imgHasUploaded}></UpLoadImgCom>
                        <div className="send-blog-button" onClick={this.handleClick}>发布</div>
                    </div>
                </div>
            )
        }else{
            return(<div></div>)
        }

    }
});

var UpLoadImgCom = React.createClass({
    getInitialState : function(){
        return{
            showUploadFunction : 'none'
        }
    },
    componentDidMount : function(){
        $('#myIframe').bind('load' , function(){
            console.log(this.state);
            var data = $(window.frames['iframe'].document.body).text();
            this.context.blogImgArray.push(data);
            this.setState({showUploadFunction : 'block'});
            console.log(this.state);
        }.bind(this));
    },
    componentWillReceiveProps : function(nextP){
        if(nextP.imgHasUploaded == 'true'){
            this.setState({showUploadFunction : 'none'})
        }
    },
    handleClick : function(){
        this.refs.chooseImg.click();
    },
    handleChange : function(e){
        console.log(e.target.value);
        if(e.target.value){
            this.refs.submitImg.click();
        }
    },
    render : function(){
        return(
            <div className="upload-img-button-wrap" onClick={this.handleClick}>
                <iframe id="myIframe" name="iframe" width="0" height="0" frameborder="0"></iframe>
                <form action="/express/?do=express.user.uploadImg" target="iframe" encType="multipart/form-data" method="post">
                    <input type="file" name="upload"  multiple="multiple" accept="image/jpeg,image/jpg,image/png" ref="chooseImg" onChange={this.handleChange}/>
                    <input type="submit" value="upload" ref="submitImg" />
                </form>
                <div className="upload-img-icon"></div>
                <span className="pic-btn">图片</span>
                <UploadFunctionCom showUploadFunction={this.state.showUploadFunction}></UploadFunctionCom>
            </div>
        )
    }
})

var UploadFunctionCom = React.createClass({
    getInitialState : function(){
        return {
            isShow : 'none'
        }
    },
    componentWillReceiveProps : function(nextP){
        console.log(nextP);
        this.setState({isShow : nextP.showUploadFunction});
        console.log(this.state);
    },
    preventClick : function(e){
        if(e.target.className != 'add-one-upload-img'){
            e.stopPropagation();
        }
    },

    closeUploadFunction(event){
        this.setState({isShow : 'none'});
        this.context.blogImgArray = [];
        event.stopPropagation();
    },
    render : function(){
        var uploadImgList = this.context.blogImgArray.map(function(url){
            console.log(url);
            return (
                <div className="one-upload-img" style={{backgroundImage : 'url(../' + url.replace(/\s/g , '%20') + ')'}}></div>
            )
        });
        return(
          <div className="upload-img-function-wrap" style = {{display : this.state.isShow}} onClick={this.preventClick}>
              <div className="upload-img-function-inner">
                  <div className="close-upload-img-function" onClick={this.closeUploadFunction}></div>
                  <p className="upload-img-title">图片添加</p>
                  <p className="upload-img-describe">已添加<span className="already-upload">{this.context.blogImgArray.length}</span>张，还能上传<span className="sum-upload">{6- this.context.blogImgArray.length}</span>张</p>
                  <div className="upload-img-list">
                      {uploadImgList}
                      <div className="add-one-upload-img"></div>
                  </div>

              </div>
          </div>


        )
    }
})
var BlogListModel = React.createClass({
    getInitialState : function(){
        return{
            blogArray : [],
            isLogin : false,
            contentType : 'index'
        }
    },
    componentWillMount : function(){
        document.addEventListener('scroll' , this.handleScroll.bind(this));
    },
    componentDidMount : function(){
        console.log('in did mount');
        document.removeEventListener('scroll' , this.handleScroll.bind(this));
    },
    handleScroll : function(e){
        if($(window).scrollTop() >= $(document).height() - $(window).height()){
            var type = 'likes';
            if(this.context.isLogin){
                type = 'personal';
            }
            this.props.onBottom(type);
        }
    },
    shouldComponentUpdate : function(nextP , nextS){
        console.log('in should update');
        //this.setState({blogArray : [1,2]});
        if(this.state.isLogin != this.context.isLogin ){
            this.state.blogArray = [];
        }
        if(this.state.contentType != this.props.contentType){
            this.state.blogArray = this.props.blogDatas;
            this.state.contentType = this.props.contentType;
            return true;
        }
        console.log(this.state.blogArray);
        console.log(nextP);
        this.state.isLogin = this.context.isLogin;
        this.state.blogArray = this.state.blogArray.concat(nextP.blogDatas);

        return true;
    },

    render : function(){
        console.log(this.state.blogArray);
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
        console.log(this.props.imgArray);
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