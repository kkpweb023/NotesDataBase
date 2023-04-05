const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    _id:Number,


})

module.exports = mongoose.model('bankdetails',NoteSchema);
