import React from 'react';
import { Box, Grid, Text, VStack } from '@chakra-ui/react';
import StyledBoxHistory from '../styles/StyledBoxHistory';

function SearchRecords({ history }) {
  return (
    <VStack spacing={4} align="center">
      {history.map((record, index) => ( 
        <StyledBoxHistory key={index} borderTopColor="orangered">
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <Box>
              <Text fontWeight="bold">Search Term:</Text>
              <Text color="gray.600">{record["Search Term"]}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Units Found:</Text>
              <Text color="gray.600">{record["Results Found"]}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Average Price:</Text>
              <Text color="gray.600">{record["Average Price"]}</Text>
            </Box>
          </Grid>
        </StyledBoxHistory>
      ))}
    </VStack>
    </VStack>
  );
}

export default SearchRecords;



