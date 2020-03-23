var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new Schema({
    email: {type: String, required: true},
    comment: {type: String, required: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('History', historySchema);