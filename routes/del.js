const router = require("express").Router();
const users = require("../model/User.js");
const verify = require('./verifyToken');
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
