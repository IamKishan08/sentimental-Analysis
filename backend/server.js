const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const analyzeController = require('./controllers/analyzeController'); 

const app = express();
const PORT = 3001;

// Connect to MongoDB without deprecated options
mongoose.connect('mongodb://localhost:27017/sentiment_analysis')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());

// Route to receive feedback and perform sentiment analysis
app.post('/feedback', analyzeController.analyzeFeedback);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
