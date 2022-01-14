const router = require('express').Router();
const verify = require('./verifyToken');
   router.get('/', verify, (req,res) => {
    res.json({
        posts: {
            title: 'Priya kumari', 
            description: 'I am the cutest girl in india.'
        }

   });
    
   //res.send(req.user);
   //User.findbyOne({_id: req.user})
})


module.exports = router;