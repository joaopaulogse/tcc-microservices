from flask import Flask, jsonify, request
import json
import twitter as tw
app = Flask(__name__)


@app.route('/search/<search>')
def search_tweets(search=None):
    count = request.args.get('count')
    lang = request.args.get('lang')
    data = tw.get_tweet(search, count, lang)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')

