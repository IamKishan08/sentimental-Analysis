const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const analyzeController = require('./controllers/analyzeController'); 
const registerController = require('./controllers/registerController');
const loginController = require('./controllers/loginController');
const feedbackController = require('./controllers/feedbackController');
const { authenticateToken } = require('./config/authMiddleware');

const app = express();
const PORT = 3001;

// Connect to MongoDB without deprecated options
mongoose.connect('mongodb://localhost:27017/sentiment_analysis')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));



// Route to receive feedback and perform sentiment analysis
app.post('/api/feedback', analyzeController.analyzeFeedback);
app.get('/api/feedback', authenticateToken, feedbackController.getFeedbackByRole);
// Routes for Authentication
app.post('/api/register', registerController.register);
app.post('/api/login', loginController.login);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
