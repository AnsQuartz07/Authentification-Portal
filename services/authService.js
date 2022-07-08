const User = require('../model/User.js');         // Importing the user.js file so that we have accss of user.js file 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.register = async (payload) => {

    // securing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload.password, salt)

    // Creating a new user
    const user = new User({
        name: payload.name,
        email: payload.email.toLowerCase(),
        password: hashedPassword
    });
    await user.save();        // saving the user's informations
    return user._id
}

module.exports.login = async (payload1, payload2) => {
    // Password validation
    const validPass = await bcrypt.compare(payload1.password, payload2.password)
    if (validPass) {
        const token = jwt.sign({ _id: payload2._id }, process.env.TOKEN_SECRET , { expiresIn : "120s" })
        let result = {
            message: 'logged in successfully', 
            Token: { 
                key: 'auth-token', 
                value: token 
            } 
        }
        return (result)
    }
    else {
        return {message : 'Invalid Password'}
    }
}

module.exports.delete = async (payload) => {
    const result = await User.deleteOne({ email: payload })
    return result
}

module.exports.accDelete = async (payload) => {
    const decodedToken = jwt.decode(payload)
    const result = User.deleteOne({ _id : decodedToken._id })
    return result
}

module.exports.posts = async () => {
    let result = {
        title: ' Patna',
        description: 'Indian Institute of Technology Patna (abbreviated IIT Patna or IITP) is a public technical university located in Patna, India. It is recognized as an Institute of National Importance by the Government of India. It is one of the new IITs established by an Act of the Indian Parliament on August 6, 2008. The permanent campus of IIT Patna is located at Bihta which is approximately 30 km from Patna and has been fully operational since 2015.'
    }
    return result;
}

module.exports.update = async (payload1,tokenPayload) => {
    const decodedToken = jwt.decode(tokenPayload)
    if(payload1.email) payload1.email = payload1.email.toLowerCase()
    if(payload1.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(payload1.password, salt);
        payload1.password = hashedPassword
        console.log(decodedToken)
    }
    const result = await User.updateOne({_id : decodedToken._id} , {$set : payload1})
    return result
}