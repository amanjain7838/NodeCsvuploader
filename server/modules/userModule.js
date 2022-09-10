const {isValid} = require('../utils/common');
const {
    csv:CsvModel,
    phone:PhoneModel
} = require('../dependencyInjection/sequelize');

module.exports.getUsers=()=>{
    let fetchCondition={
        offset: 0,
        limit: 10,
        include: [{
            model: PhoneModel,
            attributes: { exclude: ['id'] },
        }],
        order:[['id','desc']]
    };
    return CsvModel.findAll(fetchCondition);
}
module.exports.saveUser=async(user)=>{
    let csvref=await CsvModel.create({
        name: user.name,
        email: user.email,
    });
    let csvdata=csvref.toJSON();
    let phones=user.phones.split(/[-|\|]+/);
    let promiseBank=[];
    if(phones && phones.length>0){
        phones.forEach(phone => {
            promiseBank.push(PhoneModel.create({phone:phone,csvId:csvdata.id}))
        });
    }
    await Promise.all(promiseBank);
    return "success";    
}