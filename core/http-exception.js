class HttpException extends Error {
    constructor(code=400, errorCode=10000, msg='服务器异常'){
        super()
        this.code = code;
        this.errorCode = errorCode;
        this.msg = msg;
    }
}

class Exisiting extends HttpException{
    constructor(msg, errorCode){
        super()
        this.code = 412;
        this.msg = msg || '已存在';
        this.errorCode = errorCode || 10006;
    }
}

module.exports={
    HttpException,
    Exisiting
}