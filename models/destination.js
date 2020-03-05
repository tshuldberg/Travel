const mongoose = require('mongoose')
const Schema = mongoose.Schema

const destinationSchema = new Schema({
    country: String,
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    name: String,
})


module.exports = mongoose.model('Dest', destinationSchema)