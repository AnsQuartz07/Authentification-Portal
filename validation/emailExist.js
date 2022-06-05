const User = require('../model/User.js'); 

module.exports =  async (payload) => {
    
    const emailExist = await  User.findOne({email: payload.toLowerCase()})
    //console.log(emailExist)
    return emailExist
}

