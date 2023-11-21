import React from 'react';
import { Box, Grid, Text, VStack } from '@chakra-ui/react';

function SearchRecords({ history }) {
  return (
    <VStack spacing={4} align="center">
      {history.map((record, index) => (
        <Box
          key={index}
          bg="white"
          p={5}
          m={2}
          borderRadius="md"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
          border="1px solid transparent"
          borderTop="3px solid orangered"
          w="full" // Adjust width as needed
          _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
          transition="transform 0.3s ease"
        >
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
        </Box>
      ))}
    </VStack>
  );
}

export default SearchRecords;
