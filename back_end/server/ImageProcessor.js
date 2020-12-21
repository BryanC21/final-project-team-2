const express = require('express')
const multer = require('multer')
const fs = require('fs');
const AWS = require('aws-sdk')
//const uuid = require('uuid/v4')

//const app = express()
//const port = 3000


const s3 = new AWS.S3({
    accessKeyId: '',
    secretAccessKey: "",
    Bucket: "csc667group2"
})

const sharp = require('sharp');
const KafkaConsumer = require('../kafka/KafkaConsumer.js');
const consumer = new KafkaConsumer(['myTopic']);

consumer.on('message', (filename) => {
    console.log('message in');
    let temp = filename.value;
    temp = temp.replace(/["]+/g, '')
    let imageName = "././uploads/"+temp;
    console.log(imageName);
    let fileContent;
    sharp(imageName).resize({ height:500, width:500}).toBuffer().then(data => {fileContent = data})//toFile('../././front_end/public/uploads/500x500'+temp)
    .then(function(newFileInfo){
    console.log("Image Resized");
    //const fileContent = fs.readFileSync('../././front_end/public/uploads/500x500'+temp);
    const key = '500x500'+filename.value.replace(/["]+/g, '');
    const params = {
        Bucket: "csc667group2",
        Key: key,
        ContentType: 'image/png',
        Body: fileContent
    }

    s3.upload(params, (error, data) => {
        if(error){
            console.log('failed  s3');
            console.log(error);
            //res.status(500).send(error)
        }
        console.log('uploaded s3');
        //res.status(200).send(data)
    })
    })
    .catch(function(err){
        //console.log(err);
    });

    sharp(imageName).resize({ height:100, width:100}).toBuffer().then(data => {fileContent = data})//.toFile('../././front_end/public/uploads/100x100'+temp)
    .then(function(newFileInfo){
    console.log("Image Resized");
    //const fileContent = fs.readFileSync('../././front_end/public/uploads/100x100'+temp);
    const key2 = '100x100'+filename.value.replace(/["]+/g, '');
    console.log(key2)
    const params = {
        Bucket: "csc667group2",
        Key: key2,
        ContentType: 'image/png',
        Body: fileContent
    }

    s3.upload(params, (error, data) => {
        if(error){
            console.log('failed s3');
            console.log(error);
            //res.status(500).send(error)
        }
        console.log('uploaded s3');
        //res.status(200).send(data)
    })
    })
    .catch(function(err){
        //console.log(err);
    });

    //causes problems so was removed
    /*fs.unlink(imageName, (err) => {
    if (err) {
    }else{
        console.log('Temp image deleted');
    }
    })*/

});

consumer.connect();
