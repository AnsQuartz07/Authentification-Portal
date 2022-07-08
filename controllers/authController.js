const service = require('../services/authService')
const { registerValidation, loginValidation } = require('../validation/validation');
const emailExist = require('../validation/emailExist')

module.exports.register = async (req, res) => {
    try {
        // schema validation
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).json({ Message: error.details[0].message });

        // checking whether email is already exist or not
        const is_exist = await emailExist(req.body.email)
        if (is_exist != null) return res.status(400).json({ message: 'Email already exists.' });

        // Confirm Password
        if(req.body.password != req.body.confirm_pass) return res.status(400).json({ 
            message: 'Please confirm your password correctly' 
        });

        // main stuff
        const result = await service.register(req.body)
        res.status(200).json({ message : 'Signed up successfully', user_id : result });

    } catch (err) {
        res.status(400).json({ message: 'Something went wrong.', Error : err });
    }
}

module.exports.login = async (req, res) => {
    try {
        // schema validation
        const { error } = loginValidation(req.body);
        if (error) return res.status(403).json({ message: error.details[0].message })

        // Checking whether the user is already existing in the Database
        const is_exist = await emailExist(req.body.email)
        if (is_exist == null) return res.status(400).json({ message: 'Email does not exist.' });

        // main stuff
        const result = await service.login(req.body, is_exist)
        res.setHeader('auth-token', result).status(200).json(result)
    } catch (error) {
        res.status(400).json({
            message: "something went wrong",
            error: error,
        })
    }
}

module.exports.delete = async (req, res) => {
    try {
        // Checking whether the user is already existing in the Database
        const is_exis = await emailExist(req.params.email)
        if (is_exis == null) return res.status(400).json({ message: 'Email does not exist.' });

        // main stuff
        let result = await service.delete(req.params.email)
        res.status(200).json({ message: "successfully deleted", result: result });

    } catch (err)  {
        res.status(500).json({
            message: "something went wrong",
            error: err,
        });
    }
}
module.exports.accDelete = async (req,res) => {
    try {
        const token = req.header('auth-token')
        let result = await service.accDelete(token)
        res.status(200).json({ message : 'Your account has been deleted successfully', result : result})
    } catch (error) {
        res.status(500).json({
            message: "something went wrong",
            error: error,
        });
    }
}

module.exports.posts = async (req, res) => {
    try {
        let result = await service.posts()
        res.status(200).json({ message : 'post fetched successfully', posts: result })
    } catch (err) {
        res.status(400).json({ message: "something went wrong", error: err })
    }
}

module.exports.update = async (req,res) => {
    try {
        const token = req.header('auth-token')
        let result = await service.update(req.body,token)
        res.status(200).json({ message : 'Your account has been updated successfully', result : result})
    } catch (error) {
        res.status(500).json({
            message: "something went wrong",
            error: error,
        });
    }
}