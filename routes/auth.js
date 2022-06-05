const router = require('express').Router();
const verify = require('../validation/verifyToken');
const controller = require('../controllers/authController')
const jwt = require('jsonwebtoken')

router.post('/register', controller.register );

router.post('/login', controller.login);

router.delete('/del/:email', controller.delete)

router.delete('/delete', verify, controller.accDelete);

router.get('/posts', verify, controller.posts)

router.patch('/update', verify, controller.update)

module.exports = router;