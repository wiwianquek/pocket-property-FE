import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

const MortgageCalculationsTable = () => {
  const dummyData = [
    {
      id: 1,
      monthlyRepayment: '$1,501.27',
      loanAmount: '$375,000',
      downPayment: '$75,000',
    },
    {
      id: 2, // Change the id to be unique
      monthlyRepayment: '$1,501.27',
      loanAmount: '$375,000',
      downPayment: '$75,000',
    },
    {
      id: 3, // Change the id to be unique
      monthlyRepayment: '$1,501.27',
      loanAmount: '$375,000',
      downPayment: '$75,000',
    },
    {
      id: 4, // Change the id to be unique
      monthlyRepayment: '$1,501.27',
      loanAmount: '$375,000',
      downPayment: '$75,000',
    },
    // ... make sure to use a unique id for each item
  ];
  

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Saved mortgage calculations</TableCaption>
        <Thead>
          <Tr>
            <Th>Monthly Repayment</Th>
            <Th>Loan Amount</Th>
            <Th>Down Payment</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dummyData.map((data) => (
            <Tr key={data.id}>
              <Td>{data.monthlyRepayment}</Td>
              <Td>{data.loanAmount}</Td>
              <Td>{data.downPayment}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default MortgageCalculationsTable;
