var MainContentCom = React.createClass({
    getInitialState : function(){
        return{
            isLogin : true,
            userData : {},
            currentUserData : {},
            blogLists : [],
            showImgPage : false,
            showManagePage : false,
            contentName : 'blog'
        }
    },

    initContext : function(){
        this.context.isLogin = true,
        this.context.blogRank = 0,
        this.context.blogType = 'likes',
        this.context.username = $.cookie('username'),
        this.context.currentUser = $.cookie('currentUser');
        this.context.blogImgArray = [];
        this.context.store = [];
        this.context.likes = [];
        this.context.transferTime =function(str){
            var date = new Date(parseInt(str) * 1000);
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day= date.getDate();
            var hour= date.getHours();
            var minute= date.getMinutes();
            var second= date.getSeconds();
            return year+'-'+month+'-'+day+' '+hour+':'+minute;
        };
    },
    componentWillMount : function(){
        this.initContext();
        let loginAsync = new Promise((resolve , err)=>{
            dataComm.login(this.context.username , '' , function(data){
                resolve(data);
            });
        });
        //dataComm.getUserData(this.context.currentUser , function(data){ this.getUserDataCb(data)}.bind(this));
        let getUserDataAsync = () => {
            return new Promise ( (resolve , err) =>{
                dataComm.getUserData(this.context.currentUser , function(data){
                    resolve(data);
                });
            });
        };
        loginAsync
            .then((data) =>{this.loginCb(data);})
            .then(()=>getUserDataAsync())
            .then(this.getUserDataCb)
            .then(() => { this.getBlogList('personal') });
    },
    loginCb : function(data){
        console.log(data.data.userDetail);
        this.setState({isLogin : true , userData : data.data , showLoginLayer : 'none' , blogLists : []});
        this.context.username = data.data.username;
        this.context.blogType = data.data.username;
        this.context.attention = data.data.attention;
        this.context.store = data.data.store;
        this.context.likes = data.data.likes;
        this.context.userDetail = data.data.userDetail;
    },
    loginOut : function(){
        dataComm.loginOut(this.context.username , this.loginOutCb.bind(this));
    },
    loginOutCb : function(){
        window.location.pathname = 'main/index';
    },
    getUserDataCb : function(data){
        console.log(data);
        this.setState({ currentUserData : data.data});
        console.log(this.state);
    },
    getBlogList : function(type , number){
        console.log('------------get blog list');
        var number = number ? number : 4;
        var rank , authorArray = [];
        rank = this.context.blogRank++;
        authorArray.push(this.context.currentUser);
        console.log(authorArray);
        dataComm.getBlogList(type , authorArray, number , rank , this.getBlogCb.bind(this));
    },
    getBlogCb : function(data){
        console.log('in GetBlogCb');
        console.log(data);
        this.setState({blogLists : data.data});
    },
    changeContent : function(type){
        this.setState({contentName : type});
        this.initContext();
        if(type == 'blog'){
            console.log('change' + type);
            this.getBlogList('personal');
        }else if(type == 'pic'){
            console.log('chang' + type);
            this.getBlogList('personal' , 20);
        }
    },
    render : function(){
        if(this.state.showImgPage){
            var content = function(){};
        }
        var div = (function(){

        })

        return (
            <div id="top-background" className="top-login-background">
                <HeaderModel isLogin={this.state.isLogin} onLogin={this.doLogin} onLoginOut={this.loginOut} onShowLoginLayer={this.toggleLoginLayer}/>
                <UserPagePortraitCom currentUserData = {this.state.currentUserData}></UserPagePortraitCom>
                <section id="content-wrap">
                    <UserPageNavCom onChangeContent={this.changeContent} ></UserPageNavCom>
                    <UserContentLeftCom currentUserData = {this.state.currentUserData}></UserContentLeftCom>
                    <UserContentRightCom contentName={this.state.contentName} blogDatas={this.state.blogLists} onBottom={this.getBlogList}/>
            </section>
            </div>
        )
    }
});


ReactDOM.render(
    <div>
        <MainContentCom></MainContentCom>
    </div>,
    document.getElementById('all-wrap')
);
