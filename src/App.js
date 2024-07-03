import React, { useEffect, useState } from 'react';
import './App.scss';
import COLORS_ARRAY from "./colorsArray"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState("#000")
  
  const quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

  useEffect(() => {
    const fetchQuotes = async (url) => {
      const res = await fetch(url);
      const jsonData = await res.json();
      setQuotesArray(jsonData.quotes);
    }
    if (quotesArray === null) {
      fetchQuotes(quoteDBUrl);
    }
    if (quotesArray) {
      generateRandomQuote();
    }
   }, [quoteDBUrl, quotesArray]
  )

  const generateRandomQuote = () => { 
    let randomQuote = Math.floor(Math.random() * quotesArray.length);
    let randomColor = Math.floor(Math.random() * COLORS_ARRAY.length);
    setQuote(quotesArray[randomQuote].quote);
    setAuthor(quotesArray[randomQuote].author);
    setAccentColor(COLORS_ARRAY[randomColor]);
   }

  return (
    <div className="App">
        <header className="App-header" style={{backgroundColor: accentColor, color: accentColor}}>
          <div id="quote-box" style={{color: accentColor}}>
            <p id="text">"{quote}"</p>
            <p  id="author">- {author}</p>
            <div id="button-container">
              <a style={{backgroundColor: accentColor}} id="tweet-quote" href={`http://www.twitter.com/intent/tweet?text=${quote}`} ><FontAwesomeIcon icon={faXTwitter} /></a>
              <button style={{backgroundColor: accentColor}} id="new-quote" onClick={() => generateRandomQuote()}>New Quote</button>
            </div>
          </div>
        </header>
    </div>
  );
}

export default App;
