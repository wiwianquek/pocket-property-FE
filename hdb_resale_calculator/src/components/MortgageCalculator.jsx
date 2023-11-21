import Airtable from 'airtable';
import React, { useState } from 'react';
import {
  Box,
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

const MortgageCalculator = () => {
  // State variables for the mortgage calculator
  const [propertyValue, setPropertyValue] = useState(500000);
  const [tenure, setTenure] = useState(30);
  const [loanPercentage, setLoanPercentage] = useState(75);
  const [interestRate, setInterestRate] = useState(4);
  const [searchName, setSearchName] = useState('');
  const [isSaveSuccessful, setIsSaveSuccessful] = useState(false);

  // Helper function to format numbers
  const formatNumber = (num) => {
    return num % 1 === 0 ? Math.round(num) : num.toFixed(2);
  };

  // Functions to calculate various mortgage parameters
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
    return loanAmount * (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments)));
  };

  // Airtable API setup
  const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
  const base = new Airtable({ apiKey }).base('appokzWANOONVHiia');

  // Function to save data to Airtable
  const saveSearchToAirtable = () => {
    const loanAmount = calculateLoanAmount();
    const downPayment = calculateDownPayment();
    const monthlyPayment = calculateMonthlyPayment();
    const cashDownPayment = calculateCashDownPayment();

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
          'Cash DownPayment': Number(cashDownPayment)
        }
      }
    ], function(err, records) {
      if (err) {
        console.error(err);
        setIsSaveSuccessful(false);
        // Optionally, display an error message to the user
        return;
      }
      setIsSaveSuccessful(true);
      records.forEach(function(record) {
        console.log(record.getId());
      });
    });
  };

  return (
    <Flex direction={{ base: "column", md: "row" }} py={5} px={2} align="flex-start">
      {/* Mortgage Calculator Box */}
      <VStack
        spacing={4}
        align="stretch"
        p={5}
        borderRadius="lg"
        borderTop="3px solid lightpink"
        boxShadow="sm"
        mr={{ md: 4 }}
        mb={{ base: 4, md: 0 }}
        w={{ md: "50%" }}
        transition="transform 0.3s ease"
        _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
      >
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
          <FormLabel>Input a title if you want to save the search</FormLabel>
          <Input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={saveSearchToAirtable}>
          Save Search
        </Button>
        {isSaveSuccessful && <Text color="green.500">Save Successful!</Text>}
      </VStack>

      {/* Mortgage Summary Box */}
      <Box
        p={5}
        borderRadius="lg"
        boxShadow="sm"
        w={{ md: "50%" }}
        border="1px solid transparent"
        borderTop="3px solid orangered"
        transition="transform 0.3s ease"
        _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
      >
        <Heading as="h3" size="md" mb={4}>Your Mortgage Summary</Heading>
        <Divider my={4} />
        <VStack align="stretch" spacing={4}>
          {/* Display calculated mortgage parameters */}
          <Text fontSize="lg" fontWeight="bold">Your Estimated Monthly Repayment</Text>
          <Text fontSize="2xl" color="orange.400">${formatNumber(calculateMonthlyPayment())} / month</Text>
          <Text fontSize="lg" fontWeight="bold">Loan amount (75%)</Text>
          <Text fontSize="xl" color="gray.600">${formatNumber(calculateLoanAmount())}</Text>
          <Text fontSize="lg" fontWeight="bold">Downpayment (20%)</Text>
          <Text fontSize="xl" color="gray.600">${formatNumber(calculateDownPayment())}</Text>
          <Text fontSize="lg" fontWeight="bold">Cash Downpayment (5%)</Text>
          <Text fontSize="xl" color="gray.600">${formatNumber(calculateCashDownPayment())}</Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default MortgageCalculator;
