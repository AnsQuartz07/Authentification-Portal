const router = require('express').Router();
const verify = require('../validation/verifyToken');
const controller = require('../controllers/authController')

router.post('/register', controller.register );

router.post('/login', controller.login);

router.delete('/:email', verify, controller.delete);

router.get('/posts', verify, controller.posts)

module.exports = router;