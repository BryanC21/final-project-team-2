//index for backend

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const User = require('./models/user')
const app = express();
app.use(bodyParser.json()); //parses into json
app.use(bodyParser.urlencoded({extended:false }))
app.use(cors());

//connects mongose to account set up on mongodb 
mongoose.connect('mongodb+srv://andres12:Clubhi!12@cluster0.dotkx.mongodb.net/FinalProj?retryWrites=true&w=majority', {useNewUrlParser: true});

//sends info from signup page to /user
app.post('/user', (req, res) => {
    //makes instance into a user model 
    const instance = new User()
    console.log(req.body)
    instance.email = req.body.email
    instance.password = req.body.password
    instance.isAdmin = false
    instance.save()
    res.send(201)
})




app.listen(3001, () => {console.log('Server running on 3001')})