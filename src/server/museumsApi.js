const express = require('express');
const router = express.Router();
const Museum = require('../models/MuseumModel')
//const db = require("../db/db");
const dbName = "FreeMuseums";
const collectionName = "museos";
require('dotenv').config()
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbConnectionUrl = process.env.MONGODB_URI
const mongoose = require('mongoose')
const { Schema } = mongoose;

MongoClient.connect(dbConnectionUrl, function (err, dbInstance) {
    if (err) {
        console.log(`[MongoDB connection] ERROR: ${err}`);
    } else {
        const dbObject = dbInstance.db(dbName);
        const dbCollection = dbObject.collection(collectionName);
        console.log("[MongoDB connection] SUCCESS");
        dbCollection.find().toArray(function (err, result) {
            if (err) throw err;
            //console.log(result);
        });
    }
})

/*db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    // get all items
    dbCollection.find().toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        // << return response to client >>
    });
}, function (err) { // failureCallback
    throw (err);
});*/

router.get('/museums', (req, res) => {
    console.log("api")
    const client = new MongoClient(dbConnectionUrl, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db(dbName).collection(collectionName);
        collection.find().toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
        });
        client.close();
    });
})

router.post('/addMuseum', (req, res) =>{
    console.log(req.body);      // your JSON
    const museo = new Museum ({
        name:  req.body.name,
        link: req.body.link,
        city:   req.body.city,
        address: req.body.address,
        hours: {
        monday: req.body.hours.monday,
            tuesday: req.body.hours.tuesday,
            wednesday: req.body.hours.wednesday,
            thursday: req.body.hours.thursday,
            friday: req.body.hours.friday,
            saturday: req.body.hours.saturday,
            sunday: req.body.hours.sunday
        },
        services: req.body.services,
        themes: req.body.themes
    })
    console.log(museo)
    const client = new MongoClient(dbConnectionUrl, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db(dbName).collection(collectionName);
        collection.insertOne(museo, function (err, result) {
            if (err) throw err;
            res.send(result)
        });
        client.close();
    });
})

router.post('/update', (req, res) => {
    console.log(req.body);      // your JSON
    const museo = new Museum ({
        name:  req.body.name,
        link: req.body.link,
        city:   req.body.city,
        address: req.body.address,
        hours: {
            monday: req.body.hours.monday,
            tuesday: req.body.hours.tuesday,
            wednesday: req.body.hours.wednesday,
            thursday: req.body.hours.thursday,
            friday: req.body.hours.friday,
            saturday: req.body.hours.saturday,
            sunday: req.body.hours.sunday
        },
        services: req.body.services,
        themes: req.body.themes
    })
    console.log(museo)
    const client = new MongoClient(dbConnectionUrl, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db(dbName).collection(collectionName);
        collection.find({name: museo.name}).updateOne(museo, function (err, result) {
            if (err) throw err;
            res.send(result)
        });
        client.close();
    });
})

router.delete('/delete', (req, res) => {
    const museo = new Museum ({
        name:  req.body.name,
        link: req.body.link,
        city:   req.body.city,
        address: req.body.address,
        hours: {
            monday: req.body.hours.monday,
            tuesday: req.body.hours.tuesday,
            wednesday: req.body.hours.wednesday,
            thursday: req.body.hours.thursday,
            friday: req.body.hours.friday,
            saturday: req.body.hours.saturday,
            sunday: req.body.hours.sunday
        },
        services: req.body.services,
        themes: req.body.themes
    })
    const client = new MongoClient(dbConnectionUrl, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db(dbName).collection(collectionName);
        collection.find({name: museo.name}).deleteOne(museo, function (err, result) {
            if (err) throw err;
            res.send(result)
        });
        client.close();
    });
})

module.exports = router;
