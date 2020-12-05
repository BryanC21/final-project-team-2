// todo, need an image endpoint
const express = require("express");
const app = express();

app.use(express.json());

module.exports = app;

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

app.get(`/api/deleteListings`, (req, res) => {
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

if (require.main === module) {
    console.log('Starting app');
    app.listen(4000);
};
