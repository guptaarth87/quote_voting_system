from flask_sqlalchemy import SQLAlchemy

# Initialize the database
db = SQLAlchemy()

# Define the Quote model
class Quote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    quote = db.Column(db.String(500), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    upvotes = db.Column(db.Integer, default=0)
    downvotes = db.Column(db.Integer, default=0)
