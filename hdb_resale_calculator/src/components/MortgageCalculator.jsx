import  useAirtable  from '../hooks/useAirtable'; 
import React, { useState } from 'react';
import {
  Flex,
  Input,
  FormControl,
  FormLabel,
  Button,
  Heading,
  Text,
  VStack,
  Divider
} from '@chakra-ui/react';
import StyledBox from '../styles/StyledBox'; 

const MortgageCalculator = () => {
  // State variables for the mortgage calculator
  const [propertyValue, setPropertyValue] = useState(500000);
  const [tenure, setTenure] = useState(30);
  const [loanPercentage, setLoanPercentage] = useState(75);
  const [interestRate, setInterestRate] = useState(2.6);
  const [searchName, setSearchName] = useState('');
  const [isSaveSuccessful, setIsSaveSuccessful] = useState(false);

  // Helper function to format numbers
  const formatNumber = (num) => {
    return num % 1 === 0 ? Math.round(num) : num.toFixed(2);
  };

  // Loan amount
  const calculateLoanAmount = () => {
    return (propertyValue * loanPercentage) / 100;
  };

  // For HDB Loan - 15% total downpayment 
  const calculateDownPayment = () => {
    return propertyValue * 0.15;
  };

  // For Cash Loan - 5% fixed downpayment
  const calculateCashDownPayment = () => {
    return propertyValue * 0.05;
  };

  // For estimating the monthly payment based on loan amount, interest and tenure 
  // Math.pow is a JavaScript function that raises a number to the power of another number.
  // 1 + monthlyInterestRate is the base of the exponentiation, representing the monthly growth factor of the interest.
  // -numberOfPayments is the exponent, and the negative sign indicates that we are discounting future payments to the present value.
  // When calculating the monthly payment, the term Math.pow(1 + monthlyInterestRate, -numberOfPayments) is used to figure out the present value of an annuity (in this case, the loan repayments). It calculates how much a series of future payments is worth right now.
  const calculateMonthlyPayment = () => {
    const loanAmount = calculateLoanAmount();
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = tenure * 12; //monthly repayments 
    return loanAmount * (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments)));
  };

// Airtable API setup
// Use the custom hook here
  const { isSaveSuccessful: isAirtableSaveSuccessful, saveToAirtable } = useAirtable(import.meta.env.VITE_AIRTABLE_API_KEY, 'appokzWANOONVHiia', 'calculator');

 // Function to save the data and then calls the custom hook's save function
 const handleSaveToAirtable = () => {
   const recordData = {
     'Saved Title': searchName,
     'Property Value': Number(propertyValue),
     'Tenure': Number(tenure),
     'Loan Percentage': Number(loanPercentage),
     'Interest Rate': Number(interestRate),
     'Monthly Payment': Number(calculateMonthlyPayment()),
     'DownPayment': Number(calculateDownPayment()),
     'Cash DownPayment': Number(calculateCashDownPayment())
   };
   // Call the function from the hook with the prepared data
   saveToAirtable({ fields: recordData });
 };


  return (
    <Flex direction={{ base: "column", md: "row" }} py={5} px={2} align="flex-start">
      {/* Mortgage Calculator Box */}
      <StyledBox borderTopColor="lightpink">
        <VStack spacing={4} align="stretch">
          <Heading as="h2" size="lg" mb={4}>Mortgage Calculator</Heading>
          <FormControl id="property-value" isRequired>
            <FormLabel>Property value:</FormLabel>
            <Input
              type="number"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
            />
          </FormControl>
          <FormControl id="tenure" isRequired>
            <FormLabel>Tenure (years):</FormLabel>
            <Input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
            />
          </FormControl>
          <FormControl id="loan-percentage" isRequired>
            <FormLabel>Loan (%):</FormLabel>
            <Input
              type="number"
              value={loanPercentage}
              onChange={(e) => setLoanPercentage(e.target.value)}
            />
          </FormControl>
          <FormControl id="interest-rate" isRequired>
            <FormLabel>Interest rate (%):</FormLabel>
            <Input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </FormControl>
          <FormControl id="search-name">
            <FormLabel>Optional - Input a title if you want to save the search!</FormLabel>
            <Input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="blue" onClick={handleSaveToAirtable}>
            Save Search
          </Button>
          {isSaveSuccessful && <Text color="green.500">Save Successful!</Text>}
        </VStack>
      </StyledBox>
  
      {/* Mortgage Summary Box */}
      <StyledBox borderTopColor="orangered">
          <Heading as="h3" size="md" mb={4}>Your Mortgage Summary</Heading>
          <Divider my={4} />
          <VStack align="stretch" spacing={4}>
            {/* Display calculated mortgage parameters */}
            <Text fontSize="lg" fontWeight="bold">Your Estimated Monthly Repayment</Text>
            <Text fontSize="2xl" color="orange.400">${formatNumber(calculateMonthlyPayment())} / month</Text>
            <Text fontSize="lg" fontWeight="bold">Loan amount (75%)</Text>
            <Text fontSize="xl" color="gray.600">${formatNumber(calculateLoanAmount())}</Text>
            <Text fontSize="lg" fontWeight="bold">Downpayment - HDB Loan (15%)</Text>
            <Text fontSize="xl" color="gray.600">${formatNumber(calculateDownPayment())}</Text>
            <Text fontSize="lg" fontWeight="bold">Cash Downpayment - Bank Loan (5%)</Text>
            <Text fontSize="xl" color="gray.600">${formatNumber(calculateCashDownPayment())}</Text>
          </VStack>
      </StyledBox>
    </Flex>
  );
};

export default MortgageCalculator;



