from textblob import TextBlob
import json
import re
import os
from twython import Twython

consumer_key = os.environ["CONSUMER_KEY"]
consumer_secret = os.environ["CONSUMER_SECRET"]

access_token = os.environ["ACCESS_TOKEN"]
access_token_secret = os.environ["ACCESS_TOKEN_SECRET"]

twitter = Twython(consumer_key, consumer_secret, access_token, access_token_secret)

def get_tweet(search, count=2, lang="pt"):
    public_tweets = twitter.search(q=str(search), count=count, lang=lang)
    result = []
    for tweets in public_tweets.values():
        
        try:
            for tweet in tweets:
                # print(tweet)
                emoji_pattern = re.compile("["
                        u"\U0001F600-\U0001F64F"  # emoticons
                        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                        u"\U0001F680-\U0001F6FF"  # transport & map symbols
                        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                                        "]+", flags=re.UNICODE)
                
                analysis = TextBlob(emoji_pattern.sub(r'', tweet['text']))
                # print(tweet['text'])    
                try:
                    analysis = analysis.translate(to="en")
                except:
                    pass
                data = {
                    'tweet':tweet['text'], 
                    'tweetTranslated':str(analysis),
                    'user':tweet['user']['name'],
                    'hasPolarity':(analysis.sentiment.polarity != 0.0), 
                    'polarity': analysis.sentiment.polarity,
                    'subjectivity': analysis.sentiment.subjectivity,
                    'lang':tweet['lang'],
                    'description':tweet['user']['description'],
                    'url_user':tweet['user']['url'],
                    }
                
                result.append(data)
        except TypeError:
            pass
    return result
