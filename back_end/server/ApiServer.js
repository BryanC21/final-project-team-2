//index for backend
// const redis = require('redis')
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
// const client = redis.createClient({path: 'redis-13037.c60.us-west-1-2.ec2.cloud.redislabs.com:13037'})

// client.on('connect', () => {console.log('Connected to Redis')})

const User = require('../models/user')
const Inquiry = require('../models/inquiry')
const Listing = require('../models/listing')

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
    instance.isAdmin = true
    instance.userId = req.body.userId
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

app.post(`/api/createListing`, (req, res) => {
    const instance = new Listing()
    console.log(req.body)
    instance.description = req.body.description
    instance.title = req.body.title
    instance.price =req.body.price
    instance.userId = req.body.userId
    instance.type = req.body.type
    instance.save()
    res.send(201)
});

/*app.get(`/api/viewListings`, (req, res) => {
  res.send({
    success: true,
    items: listings,
    inquiries: [],
    errorCode: 200
  });
}); */

app.get(`/api/viewListings`, async (req, res) => {
    const findParams = {}
    console.log(req.query)
    if(req.query.userId){
        findParams.userId = req.query.userId;
    }
    const listings = await Listing.find(findParams);
    res.send({
        success: true,
        listings: listings,
        errorCode: 200
    });
});

app.get(`/api/deleteListing`, async (req, res) => {
    await Listing.deleteOne({id: req.params.id});
    res.send({
        success: true,
        errorCode: 204
    });
});


app.post(`/api/makeInquiry`, (req, res) => {
    const instance = new Inquiry()
    console.log(req.body)
    instance.message = req.body.message
    instance.listingId =req.body.listingId
    instance.userId = req.body.userId
    instance.save()
    res.send(201)
});

app.get(`/api/getInquiries`, async (req, res) => {
    console.log(req.query.listingId)
    const inquiries = await Inquiry.find({listingId: req.query.listingId})

    res.send({
        success: true,
        inquiries: inquiries,
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