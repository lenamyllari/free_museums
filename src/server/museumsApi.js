const express = require('express');
const router = express.Router();
//const Museum = require('../models/MuseumModel')
//const db = require("../db/db");
const dbName = "FreeMuseums";
const collectionName = "museos";

require('dotenv').config()
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbConnectionUrl = process.env.MONGODB_URI


MongoClient.connect(dbConnectionUrl, function (err, dbInstance) {
    if (err) {
        console.log(`[MongoDB connection] ERROR: ${err}`);
        //failureCallback(err);        // this should be "caught" by the calling function
    } else {
        const dbObject = dbInstance.db(dbName);
        const dbCollection = dbObject.collection(collectionName);
        console.log("[MongoDB connection] SUCCESS");
        //console.log(dbCollection);
        dbCollection.find().toArray(function (err, result) {

            if (err) throw err;

            console.log(result);

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
       return res

})




module.exports = router;
