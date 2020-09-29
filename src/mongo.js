const mongoose = require('mongoose')
const { Schema } = mongoose;


if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://api_kurssi:${password}@museums.fyo0p.mongodb.net/FreeMuseums?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const museoSchema = new Schema({
    name:  String,
    link: String,
    city:   String,
    address: String,
    hours: [{ Ma: String },
        {Ti: String},
        {Ke: String},
        {To: String},
        {Pe: String},
        {La: String},
        {Su: String}],
    services: [{Number: String}]
});

const Museo = mongoose.model('Museo', museoSchema)

const museo = new Museo({
    name:  "Friitalan Nahkamuseo",
    link: "https://museot.fi/museohaku/index.php?museo_id=22095",
    city:   "Ulvila",
    address: " Friitalantie 11 28400 Ulvila",
    hours: [{ Ma: "Suljettu" },
        {Ti: "Suljettu"},
        {Ke: "Suljettu"},
        {To: "Suljettu"},
        {Pe: "Suljettu"},
        {La: "Suljettu"},
        {Su: "Suljettu"}],
    services: [{"0": "Kahvila"},
        {"1": "Myyntipiste"},
        {"2": "Pys\u00e4k\u00f6intipaikka"}]
})

museo.save().then(response => {
    console.log('note saved!')
    mongoose.connection.close()
})






