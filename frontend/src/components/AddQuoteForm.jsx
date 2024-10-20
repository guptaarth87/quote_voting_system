import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_URL from '../_helpers';  // Assuming you have API_URL configured
import { useNavigate } from 'react-router-dom';

const AddQuoteForm = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();
  
    const handlevoteQuote = () => {
      navigate('/');
    };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!quote || !author) {
      toast.error('Both quote and author are required! 🙁');
      return;
    }

    setSubmitting(true);

    axios.post(`${API_URL}/quote/add`, { quote, author })
      .then((response) => {
        toast.success('Quote added successfully! 🎉');
        // Clear the form after successful submission
        setQuote('');
        setAuthor('');
      })
      .catch((error) => {
        toast.error('Failed to add quote. Please try again! 😞');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="card shadow-lg" style={{ backgroundColor: '#f3e5f5', borderRadius: '12px' }}>
        <div className="card-body">
          <h2 className="card-title text-center" style={{ color: '#6a1b9a' }}>Add a New Quote ✨</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="quote" className="form-label" style={{ color: '#4a148c' }}>Quote</label>
              <textarea
                className="form-control"
                id="quote"
                rows="3"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Enter the quote"
                required
                style={{ borderColor: '#6a1b9a' }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label" style={{ color: '#4a148c' }}>Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter the author's name"
                required
                style={{ borderColor: '#6a1b9a' }}
              />
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                  "Add Quote ✍️"
                )}
              </button>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-primary" onClick={handlevoteQuote}>
                Vote Quote
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuoteForm;
