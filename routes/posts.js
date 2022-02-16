const router = require('express').Router();
const verify = require('./verifyToken');
   router.get('/', verify, (req,res) => {
    res.json({
        posts: {
            title: ' Patna', 
            description: 'Indian Institute of Technology Patna (abbreviated IIT Patna or IITP) is a public technical university located in Patna, India. It is recognized as an Institute of National Importance by the Government of India. It is one of the new IITs established by an Act of the Indian Parliament on August 6, 2008. The permanent campus of IIT Patna is located at Bihta which is approximately 30 km from Patna and has been fully operational since 2015.'
        }

   });
    
   //res.send(req.user);
   //User.findbyOne({_id: req.user})
})
router.delete('/:email', verify, async (req, res) => {
  const email_id = req.params.email;

  const user = await users.findOne({ email: email_id });
  if (!user) return res.status(400).json({ message: "Email not found." });

  users.deleteOne({ email: email_id })
    .then((result) => {
      res.status(200).json({ message: "successfully deleted", result: result });
    })
    .catch((err) => {
      res.status(500).json({
        message: "something went wrong",
        error: err,
      });
    });
});

module.exports = router;
