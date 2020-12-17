//index for backend
const redis = require('redis')
const mongoose = require('mongoose');
const User = require('../models/user')
const Inquiry = require('../models/inquiry')
const Listing = require('../models/listing')
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const client = redis.createClient({host: 'redis-13037.c60.us-west-1-2.ec2.cloud.redislabs.com', port: 13037})

client.auth('GHSahP3jPWAUKoW459YE71UjkMzhRz6O', function(err, response){
    client.publish('testPublish', 'hello');
});



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
    instance.save((error, listing) => {
        if(error){
            res.send(400)
        }else {
            client.publish('updateListing', JSON.stringify({type: 'updateListing'}));
            res.send(201)
        }
    })
});


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
    console.log(req.query.id);
    await Listing.deleteOne({'_id': req.query.id});
    client.publish('updateListing', JSON.stringify({type: 'updateListing'}));
    res.send({
        success: true,
        errorCode: 204
    });
});


app.post(`/api/makeInquiry`, async (req, res) => {
    const instance = new Inquiry()
    const date = new Date()
    console.log(req.body)
    instance.message = req.body.message;
    instance.listingId =req.body.listingId;
    instance.userId = req.body.userId;
    instance.fromOwner = req.body.fromOwner;
    instance.createdAt = date;
    instance.save();
    const listing = await Listing.findById(req.body.listingId);
    client.publish('sendInquiry', JSON.stringify({
        type: 'sendInquiry',
        listingID: req.body.listingId,
        senderID: req.body.userId,
        recieverID: listing.userId,
        message: req.body.message,
        createdAt: date,
        fromOwner: req.body.fromOwner
    }));
    res.send(201);
});


app.get(`/api/getInquiriesByUserID`, async (req, res) => {
    //console.log("Trying to get Inquiries : "+ req.query.listingId)
    const listings = await Listing.find({userId: req.query.userId});
    Inquiry.find({listingId: listings.map((listing) => {return listing._id})})
    .populate('listingId')
    .exec((error, inquiries) => {
        console.log(error)
        res.send({
            success: true,
            inquiries: inquiries,
            errorCode: 200
        });
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