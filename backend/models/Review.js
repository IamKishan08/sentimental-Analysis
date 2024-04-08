const mongoose = require('mongoose');

//  store the processed data in mongoDb
const reviewSchema = new mongoose.Schema({
    feedback: String,
    sentiment: String,
    manager: String
});


module.exports = mongoose.model('Review', reviewSchema);
