import React, { useState } from 'react';
import {
  Box,
  Grid,
  VStack,
  Text,
} from '@chakra-ui/react';
import Notes from './Notes';
import ResaleSummary from './ResaleSummary';

function Dashboard() {
  

  return (
    <Box p={5}>
      <Grid templateColumns="repeat(2, 1fr)">
        <VStack>
          <Text fontSize="lg" fontWeight="bold">Saved Resale Searches</Text>
          <ResaleSummary />
        </VStack>
        <VStack>
          <Text fontSize="lg" fontWeight="bold"></Text>
          <Notes />
        </VStack>
      </Grid>
    </Box>
  );
}

export default Dashboard;

