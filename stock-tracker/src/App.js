// import React, { useState } from 'react';
// import axios from 'axios';

// function StockTracker() {
//   const [stocks, setStocks] = useState([]);
//   const [stockName, setStockName] = useState('');
//   const [buyPrice, setBuyPrice] = useState('');

//   const handleAddStock = async () => {

//     let globalQuote = null;
//     if (!stockName || !buyPrice) {
//       alert('Please enter both the stock name and buying price.');
//       return;
//     }

//     try {
//       // Replace 'YOUR_API_KEY' with your actual API key from a stock data provider

//       const response = await fetch(`https://financialmodelingprep.com/api/v3/quote-short/${stockName}?apikey=EgwnDSEOAbvPuTdU7tcjZe9dwik8fyt0`)
//       .then(response => {
//         // Check if the response is ok (status code 200–299)
//         if (!response.ok) {
//           throw new Error('Network response was not ok ' + response.statusText);
//         }
//         return response.json(); // Parse the JSON from the response
//       })
//       .then(data => {
//         globalQuote = data[0].price;

//       })
//       .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//       });
    
//         console.log(response)

//       if (!globalQuote) {
//         alert('Stock data not found. Please check the stock symbol and try again.');
//         return;
//       }

//       const currentPrice = parseFloat(globalQuote);
//       if (isNaN(currentPrice)) {
//         alert('Could not fetch a valid stock price. Please check the stock symbol.');
//         return;
//       }

//       const newStock = {
//         name: stockName.toUpperCase(),
//         buyPrice: parseFloat(buyPrice),
//         currentPrice,
//         percentGain: ((currentPrice - parseFloat(buyPrice)) / parseFloat(buyPrice)) * 100,
//       };

//       setStocks([...stocks, newStock]);
//       setStockName('');
//       setBuyPrice('');
//     } catch (error) {
//       console.error('Error fetching stock data:', error);
//       alert('Error fetching stock data. Please try again later.');
//     }
//   };

//   return (
//     <div>
//       <h1>Stock Tracker App</h1>
//       <input
//         type="text"
//         placeholder="Stock Symbol (e.g., AAPL)"
//         value={stockName}
//         onChange={(e) => setStockName(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Buying Price"
//         value={buyPrice}
//         onChange={(e) => setBuyPrice(e.target.value)}
//       />
//       <button onClick={handleAddStock}>Add Stock</button>

//       <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
//         <thead>
//           <tr>
//             <th>Stock Name</th>
//             <th>Buying Price</th>
//             <th>Current Price</th>
//             <th>Percent Gain (%)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {stocks.map((stock, index) => (
//             <tr key={index}>
//               <td>{stock.name}</td>
//               <td>${stock.buyPrice.toFixed(2)}</td>
//               <td>${stock.currentPrice.toFixed(2)}</td>
//               <td style={{ color: stock.percentGain >= 0 ? 'green' : 'red' }}>
//                 {stock.percentGain.toFixed(2)}%
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default StockTracker;

import React, { useState } from 'react';
import './StockTracker.css'; // Import CSS file for styling

function StockTracker() {
  const [stocks, setStocks] = useState([]);
  const [stockName, setStockName] = useState('');
  const [buyPrice, setBuyPrice] = useState('');

  // Function to handle adding a stock to the list
  const handleAddStock = async () => {
    if (!stockName || !buyPrice) {
      alert('Please enter both the stock name and buying price.');
      return;
    }

    let globalQuote = null;
    try {
      const response = await fetch(`https://financialmodelingprep.com/api/v3/quote-short/${stockName}?apikey=EgwnDSEOAbvPuTdU7tcjZe9dwik8fyt0`);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      globalQuote = data[0]?.price;
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }

    if (!globalQuote) {
      alert('Stock data not found. Please check the stock symbol and try again.');
      return;
    }

    const currentPrice = parseFloat(globalQuote);
    if (isNaN(currentPrice)) {
      alert('Could not fetch a valid stock price. Please check the stock symbol.');
      return;
    }

    const newStock = {
      name: stockName.toUpperCase(),
      buyPrice: parseFloat(buyPrice),
      currentPrice,
      percentGain: ((currentPrice - parseFloat(buyPrice)) / parseFloat(buyPrice)) * 100,
    };

    setStocks([...stocks, newStock]);
    setStockName('');
    setBuyPrice('');
  };

  // Function to delete a stock from the list
  const handleDeleteStock = (index) => {
    const newStocks = stocks.filter((_, i) => i !== index); // Remove the stock at the specified index
    setStocks(newStocks);
  };

  return (
    <div className="stock-tracker">
      <h1>Stock Tracker App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Stock Symbol (e.g., AAPL)"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Buying Price"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          className="input-field"
        />
        <button onClick={handleAddStock} className="add-button">
          Add Stock
        </button>
      </div>

      <table className="stock-table">
        <thead>
          <tr>
            <th>Stock Name</th>
            <th>Buying Price</th>
            <th>Current Price</th>
            <th>Percent Gain (%)</th>
            <th>Actions</th> {/* Column for delete button */}
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index}>
              <td>{stock.name}</td>
              <td>${stock.buyPrice.toFixed(2)}</td>
              <td>${stock.currentPrice.toFixed(2)}</td>
              <td style={{ color: stock.percentGain >= 0 ? 'green' : 'red' }}>
                {stock.percentGain.toFixed(2)}%
              </td>
              <td>
                <button onClick={() => handleDeleteStock(index)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockTracker;

