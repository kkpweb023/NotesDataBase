const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({

       image:String   
});
module.exports = mongoose.model('notes',NoteSchema);

