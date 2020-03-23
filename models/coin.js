var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var coinSchema = new Schema({
    email: {type: String, required: true},
    coin: {type: Number, required: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('coin', coinSchema);