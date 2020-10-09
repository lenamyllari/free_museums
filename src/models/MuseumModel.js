const mongoose = require('mongoose')
//mongoose.set('useFindAndModify', false);

const old_museumSchema = new mongoose.Schema({
    name:  String,
    link: String,
    city:   String,
    address: String,
    hours: [{ day: String, open: String }],
    services: [{service: String}]
});
const museumSchema = new mongoose.Schema({
    name:  String,
    link: String,
    city:   String,
    address: String,
    hours: {
        monday: String ,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String,
        saturday: String,
        sunday: String
    },
    services: [String],
    themes: [String]

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

