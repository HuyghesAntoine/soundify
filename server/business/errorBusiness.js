exports.errorReturn = function (code, error, message){
    var returnedError = {
        error:{
            code: code,
            error: error,
            message: message
        }
    };
    return returnedError;
};