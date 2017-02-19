var UserInfoCom = React.createClass({
    getInitialState : function(){
        return{
            isEdit : false,
            userDetail : {}
        }
    },
    updateDetail : function(userDetail){
        this.state.userDetail = userDetail;
    },
    handleEdit : function(){
        this.setState({isEdit : true });
    },
    handleSave : function(){
        this.setState({isEdit : false});
        dataComm.updateUserDetail(this.context.username , this.state.userDetail , ()=>{this.context.userDetail = this.state.userDetail});
    },
    render : function(){
        if(this.state.isEdit){
            return (
                <div className="user-info-wrap">
                    <div className="user-info-inner">
                        <div className="user-info-header">
                            <fieldset>
                                <legend>基本信息</legend>
                                <div className="change-btn-wrap">
                                    <div className="change-btn-inner" onClick={this.handleSave}>保存</div>
                                </div>
                            </fieldset>
                        </div>
                        <div className="user-info-content-wrap">
                           <UserInfoForm listenUserDetail={this.updateDetail}></UserInfoForm>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="user-info-wrap">
                    <div className="user-info-inner">
                        <div className="user-info-header">
                            <fieldset>
                                <legend>基本信息</legend>
                                <div className="change-btn-wrap">
                                    <div className="change-btn-inner" onClick={this.handleEdit}>编辑</div>
                                </div>
                            </fieldset>
                        </div>
                        <div className="user-info-content-wrap">
                            <UserInfoShow></UserInfoShow>
                        </div>
                    </div>
                </div>
            )
        }
    }
});

var UserInfoShow = React.createClass({
    render : function(){
        var data = this.context.userDetail;
        console.log(data);
        return(
            <div>
                <div className="user-info-one-layer">
                    <div className="user-option">用户名</div>
                    <div className="user-info-detail">
                        {data.username}
                    </div>
                </div>
                <div className="user-info-one-layer">
                    <div className="user-option">真实姓名</div>
                    <div className="user-info-detail">
                        {data.realName}
                    </div>
                </div>
                <div className="user-info-one-layer">
                    <div className="user-option">性别</div>
                    <div className="user-info-detail">
                        {()=>{if(data.sex == 1)return '男' ; if(data.sex == 2)return '女'}}
                    </div>
                </div>
                <div className="user-info-one-layer">
                    <div className="user-option">生日</div>
                    <div className="user-info-detail">
                        <span>2012-2-2</span>
                    </div>
                </div>
                <div className="user-info-one-layer">
                    <div className="user-option">简介</div>
                    <div className="user-info-detail">
                        {data.intro}
                    </div>
                </div>
                <div className="user-info-one-layer">
                    <div className="user-option">血型</div>
                    <div className="user-info-detail">
                        {data.blood + '型'}
                    </div>
                </div>
                <div className="user-info-one-layer">
                    <div className="user-option">邮箱</div>
                    <div className="user-info-detail">
                        <div className="user-info-detail">
                            {data.email}
                        </div>
                    </div>
                </div>
                <div className="user-info-one-layer">
                    <div className="user-option">QQ</div>
                    <div className="user-info-detail">
                        <div className="user-info-detail">
                            {data.qq}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

var UserInfoForm = React.createClass({
    getInitialState : function(){
        return{
            userDetail : this.context.userDetail
        }

    },
    updateData : function(type , e){
        this.state.userDetail[type] = e.target.value;
        this.props.listenUserDetail(this.state.userDetail);
    },
    updateYear : function(type){

    },
    render : function(){
        var data = this.context.userDetail;
        return (
            <div>
                <div className="user-info-one-layer">
                    <div className="user-option">用户名</div>
                    <div className="user-info-detail">
                        <input type="text" defaultdefaultValue={data.username} onChange={(e)=>{this.updateData('username' , e)}}/>
                    </div>
                </div>
                <div className="user-info-one-layer">
                    <div className="user-option">真实姓名</div>
                    <div className="user-info-detail">
                        <input type="text" defaultValue={data.realName} onChange={(e)=>{this.updateData('realName' , e)}}/>
                    </div>
                </div>
                <div className="user-info-one-layer">
                    <div className="user-option">性别</div>
                    <div className="user-info-detail">
                                <span className="radio-wrap">
                                    <input type="radio" name="sex" value='1' defaultChecked={()=>{data.sex == 1 ? 'true' : 'false'}} onChange={(e)=>{this.updateData('sex' , e)}} />
                                    男
                                </span>
                                <span className="radio-wrap">
                                    <input type="radio" name="sex" value='2'  onChange={(e)=>{this.updateData('sex' , e)}} />
                                    女
                                </span>
                    </div>
                </div>
                <div className="user-info-one-layer">
                    <div className="user-option">生日</div>
                    <div className="user-info-detail">
                                <span>
                                <select name="year" id="year" onChange={(e)=>{this.updateData('year' , e)}}>
                                    <option value="1943">1943</option>
                                    <option value="1944">1944</option>
                                    <option value="1945">1945</option>
                                    <option value="1946">1946</option>
                                    <option value="1947">1947</option>
                                    <option value="1948">1948</option>
                                    <option value="1949">1949</option>
                                    <option value="1950">1950</option>
                                    <option value="1951">1951</option>
                                    <option value="1952">1952</option>
                                    <option value="1953">1953</option>
                                    <option value="1954">1954</option>
                                    <option value="1955">1955</option>
                                    <option value="1956">1956</option>
                                    <option value="1957">1957</option>
                                    <option value="1958">1958</option>
                                    <option value="1959">1959</option>
                                    <option value="1960">1960</option>
                                    <option value="1961">1961</option>
                                    <option value="1962">1962</option>
                                    <option value="1963">1963</option>
                                    <option value="1964">1964</option>
                                    <option value="1965">1965</option>
                                    <option value="1966">1966</option>
                                    <option value="1967">1967</option>
                                    <option value="1968">1968</option>
                                    <option value="1969">1969</option>
                                    <option value="1970">1970</option>
                                    <option value="1971">1971</option>
                                    <option value="1972">1972</option>
                                    <option value="1973">1973</option>
                                    <option value="1974">1974</option>
                                    <option value="1975">1975</option>
                                    <option value="1976">1976</option>
                                    <option value="1977">1977</option>
                                    <option value="1978">1978</option>
                                    <option value="1979">1979</option>
                                    <option value="1980">1980</option>
                                    <option value="1981">1981</option>
                                    <option value="1982">1982</option>
                                    <option value="1983">1983</option>
                                    <option value="1984">1984</option>
                                    <option value="1985">1985</option>
                                    <option value="1986">1986</option>
                                    <option value="1987">1987</option>
                                    <option value="1988">1988</option>
                                    <option value="1989">1989</option>
                                    <option value="1990">1990</option>
                                    <option value="1991">1991</option>
                                    <option value="1992">1992</option>
                                    <option value="1993">1993</option>
                                    <option value="1994">1994</option>
                                    <option value="1995">1995</option>
                                    <option value="1996">1996</option>
                                    <option value="1997">1997</option>
                                    <option value="1998">1998</option>
                                    <option value="1999">1999</option>
                                    <option value="2001">2001</option>
                                    <option value="2002">2002</option>
                                    <option value="2003">2003</option>
                                    <option value="2004">2004</option>
                                    <option value="2005">2005</option>
                                    <option value="2006">2006</option>
                                    <option value="2007">2007</option>
                                    <option value="2008">2008</option>
                                    <option value="2009">2009</option>
                                    <option value="2010">2010</option>
                                    <option value="2011">2011</option>
                                    <option value="2012">2012</option>
                                    <option value="2013">2013</option>
                                    <option value="2014">2014</option>
                                    <option value="2015">2015</option>
                                    <option value="2016">2016</option>
                                    <option value="2017">2017</option>
                                </select>
                                    年
                                </span>
                                <span>
                                    <select name="month" id="month">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                    月
                                </span>
                                <span>
                                    <select name="day" id="day">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                        <option value="25">25</option>
                                        <option value="26">26</option>
                                        <option value="27">27</option>
                                        <option value="28">28</option>
                                        <option value="29">29</option>
                                        <option value="30">30</option>
                                        <option value="31">31</option>
                                    </select>
                                    日
                                </span>
                    </div>
                </div>
                <div className="user-info-one-layer">
                    <div className="user-option">简介</div>
                    <div className="user-info-detail">
                                <span className="radio-wrap">
                                    <input type="text" defaultValue={data.intro} onChange={(e)=>{this.updateData('intro' , e)}} />
                                </span>
                    </div>
                </div>
                <div className="user-info-one-layer">
                    <div className="user-option">血型</div>
                    <div className="user-info-detail">
                        <select name="blood" id="blood" onChange={(e)=>{this.updateData('blood' , e)}}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="AB">AB</option>
                            <option value="O">O</option>
                        </select>
                    </div>
                </div>
                <div className="user-info-one-layer">
                    <div className="user-option">邮箱</div>
                    <div className="user-info-detail">
                        <div className="user-info-detail">
                            <input type="text" defaultValue={data.email} onChange={(e)=>{this.updateData('email' , e)}}/>
                        </div>
                    </div>
                </div>
                <div className="user-info-one-layer">
                    <div className="user-option">QQ</div>
                    <div className="user-info-detail">
                        <div className="user-info-detail">
                            <input type="text" defaultValue={data.qq} onChange={(e)=>{this.updateData('qq' , e)}}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})