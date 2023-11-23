//Custom hook logic for interacting with Airtable 
//To be used in MortgageCalculator.jsx for 'calculator' table 

// useAirtable.js
import { useState } from 'react';
import Airtable from 'airtable';

const useAirtable = (apiKey, baseId, tableName) => {
  const [isSaveSuccessful, setIsSaveSuccessful] = useState(false);

  // Initialize Airtable only once using the apiKey and baseId
  const base = new Airtable({ apiKey }).base(baseId);

  const saveToAirtable = (data) => {
    base(tableName).create([data], function(err, records) {
      if (err) {
        console.error(err);
        setIsSaveSuccessful(false);
        return;
      }
      setIsSaveSuccessful(true);
      // Process record like logging record ID
      records.forEach((record) => console.log(record.getId()));
    });
  };

  return { isSaveSuccessful, saveToAirtable };
};

export default useAirtable;






