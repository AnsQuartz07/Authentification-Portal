
//============================== Authentification Routes =============================================

const router = require('express').Router();
const { reset } = require('nodemon');
const User = require('../model/User.js');         // Importing the user.js file so that we have accss of user.js file 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const  { registerValidation, loginValidation } = require('../validation');

//VALIDATION


router.post('/register', async (req, res) => {      //creating link  http://localhosts3000:api/user/register
   
    //Lets validate the data before a user
    const { error } = registerValidation(req.body);  
    if(error) return res.status(400).send(error.details[0].message);  // it send only an object called  {error} and 
                                                                      // 1st thing in the object is details 
                                                                      // details is an array
                                                                      // detals[0] rpresents the element in the zeroth 
                                                                      // index of details that is message 
    
    // Checking whether the user is already existing in the Database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists.');

    // Hash the password
    //   :- install a bcrypt which convert the password into its own code and send it to the data base so only bcrypt can know the password.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log('error found');
    
    // Creating a new user
    const user = new User({
       name: req.body.name,
       email: req.body.email,
       password: hashedPassword
   });
   try{                                         // saving the user's informations
       const savedUser = await user.save();  
       res.status(200).send({user: user._id});
       
   } catch (err) {                              // Indication of any error
       res.status(400).send({message: err});
    }

});

// Login
router.post('/login', async (req, res) => {       //creating link  http://localhosts3000:api/user/login
   
    //Lets validate the data before a user
    const { error } = loginValidation(req.body);  
    if(error) return res.status(400).send(error.details[0].message);
    
    // Checking whether the user is already existing in the Database
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email not found.');

    // Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid Password');

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    
});

module.exports = router;