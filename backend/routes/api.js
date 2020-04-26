const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middlewares/auth');

router.get('/', (req, res) => {
    res.send("From API")
});

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((err, data) => {
        if(err)
            res.status(500).send("Could not save user");
        else{                    
            const token = data.generateAuthToken();
            res.header("x-auth-token", token).send({
                _id: data._id,
                name: data.fname,
              });
        }
    });
});

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({email:userData.email}, (err, user) => {
        if(err)
            console.error(err)
        else {
            if(!user){
                res.status(401).send("Invalid Email");
            }else{
                if(user.password != userData.password){
                    res.status(401).send("Invalid Password");
                }else{
                    const token = user.generateAuthToken();
                    res.header("x-auth-token", token).send({
                        _id: user._id,
                        name: user.fName,
                    });
                }
            }
        }
    })
});

router.get("/secure", auth, (req, res) => {
    res.send("Secured Route");
})

router.get("/notsecure", (req, res) => {
    res.send("No need of token");
})

module.exports = router;