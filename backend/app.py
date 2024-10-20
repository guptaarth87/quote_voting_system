from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Quote
import random

app = Flask(__name__)

# Configuration for SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)

# Initialize the app with the database
db.init_app(app)

# Create the database and the tables
with app.app_context():
    db.create_all()

# Route to get a random quote
@app.route('/quote/random', methods=['GET'])
def get_random_quote():
    quotes = Quote.query.all()
    if quotes:
        quote = random.choice(quotes)
        return jsonify({
            'id': quote.id,
            'quote': quote.quote,
            'author': quote.author,
            'upvotes': quote.upvotes,
            'downvotes': quote.downvotes
        })
    return jsonify({'message': 'No quotes found'}), 404

# Route to vote for a quote (upvote or downvote)
@app.route('/quote/<int:id>/vote', methods=['POST'])
def vote_quote(id):
    data = request.json
    quote = Quote.query.get(id)
    if not quote:
        return jsonify({'message': 'Quote not found'}), 404

    if 'upvote' in data:
        quote.upvotes += 1
    elif 'downvote' in data:
        quote.downvotes += 1

    db.session.commit()
    return jsonify({
        'id': quote.id,
        'quote': quote.quote,
        'author': quote.author,
        'upvotes': quote.upvotes,
        'downvotes': quote.downvotes
    })

# Route to add a new quote
@app.route('/quote/add', methods=['POST'])
def add_quote():
    data = request.json
    quote_text = data.get('quote')
    author = data.get('author')

    if not quote_text or not author:
        return jsonify({'message': 'Quote and Author are required'}), 400

    new_quote = Quote(
        quote=quote_text,
        author=author,
        upvotes=0,
        downvotes=0
    )

    db.session.add(new_quote)
    db.session.commit()

    return jsonify({
        'message': 'Quote added successfully!',
        'quote': {
            'id': new_quote.id,
            'quote': new_quote.quote,
            'author': new_quote.author,
            'upvotes': new_quote.upvotes,
            'downvotes': new_quote.downvotes
        }
    }), 201

if __name__ == "__main__":
    app.run(debug=True)
