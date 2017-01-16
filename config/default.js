var configValue = {
    port : 8000,
    session : {
        secret : 'myblog',
        key : 'myblog',
        maxAge : '88888'
    },
    mongodb : {
        host : 'localhost',
        port : 27017,
        db : 'myblog',
        url : 'mongodb://localhost:27017/myblog'
    }
};
module.exports = configValue;