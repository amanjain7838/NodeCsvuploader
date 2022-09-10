module.exports.isValid = (str)=>{
    const error_data = ['null', null, undefined, 'undefined', '', NaN];
    if(!error_data.includes(str))
        return true;
    else
        return false;
}
module.exports.apiResponse={
    'status':0,
    'data':[],
};