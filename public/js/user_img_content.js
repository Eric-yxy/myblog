var UserImgContentCom = React.createClass({
    render : function(){
        var datas = this.props.blogData,
            imgArray = [];
        datas.map((data) =>{
            imgArray = imgArray.concat(data.img);
        });
        var imgDiv = imgArray.map((url)=>{
            return(
                <div className="big-img-wrap" style={{backgroundImage : 'url(../' + url.replace(/\s/g , '%20') + ')'}}></div>
            )
        })
        return(
            <div className="img-list-content-wrap">
                <div className="img-list-content-inner">
                    <div className="img-list-header">
                        <h2>照片墙</h2>
                    </div>
                    <div className="img-list-detail">
                        <div className="big-img-list">
                            {imgDiv}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})