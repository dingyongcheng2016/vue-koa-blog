class HttpException extends Error {
    constructor(code=400, errorCode=10000, msg='服务器异常'){
        super()
        this.code = code;
        this.errorCode = errorCode;
        this.msg = msg;
    }
}

module.exports={
    HttpException
}