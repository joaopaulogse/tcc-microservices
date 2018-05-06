from textblob import TextBlob
import json

from twython import Twython

consumer_key = '08KAZsaUX3EKXIMTWnYAJT5AT'
consumer_secret = 'eSJ4Lvw42jnRx7RYFbbM51cixXrfI5Rbjdd4yLXn7Y8dSmw1VW'

access_token = '842936456771461120-Ce5haijVorq2MmLylALSx15EChD7nu9'
access_token_secret = 'hGwRzIRjTKmG69bOczgHdzL4iqugMr3Yagc70Dh736fGc'

twitter = Twython(consumer_key, consumer_secret, access_token, access_token_secret)

def get_tweet(search, count=2, lang="pt"):
    public_tweets = twitter.search(q=str(search), count=count, lang=lang)
    result = []
    for tweets in public_tweets.values():
        
        try:
            for tweet in tweets:
                # print(tweet)
                
                analysis = TextBlob(tweet['text'])
                data = {
                    'tweet':tweet['text'], 
                    'user':tweet['user']['name'],
                    'hasPolarity':(analysis.sentiment.polarity != 0.0), 
                    'Sentiment': analysis.sentiment,
                    'lang':tweet['lang'],
                    'description':tweet['user']['description'],
                    'url_user':tweet['user']['url'],
                    }
                
                result.append(data)
        except TypeError:
            pass
    return result
