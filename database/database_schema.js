var mongoose = require('mongoose'),
    host = '127.0.0.1',
    port = '27017';
mongoose.connect('mongodb://localhost/myblog');

var schema = {
    userSchema : mongoose.Schema({
        username : String,
        password : Number,
        blogNumber : {type : Number , default : 0},
        likes : [{blogId : String}],
        attention : [{username : String}],
        isAttention : [{username : String}]
    }),
    blogSchema : mongoose.Schema({
        author : String,
        authorId : String,
        date : String,
        contentText : String,
        likes : {type : Number , default : 0},
        comments : [{author : String , date : Date , contentText : String}]
    })
}

module.exports = schema;
