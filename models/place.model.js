const mongoose  = require('mongoose')

const placeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String},
    latitude: {type: Number},
    longitude: {type: Number},
    city: {type: String},
    country: {type: String},
    photo: {type: String, required:true},
    time_to_visit: {type: String},
});

module.exports = mongoose.model("Places",placeSchema);