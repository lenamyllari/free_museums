const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
/*
const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })
*/

const museumSchema = new mongoose.Schema({
    name:  String,
    link: String,
    city:   String,
    address: String,
    hours: [{ day: String, open: String }],
    services: [{service: String}]
});

museumSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const Museum = mongoose.model('Museum', museumSchema)
module.exports = Museum;

