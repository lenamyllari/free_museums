const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()

const cors = require('cors')
const museumsApi = require('./museumsApi2.js')

app.use(cors())
app.use(bodyParser.json())
//app.use(express.static('build'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    'allowedHeaders': ['Content-Type'],
    'origin': '*',
    'preflightContinue': true
}));
const PORT = process.env.PORT

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});





app.use('/api', museumsApi);

var server = app.listen(PORT, function () {
    var host = server.address().address;
    var port = server.address().port;
    /* eslint-disable no-console */
    console.log("Example app listening at http://%s:%s", host, port)
    /* eslint-enable no-console */
});


