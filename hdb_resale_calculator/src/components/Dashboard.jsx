import React, { useState } from 'react';
import {
  Box,
  Grid,
  VStack,
  HStack,
  Text,
} from '@chakra-ui/react';
import Notes from './Notes';
import ResaleSummary from './ResaleSummary';
import hdbImage from '../assets/hdbla.png';

function Dashboard() {
  
  return (
    <VStack width="full" spacing={0}> 
      {/* Main content */}
      <Box
        width="full"
        p={5}
        pb="50vh" // add bottom padding to push the content up from the fixed image
      >
        <Grid templateColumns="repeat(2, 1fr)" position="relative" zIndex="10">
            <VStack transition="background 0.3s, box-shadow 0.3s"
            _hover={{ boxShadow: 'md' }}>
              <ResaleSummary />
            </VStack>
            <VStack>
              <Notes />
            </VStack>
          </Grid>
      </Box>
      
      {/* Fixed image container at the bottom */}
      <Box
        position="fixed"
        bottom="0"
        width="full"
        bgImage={`url(${hdbImage})`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        h="35vh" 
        zIndex="-1" // to ensure it's behind the content
      />
    </VStack>
  );
}

export default Dashboard;



