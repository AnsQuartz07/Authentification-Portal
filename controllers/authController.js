const service = require('../services/authService')
const { registerValidation, loginValidation } = require('../validation/validation');
const emailExist = require('../validation/emailExist')

module.exports.register = async (req, res) => {

    // schema validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ Message: error.details[0].message });

    // checking whether email is already exist or not
    const is_exist = await emailExist(req.body.email)
    if (is_exist != null) return res.status(400).json({ message: 'Email already exists.' });

    // main stuff
    service.register(req.body)
    .then((result) => {
        res.status(200).json({ message : 'Signed up successfully', user_id : result });
    })
    .catch((err) => {
        res.status(400).json({ message: err });
    })
}

module.exports.login = async (req, res) => {

    // schema validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(403).json({ message: error.details[0].message })

    // Checking whether the user is already existing in the Database
    const is_exist = await emailExist(req.body.email)
    if (is_exist == null) return res.status(400).json({ message: 'Email does not exist.' });

    // main stuff
    service.login(req.body, is_exist)
    .then((result) => {
        res.setHeader('auth-token', result).status(200).json({
            message: 'logged in successfully', 
            Token: { 
                key: 'auth-token', 
                value: result 
            } 
        })
    })
    .catch((error) => {
        res.status(400).json({message : error})
    })
}

module.exports.delete = async (req, res) => {

    // Checking whether the user is already existing in the Database
    const is_exis = await emailExist(req.params.email)
    if (is_exis == null) return res.status(400).json({ message: 'Email does not exist.' });

    // main stuff
    service.delete(req.params.email)
    .then((result) => {
        res.status(200).json({ message: "successfully deleted", result: result });
    })
    .catch((err) => {
        res.status(500).json({
            message: "something went wrong",
            error: err,
        });
    });
}
module.exports.accDelete = (req,res) => {
    const token = req.header('auth-token')
    service.accDelete(token)
    .then( (result) => {
        res.status(200).json({ message : 'Your account has been deleted successfully', result : result})
    })
    .catch( (error) => {
        res.status(500).json({
            message: "something went wrong",
            error: error,
        });
    })
}

module.exports.posts =  (req, res) => {
    service.posts()
    .then((result) => {
        res.status(200).json({ posts: result })
    })
    .catch((err) => {
        res.status(400).json({ error: err })
    })
}

module.exports.update = (req,res) => {
    const token = req.header('auth-token')
    service.update(req.body,token)
    .then( (result) => {
        res.status(200).json({ message : 'Your account has been updated successfully', result : result})
    })
    .catch( (error) => {
        res.status(500).json({
            message: "something went wrong",
            error: error,
        });
    })
}