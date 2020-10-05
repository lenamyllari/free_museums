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
const url = require('url');

const isStringEmpty = (input) => {
    return !input || !input.trim();
}

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

router.get('/museums/themes', (req, res) => {
    var q = url.parse(req.url, true).query;
    var theme = q.theme
    if (isStringEmpty(theme)) {
        res.send("empty search")
    }
    else {
        const client = new MongoClient(dbConnectionUrl, {useNewUrlParser: true});
        client.connect(err => {
            const collection = client.db(dbName).collection(collectionName);
            collection.find({"themes": q.theme}).toArray(function (err, result) {
                if (err) {
                    return result.status(500).send(err);
                }
                console.log(result);
                res.send(result)
            });
            client.close();
        });
    }
})

router.get('/museums/city', (req, res) => {
    var q = url.parse(req.url, true).query;
    var city = q.city;
    if (isStringEmpty(city)) {
        res.send("empty search")
    } else {
        const client = new MongoClient(dbConnectionUrl, { useNewUrlParser: true });
        client.connect(err => {
            const collection = client.db(dbName).collection(collectionName);
            collection.find({city: city}).toArray(function (err, result) {
                if (err) {
                    return result.status(500).send(err);
                }
                console.log(result);
                res.send(result)
            });
            client.close();
        });
    }
})

router.get('/museums/name', (req, res) => {
    var q = url.parse(req.url, true).query;
    var name = q.name;
    if (isStringEmpty(name)) {
        res.send("empty search")
    } else {
        const client = new MongoClient(dbConnectionUrl, { useNewUrlParser: true });
        client.connect(err => {
            const collection = client.db(dbName).collection(collectionName);
            collection.find({name: name}).toArray(function (err, result) {
                if (err) {
                    return result.status(500).send(err);
                }
                console.log(result);
                res.send(result)
            });
            client.close();
        });
    }
})

router.post('/addMuseum', (req, res) =>{
    console.log(req.body);      // your JSON
    const museo = getMuseum(req);
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
    const museo = getMuseum(req);
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
    const museo = getMuseum(req);
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

function getMuseum(req) {
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
    return museo;
}

module.exports = router;
