const mongoose = require('mongoose')
const Schema = mongoose.Schema
const pictureSchema = new Schema({
    picture: {
        type: Buffer
    } 
})

module.exports = mongoose.model('picture', pictureSchema)