class HttpException extends Error {
    constructor(code=400, errorCode=10000, msg='服务器异常'){
        super()
        this.code = code;
        this.errorCode = errorCode;
        this.msg = msg;
    }
}

class ParameterException extends HttpException{
    constructor(msg, errorCode){
        super()
        this.code = 400;
        this.msg = msg || '参数错误';
        this.errorCode = errorCode || 10000;
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
    ParameterException,
    Exisiting
}