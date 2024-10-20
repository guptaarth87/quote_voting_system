import React from 'react';
import {Routes , Route } from 'react-router-dom';
import QuoteComponent from './components/QuoteComponent';
import AddQuoteForm from './components/AddQuoteForm';

const App = () => {
  return (
    <div className="App">
      <h1 className="text-center mt-5">Random Quote Generator</h1>
       <Routes>
        <Route path='/' element={ <QuoteComponent />}/>
        <Route path='/addquote' element={<AddQuoteForm/>}/>
       </Routes>
     
    </div>
  );
};

export default App;
