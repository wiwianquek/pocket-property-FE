import React, { useState } from 'react';
import './MortgageCalculator.css';
import Airtable from 'airtable';

const MortgageCalculator = () => {
  const [propertyValue, setPropertyValue] = useState(500000);
  const [tenure, setTenure] = useState(30);
  const [loanPercentage, setLoanPercentage] = useState(75);
  const [interestRate, setInterestRate] = useState(4);
  const [searchName, setSearchName] = useState('');

  const calculateLoanAmount = () => {
    return (propertyValue * loanPercentage) / 100;
  };

  const calculateDownPayment = () => {
    return propertyValue * 0.2;
  };

  const calculateCashDownPayment = () => {
    return propertyValue * 0.05;
  };

  const calculateMonthlyPayment = () => {
    const loanAmount = calculateLoanAmount();
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = tenure * 12;
    const monthlyPayment =
      loanAmount *
      (monthlyInterestRate /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments)));
    return monthlyPayment;
  };
  
    const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
    const base = new Airtable({ apiKey: apiKey }).base('appokzWANOONVHiia');
    
    const saveSearchToAirtable = () => {
    base('calculator').create([
      {
        fields: {
          'Saved Title': searchName,
          'Property Value': Number(propertyValue), 
          'Tenure': Number(tenure), 
          'Loan Percentage': Number(loanPercentage), 
          'Interest Rate': Number(interestRate), 
          'Monthly Payment': Number(monthlyPayment), 
          'DownPayment': Number(downPayment), 
          'Cash DownPayment': Number(cashDownPayment), 
        }
      }
    ], function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function(record) {
        console.log(record.getId());
      });
    });
  };

  const loanAmount = calculateLoanAmount();
  const downPayment = calculateDownPayment();
  const monthlyPayment = calculateMonthlyPayment();
  const cashDownPayment = calculateCashDownPayment();

  return (
    <div className="mortgage-calculator">
      <h2>Mortgage Calculator</h2>
      <div className="input-group">
        <label>
          Property value:
          <input
            type="number"
            value={propertyValue}
            onChange={(e) => setPropertyValue(e.target.value)}
            className="property-value"
          />
        </label>
      </div>
      <div className="input-group">
        <label>
          Tenure (years):
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            className="tenure-input"
          />
        </label>
      </div>
      <div className="input-group">
        <label>
          Loan (%):
          <input
            type="number"
            value={loanPercentage}
            onChange={(e) => setLoanPercentage(e.target.value)}
            className="loan-input"
          />
        </label>
      </div>
      <div className="input-group">
        <label>
          Interest rate (%):
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="interest-rate-input"
          />
        </label>
      </div >
      <div className="input-group">
        <label>
          Input a title if you want to save the search
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="search-name-input"
          />
            </label>
        </div>
      <button onClick={saveSearchToAirtable} className="save-search-btn">
        Save Search
      </button>
      <div className="mortgage-summary">
        <h3>Your Mortgage Summary</h3>
        <div className="monthly-repayment">
          <p>Your Estimated Monthly Repayment</p>
          <div className="amount">${monthlyPayment.toFixed(2)} / month</div>
        </div>
        <div className="loan-breakdown">
          <div className="loan-amount">
            <p>Loan amount (75%)</p>
            <div className="amount">${loanAmount.toFixed(2)}</div>
          </div>
          <div className="downpayment">
            <p>Downpayment (20%)</p>
            <div className="amount">${downPayment.toFixed(2)}</div>
          </div>
        </div>
        <div className="cashdownpayment">
            <p>Cash Downpayment (5%)</p>
            <div className="amount">${cashDownPayment.toFixed(2)}</div>
          </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
