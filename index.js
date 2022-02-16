const express = require('express');
const app = express();
const dotenv = require('dotenv');      // Imprt dotenv (an environment variable where I can store my password if I will upload the code on github or something)
const mongoose = require('mongoose');  // Import the mongooge package

//Import Routes
const delRoutes = require('./routes/del');
const authRoutes = require('./routes/auth.js');
const postRoutes = require('./routes/posts');

dotenv.config();

//connect to database
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => 
console.log('connected to db!')
);

//middleware
app.use(express.json());

//Routes Middlewares
app.use('/api/del',delRoutes);
app.use('/api/user',authRoutes);           // creating link see auth.js line no - 14
app.use('/api/posts',postRoutes);          // creating link see auth.js line no - 47

// app.listen(3000, () => console.log('Server Up and running'));   //to print somethings console.log 
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});
