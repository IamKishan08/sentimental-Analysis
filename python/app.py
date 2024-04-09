from flask import Flask, request, jsonify
import sys
import nltk
nltk.download('vader_lexicon')
from nltk.sentiment import SentimentIntensityAnalyzer

app = Flask(__name__)

@app.route('/analyze-sentiment', methods=['POST'])
def analyze_sentiment():
    feedback = request.json['feedback']
    sia = SentimentIntensityAnalyzer()
    scores = sia.polarity_scores(feedback)
    if scores['compound'] > 0.05:
        return jsonify({'sentiment': 'positive'})
    elif scores['compound'] < -0.05:
        return jsonify({'sentiment': 'negative'})
    else:
        return jsonify({'sentiment': 'neutral'})

if __name__ == '__main__':
    app.run(port=5001)
