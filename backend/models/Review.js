const mongoose = require('mongoose');

//  store the processed data in mongoDb
const reviewSchema = new mongoose.Schema({
    feedback: {
        type: String,
        required: true
    },
    sentiment: {
        type: String,
        enum: ['positive', 'negative', 'neutral'],
        default: 'neutral'
    },
    manager: {
        type: String,
        enum: ['General manager', 'Housekeeping Manager', 'Food Manager', 'Safety manager', 'Service Manager'],
        default: 'General manager'
    }
});


module.exports = mongoose.model('Review', reviewSchema);
