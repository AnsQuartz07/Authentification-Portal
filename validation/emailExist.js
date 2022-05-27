const User = require('../model/User.js'); 

module.exports =  async (payload) => {
    
    const emailExist = await  User.findOne({email: payload})
    console.log(emailExist)
    return emailExist
}

