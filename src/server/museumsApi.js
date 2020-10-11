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
const weekdayOptions = require('../data/weekdayOptions.js')

const isStringEmpty = (input) => {
    return !input || !input.trim();
}

const isWeekday = (input) => {
    var isWeekday = false;
    for (var i=0;i<weekdayOptions.length;i++) {
        if (input === weekdayOptions[i].value.toLowerCase()) {
            isWeekday = true;
            break;
        }
    }
    console.log(isWeekday);
    return isWeekday;
}

/*MongoClient.connect(dbConnectionUrl, function (err, dbInstance) {
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
})*/

router.get('/museums/all', (req, res) => {
    console.log("api")
    const client = new MongoClient(dbConnectionUrl, { useNewUrlParser: true });
    client.connect(async err => {
        console.log("connect")
        const collection = client.db(dbName).collection(collectionName);
        console.log("connect")
        await collection.find().toArray(function (err, result) {
            if (err) {
                res.statusCode=500;
                res.end("500 Internal Server Error");
            } else if (result.length === 0) {
                res.statusCode=404;
                res.end("404 Not Found");
            } else {
                console.log(result);
                res.status(200).send(result)
            }
        });
    });
    client.close();
})

router.get('/museums/themes', (req, res) => {
    var q = url.parse(req.url, true).query;
    var theme = q.theme
    if (isStringEmpty(theme)) {
        res.statusCode=400;
        res.end("400 Bad Request");
    }
    else {
        const client = new MongoClient(dbConnectionUrl, {useNewUrlParser: true});
        client.connect(err => {
            const collection = client.db(dbName).collection(collectionName);
            collection.find({"themes": q.theme}).toArray(function (err, result) {
                if (err) {
                    res.statusCode=500;
                    res.end("500 Internal Server Error");
                } else if (result.length === 0) {
                    res.statusCode=404;
                    res.end("404 Not Found");
                } else {
                    console.log(result);
                    res.status(200).send(result);
                }
            });
            client.close();
        });
    }
})

router.get('/museums/city', (req, res) => {
    var q = url.parse(req.url, true).query;
    var city = q.city;
    if (isStringEmpty(city)) {
        res.statusCode=400;
        res.end("400 Bad Request");
       // return res.send(createError(400));
    } else {
        const client = new MongoClient(dbConnectionUrl, { useNewUrlParser: true });
        client.connect(err => {
            const collection = client.db(dbName).collection(collectionName);
            collection.find({city: city}).toArray(function (err, result) {
                if (err) {
                    res.statusCode=500;
                    res.end("500 Internal Server Error");
                } else if (result.length === 0) {
                    res.statusCode=404;
                    res.end("404 Not Found");
                } else {
                    console.log(result);
                    res.status(200).send(result)
                }
            });
            client.close();
        });
    }
})

router.get('/museums/name', (req, res) => {
    var q = url.parse(req.url, true).query;
    var name = q.name;
    if (isStringEmpty(name)) {
        res.statusCode=400;
        res.end("400 Bad Request");
    } else {
        const client = new MongoClient(dbConnectionUrl, { useNewUrlParser: true });
        client.connect(err => {
            const collection = client.db(dbName).collection(collectionName);
            collection.find({name: name}).toArray(function (err, result) {
                if (err) {
                    res.statusCode=500;
                    res.end("500 Internal Server Error");
                } else if (result.length === 0) {
                    res.statusCode=404;
                    res.end("404 Not Found");
                } else {
                    console.log(result);
                    res.status(200).send(result);
                }
            });
            client.close();
        });
    }
})

router.get('/museums/services', (req, res) => {
    var q = url.parse(req.url, true).query;
    var service = q.service;
    if (isStringEmpty(service)) {
        res.statusCode=400;
        res.end("400 Bad Request");
    } else {
        const client = new MongoClient(dbConnectionUrl, { useNewUrlParser: true });
        client.connect(err => {
            const collection = client.db(dbName).collection(collectionName);
            collection.find({"services": service}).toArray(function (err, result) {
                if (err) {
                    res.statusCode=500;
                    res.end("500 Internal Server Error");
                } else if (result.length === 0) {
                    res.statusCode=404;
                    res.end("404 Not Found");
                } else {
                    console.log(result);
                    res.status(200).send(result);
                }
            });
            client.close();
        });
    }
})

router.get('/museums/hours', (req, res) => {
    var q = url.parse(req.url, true).query;
    var day = (q.weekday).toLowerCase();
    console.log(day);
    const qString = 'hours.' + day
    if (isStringEmpty(day) || !isWeekday(day)) {
        res.statusCode=400;
        res.end("400 Bad Request");
    } else {
        const client = new MongoClient(dbConnectionUrl, { useNewUrlParser: true });
        client.connect(async err => {
            const collection = client.db(dbName).collection(collectionName);
            await collection.find({$and: [{"hours": {$ne: null}},{[qString]: {$ne: "Suljettu"}}]}).toArray(function (err, result) {
                if (err) {
                    res.statusCode=500;
                    res.end("500 Internal Server Error");
                } else if (result.length === 0) {
                    res.statusCode=404;
                    res.end("404 Not Found");
                } else {
                    res.status(200).send(result);
                }
            });
            client.close();
        });
    }
})

router.post('museums/add', (req, res) =>{
    console.log(req.body);      // your JSON
    const museo = getMuseum(req);
    console.log(museo)
    const client = new MongoClient(dbConnectionUrl, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db(dbName).collection(collectionName);
        collection.insertOne(museo, function (err, result) {
            if (err) {
                res.statusCode=500;
                res.end("500 Internal Server Error");
            } else {
                res.status(201).send(result);
            }
        });
        client.close();
    });
})

router.put('/museums/update', (req, res) => {
    console.log(req.body);      // your JSON
    const museo = getMuseum(req);
    console.log(museo)
    const client = new MongoClient(dbConnectionUrl, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db(dbName).collection(collectionName);
        collection.update(
            {name: museo.name},
            {
                city: museo.city,
                address: museo.address,
                link: museo.link,
                hours: {
                    monday: museo.hours.monday,
                    tuesday: museo.hours.tuesday,
                    wednesday: museo.hours.wednesday,
                    thursday: museo.hours.thursday,
                    friday: museo.hours.friday,
                    saturday: museo.hours.saturday,
                    sunday: museo.hours.sunday
                },
                services: museo.services,
                themes: museo.themes
            },
            function (err, result) {
            if (err) {
                res.statusCode=500;
                res.end();
            } else {
                res.status(201).send(result)
            }
        });
        client.close();
    });
})

router.delete('/museums/delete', (req, res) => {
    var q = url.parse(req.url, true).query;
    var name = q.name;
    const client = new MongoClient(dbConnectionUrl, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db(dbName).collection(collectionName);
        collection.deleteOne({name: name}, function (err, result) {
            if (err) {
                res.status(500).end("500 Internal Server Error");
            } else {
                res.status(204).end();
            }
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
