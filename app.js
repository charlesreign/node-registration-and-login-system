const mongoose = require('mongoose');
const User = require('./models/User');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//bcrypt for hashing passwords
const bcrypt = require('bcrypt');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.Promise = global.Promise;

//CONNECTING TO THE DATABASE
mongoose.connect('mongodb://localhost/login',{ useNewUrlParser: true },()=>{
    console.log('CONNECTED')
});


//CREATING A ROUTE THAT GETS(POSTS) THE USER REGISTRATION INFO AND SAVE INTO DATABASE
app.post('/register',(req,res)=>{
    const newUser = new User();
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    //HASHING THE PASSWORD BEFORE SAVING INTO THE DATABASE
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if (err) return err;

            //hashed password
            newUser.password = hash;

            //saving into the database
            newUser.save().then(userSave=>{
                res.send(`User save successfully`);
            }).catch(err=>{
                res.send(`User was not saved ${err}`);
            });
        })
    });
});

//LOGIN INTO THE SYSTEM
app.post('/login',(req,res)=>{
    User.findOne({email: req.body.email}).then(user=>{
        if (user) {
            bcrypt.compare(req.body.password,user.password,(err, match)=>{
                if (err) return err;
                if (match){
                    res.send('USER LOGIN SUCCESSFUL')
                }else {
                    res.send('NOT ABLE TO LOGIN');
                }
            });
        }
    })

});





app.listen(4444, ()=>{
    console.log('LISTENING')
});