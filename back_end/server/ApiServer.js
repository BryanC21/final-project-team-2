//index for backend
// const redis = require('redis')
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
// const client = redis.createClient({path: 'redis-13037.c60.us-west-1-2.ec2.cloud.redislabs.com:13037'})

// client.on('connect', () => {console.log('Connected to Redis')})

const User = require('../models/user')
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
app.post('/user/login', async (req, res) => {
    const user = await User.find({email: req.body.email, password: req.body.password});
    if (user.length > 0){
        res.json(user[0])
    }else{
        res.send(400);
    }
})

let listings = [];
let inquiriesList = [];

let num = 0;

app.post(`/api/createListing`, (req, res) => {

    req.body.id = 'emerson' + num++;
    listings.push(req.body);

    res.send({
        success: true,
        items: listings,
        inquiries: inquiriesList,
        errorCode: 200
    });
});

/*app.get(`/api/viewListings`, (req, res) => {
  res.send({
    success: true,
    items: listings,
    inquiries: [],
    errorCode: 200
  });
}); */

app.get(`/api/viewListings`, (req, res) => {
    let listingsType = req.query.type;
    let retList = [];
    for (let i = 0; i < listings.length; i++) {
        if (listings[i].type == listingsType) {
            retList.push(listings[i]);
        }
    }

    res.send({
        success: true,
        items: listingsType ? retList : listings,
        inquiries: inquiriesList,
        errorCode: 200
    });
});

app.get(`/api/deleteListing`, (req, res) => {
    let listingsId = req.query.id;
    let newList = [];
    for (let i = 0; i < listings.length; i++) {
        if (listings[i].id != listingsId) {
            newList.push(listings[i]);
        }
    }
    listings = newList;
    res.send({
        success: true,
        items: listings,
        inquiries: inquiriesList,
        errorCode: 200
    });
});


app.post(`/api/makeInquiry`, (req, res) => {
    let myQueryID = req.query.listingId;
    let myMsg = req.body.message;

    inquiriesList.push(
        {
            id: myQueryID,
            msg: myMsg
        }
    );

    res.send({
        success: true,
        items: listings,
        inquiries: inquiriesList,
        errorCode: 200
    });
});

app.get(`/api/getInquiries`, (req, res) => {
    let myListId = req.query.listingId;
    let retList = [];
    for (let i = 0; i < inquiriesList.length; i++) {
        if (inquiriesList[i].id == myListId) {
            retList.push(inquiriesList[i]);
        }
    }

    res.send({
        success: true,
        items: listings,
        inquiries: retList,
        errorCode: 200
    });
});

app.get(`*`, (req, res) => {
    res.send({
        success: false,
        items: listings,
        inquiries: inquiriesList,
        errorCode: 404
    });
});



app.listen(4000, () => {console.log('Server running on 4000')})