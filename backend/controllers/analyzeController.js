const axios = require('axios');
const Review = require('../models/Review');
// const keywordsMapping = require('./managers_keywords.json');

// Define manager roles
const MANAGER_ROLES = ['General manager', 'Housekeeping Manager', 'Food Manager', 'Safety manager', 'Service Manager'];

// Function to classify feedback to a manager role
function classifyFeedback(feedback) {
    const keywordsMapping = {
        "General manager": ["overall", "management", "reception"],
        "Housekeeping Manager": ["cleaning', 'tidy", "room service","housekeeping","cleanliness","stain","grimy","dirt","grime","dust","dirty","messy","maid","housekeeper"],
        "Food Manager": [ "restaurant", "dining","food","taste","menu","breakfast","tasteless","lunch","dinner","quality","variety","cuisine","buffet","portions","presentation","tastes","delicious","tasty"],
        "Safety manager": ["safety", "safe","theft","emergency","alarm","safety","uncomfortable","lock","dangerous","risk","hazard","unsafe","uneasy","security","secure"],
        "Service Manager": ["hospitality","staff","service","reception","check-in","check-out","assistance","response time","helpfulness","attitude","efficiency","efficient"]
    };

    for (const [role, keywords] of Object.entries(keywordsMapping)) {
        if (keywords.some(keyword => feedback.toLowerCase().includes(keyword))) {
            return role;
        }
    }

    
    return 'General manager';
}

// Controller logic for sentiment analysis and feedback classification
exports.analyzeFeedback = async (req, res) => {
    try {
        const feedback = req.body.feedback;

        // Make a POST request to the Python server for sentiment analysis
        const response = await axios.post('http://localhost:5000/analyze-sentiment', { feedback });
        const sentiment = response.data.sentiment;
        const manager = classifyFeedback(feedback); // Classify feedback to a manager role

        // Save the analyzed feedback to MongoDB
        const newReview = new Review({ feedback, sentiment, manager });
        await newReview.save();

        res.status(200).json({ message: 'Feedback analyzed and classified successfully', review: newReview });
    } catch (error) {
        console.error('Error analyzing feedback:', error);
        res.status(500).json({ error: 'An error occurred while analyzing feedback' });
    }
};
