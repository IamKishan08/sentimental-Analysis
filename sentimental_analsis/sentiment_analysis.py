import nltk
nltk.download('vader_lexicon')
from nltk.sentiment import SentimentIntensityAnalyzer

def analyze_sentiment(text):
   
    sia = SentimentIntensityAnalyzer()
   
    scores = sia.polarity_scores(text)
   
    if scores['compound'] > 0.05:
        return 'positive'
    elif scores['compound'] < -0.05:
        return 'negative'
    else:
        return 'neutral'

if __name__ == "__main__":
    
    text = "I love this hotel, it's amazing!"
    sentiment = analyze_sentiment(text)
    print(sentiment)
