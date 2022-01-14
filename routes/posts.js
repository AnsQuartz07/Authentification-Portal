const router = require('express').Router();
const verify = require('./verifyToken');
   router.get('/', verify, (req,res) => {
    res.json({
        posts: {
            title: 'IIT Patna', 
            description: 'Indian Institute of Technology Patna (abbreviated IIT Patna or IITP) is a public technical university located in Patna, India. It is recognized as an Institute of National Importance by the Government of India. It is one of the new IITs established by an Act of the Indian Parliament on August 6, 2008. The permanent campus of IIT Patna is located at Bihta which is approximately 30 km from Patna and has been fully operational since 2015.'
        }

   });
    
   //res.send(req.user);
   //User.findbyOne({_id: req.user})
})


module.exports = router;
