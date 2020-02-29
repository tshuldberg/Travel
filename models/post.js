const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postsSchema = new Schema({
    textContent: String,
    datePosted: {type: Date, default: function() {
        return new Date().getFullYear()
    }},
    title: String, 
    destination: {type: Schema.Types.ObjectId, ref: 'Dest'}
})


module.exports = mongoose.model('Post', postsSchema);