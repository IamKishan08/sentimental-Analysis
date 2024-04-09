const Feedback = require('../models/Review');

async function getFeedbackByRole(req, res) {
    const { role } = req.user; // Assuming role is available in req.user after authentication
    try {
        const feedback = await Feedback.find({ manager: role });
        res.json({ feedback });
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ message: 'Error fetching feedback' });
    }
}

module.exports = {
    getFeedbackByRole
};
