import React, { useState } from 'react';
import {
  Box,
  Grid,
  VStack,
  Text,
  Textarea,
  Button,
} from '@chakra-ui/react';
import MortgageCalculationsTable from './MortgageCalculationsTable'; // The new component we created above
import Notes from './Notes';
import ResaleSummary from './ResaleSummary';

function Dashboard() {
  

  return (
    <Box p={5}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <VStack>
          <Text fontSize="lg" fontWeight="bold">Mortgage Calculations</Text>
          <MortgageCalculationsTable />
        </VStack>
        <VStack>
          <Text fontSize="lg" fontWeight="bold">Saved Resale Searches</Text>
          <ResaleSummary />
        </VStack>
        <VStack>
          <Text fontSize="lg" fontWeight="bold">Notes</Text>
          <Notes />
        </VStack>
      </Grid>
    </Box>
  );
}

export default Dashboard;

