//Custom hook logic for interacting with Airtable 
//To be used in MortgageCalculator.jsx for 'calculator' table 

import Airtable from 'airtable';

// takes apiKey, baseId, and tableName as arguments
const useAirtable = (apiKey, baseId, tableName) => {
  // Initialize Airtable only once using the apiKey and baseId
  const base = new Airtable({ apiKey }).base(baseId);

  const saveToAirtable = (data) => {
    return new Promise((resolve, reject) => {
      base(tableName).create([data], function(err, records) {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(records);
        }
      });
    });
  };

  return { saveToAirtable };
};

export default useAirtable;








