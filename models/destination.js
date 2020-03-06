const mongoose = require('mongoose')
const Schema = mongoose.Schema

const destinationSchema = new Schema({
    country: String,
    population: Number,
    region: String,
    subRegion: String,
    language: String,
    capital: String,
    currency: String,
    timeZone: String,
    borders:[String]
})


module.exports = mongoose.model('Dest', destinationSchema)