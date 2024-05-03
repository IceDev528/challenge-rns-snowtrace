import React, { useState, useEffect } from 'react';

function GasPriceTable() {
  const [gasPrices, setGasPrices] = useState([]);

  useEffect(() => {
    fetchGasPrices();
  }, []);

  const fetchGasPrices = async () => {
    try {
      const response = await fetch('http://localhost:5000/gas-prices'); // Assuming the backend API endpoint
      const data = await response.json();
      setGasPrices(data);
    } catch (error) {
      console.error('Error fetching gas prices:', error);
    }
  };

  return (
    <div>
      <h2>Gas Prices Table</h2>
      <table>
        <thead>
          <tr>
            <th style={{ width: '50%' }}>Timestamp</th>
            <th style={{ width: '50%' }}>Gas Price</th>
          </tr>
        </thead>
        <tbody>
          {gasPrices.map((gasPrice) => (
            <tr key={gasPrice.id}>
              <td>{gasPrice.timestamp}</td>
              <td>{gasPrice.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GasPriceTable;
