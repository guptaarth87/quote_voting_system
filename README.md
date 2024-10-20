# 📖 Quote Voting System

Welcome to the **Quote Voting System**! This project consists of a backend built with Flask and SQLite and a frontend developed using React and Bootstrap. Users can view random quotes, upvote or downvote them, and enjoy a seamless interface.

## 🌐 Live Demo

- **Frontend**: [quote-voting.netlify.app](https://quote-voting.netlify.app/)
- **Backend API**: [quote-voting-system.onrender.com](https://quote-voting-system.onrender.com/)
- **GitHub Repository**: [github.com/guptaarth87/quote_voting_system](https://github.com/guptaarth87/quote_voting_system)

## 🛠️ Technologies Used

- **Frontend**: React, Bootstrap
- **Backend**: Flask, SQLite
- **Deployment**: Netlify (Frontend), Render (Backend)

## ✔️ Features

- **API Development**:
  - ✅ Create endpoints to fetch a random quote from the database.
  - ✅ Endpoints for upvoting or downvoting quotes.
  - ✅ `GET /quote/random/` – to fetch a random quote.
  - ✅ `POST /quote/<id>/vote/` – to upvote or downvote a quote (with a payload indicating upvote or downvote).

- **Database Setup**:
  - ✅ Use SQLite or PostgreSQL.
  - ✅ Create a Quotes table with fields:
    - `id`: unique ID.
    - `quote`: text of the quote.
    - `author`: author of the quote.
    - `upvotes`: number of upvotes.
    - `downvotes`: number of downvotes.

- **Vote Logic**:
  - ✅ When a user votes on a quote, update the respective upvotes or downvotes in the database.

### Frontend (ReactJS)

- **Quote Display**:
  - ✅ Create a simple interface that displays a random quote from the backend.
  - ✅ Include buttons for upvoting and downvoting the quote.
    - Example UI:
      - Quote: “The best way to predict the future is to invent it.” 
      - Author: Alan Kay
      - Upvotes: 123
      - Downvotes: 45
      - [Upvote] [Downvote]

- **API Integration**:
  - ✅ Use `fetch` or `axios` to call the backend to fetch a random quote and handle voting.
  - ✅ Update the quote display dynamically when a new random quote is fetched.

- **Real-time Feedback**:
  - ✅ After upvoting or downvoting, reflect the changes in vote counts immediately.
  - ✅ Add a loader or message while fetching a new random quote to improve user experience.

### Bonus Features (Optional)

- **User Session Persistence**:
  - ✅ Store whether the user has upvoted or downvoted a quote in `localStorage` to prevent multiple votes without refreshing.

- **Quote Sharing**:
  - ✅ Add a “Share” button to allow users to copy the quote or share it on social media.

- **Styling**:
  - ✅ Implement a clean design using Bootstrap to make the interface engaging.

## 🚀 Additional Task

- ✅ Successfully deployed the frontend on Netlify and the backend on Render.

## 📚 How to Run the Project Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/guptaarth87/quote_voting_system.git
