const { PythonShell } = require('python-shell');
const Review = require('../models/Review');

// Define manager roles
const MANAGER_ROLES = ['General manager', 'Housekeeping Manager', 'Food Manager', 'Safety manager', 'Service Manager'];

// Function to classify feedback to a manager role
function classifyFeedback(feedback) {
   
    const keywordsMapping = {
        'General manager': ['overall', 'management', 'reception'],
        'Housekeeping Manager': ['cleaning', 'tidy', 'room service'],
        'Food Manager': ['food', 'restaurant', 'dining'],
        'Safety manager': ['safety', 'security', 'emergency'],
        'Service Manager': ['service', 'staff', 'hospitality']
    };

    for (const [role, keywords] of Object.entries(keywordsMapping)) {
        if (keywords.some(keyword => feedback.toLowerCase().includes(keyword))) {
            return role;
        }
    }

    // If no specific keywords match, classify as General manager
    return 'General manager';
}

// Controller logic for sentiment analysis and feedback classification
exports.analyzeFeedback = async (req, res) => {
    try {
        const feedback = req.body.feedback;

        // Execute Python sentiment analysis script
        PythonShell.run('../sentiment_analysis/sentiment_analysis.py', { args: [feedback] }, async (err, results) => {
            if (err) throw err;
            const sentiment = results[0];
            const manager = classifyFeedback(feedback); // Classify feedback to a manager role

            // Save the analyzed feedback to MongoDB
            const newReview = new Review({ feedback, sentiment, manager });
            await newReview.save();

            res.status(200).json({ message: 'Feedback analyzed and classified successfully', review: newReview });
        });
    } catch (error) {
        console.error('Error analyzing feedback:', error);
        res.status(500).json({ error: 'An error occurred while analyzing feedback' });
    }
};
