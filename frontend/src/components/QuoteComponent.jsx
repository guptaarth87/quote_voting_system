import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_URL from '../_helpers';
import { useNavigate } from 'react-router-dom';

const QuoteComponent = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchingQuote, setFetchingQuote] = useState(false);
  const [userVote, setUserVote] = useState(null); // To store the user's vote status

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  useEffect(() => {
    if (quote) {
      const savedVote = localStorage.getItem(`vote-${quote.id}`);
      setUserVote(savedVote); // Retrieve vote status from localStorage
    }
  }, [quote]);

  const navigate = useNavigate();

  const handleAddQuote = () => {
    navigate('/addquote');
  };

  const fetchRandomQuote = () => {
    setLoading(true);
    setFetchingQuote(true);
    axios.get(`${API_URL}/quote/random`)
      .then((response) => {
        setQuote(response.data);
        setLoading(false);
        setFetchingQuote(false);
      })
      .catch(() => {
        toast.error('Failed to fetch quote! 😞');
        setLoading(false);
        setFetchingQuote(false);
      });
  };

  const voteQuote = (type) => {
    if (userVote) {
      toast.info(`You have already ${userVote}d this quote!`);
      return;
    }

    axios.post(`${API_URL}/quote/${quote.id}/vote`, { [type]: true })
      .then((response) => {
        setQuote(response.data);
        setUserVote(type); // Set the vote type (upvote/downvote)
        localStorage.setItem(`vote-${quote.id}`, type); // Store vote status in localStorage
        toast.success(`Successfully ${type}d! 🎉`);
      })
      .catch(() => toast.error(`Failed to ${type}! 😕`));
  };

  const handleShareQuote = () => {
    const shareText = `"${quote.quote}" - ${quote.author}`;

    // Copy the quote and author to the clipboard
    navigator.clipboard.writeText(shareText)
        .then(() => {
            toast.success('Quote copied to clipboard!');
        })
        .catch(() => {
            toast.error('Failed to copy the quote.');
        });
};


  if (loading) return <p className="text-center text-muted">Fetching a quote... ⏳</p>;

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="card shadow-lg" style={{ backgroundColor: '#f3e5f5', borderRadius: '12px' }}>
        <div className="card-body">
          <h2 className="card-title text-center" style={{ color: '#6a1b9a' }}>
            {quote.quote} ✨
          </h2>
          <p className="card-text text-center" style={{ fontStyle: 'italic', color: '#4a148c' }}>
            - {quote.author} 🖋️
          </p>
          <p className="text-center">
            <span>👍 {quote.upvotes} | 👎 {quote.downvotes}</span>
          </p>
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-outline-success me-2" onClick={() => voteQuote('upvote')} disabled={userVote}>
              Upvote 👍
            </button>
            <button className="btn btn-outline-danger" onClick={() => voteQuote('downvote')} disabled={userVote}>
              Downvote 👎
            </button>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-primary" onClick={fetchRandomQuote} disabled={fetchingQuote}>
              {fetchingQuote ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                "Fetch Random Quote 🔄"
              )}
            </button>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-primary" onClick={handleAddQuote}>
              Add Quote ➕
            </button>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-secondary" onClick={handleShareQuote}>
              Share Quote 📤
            </button>
          </div>
        </div>
      </div>
      <div className="text-center mt-4" style={{ color: '#9575cd' }}>
        <p>“Get inspired with random wisdom at the click of a button.” 💡</p>
      </div>
    </div>
  );
};

export default QuoteComponent;
