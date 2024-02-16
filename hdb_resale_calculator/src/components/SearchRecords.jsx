import React from 'react';
import { Box, Grid, Text, VStack, Button, useToast } from '@chakra-ui/react';
import StyledBoxHistory from '../styles/StyledBoxHistory';
import useAirtable from '../hooks/useAirtable';

function SearchRecords({ history, onDeleteRecord, onSaveToAirtable }) { 
  const toast = useToast();
  const { saveToAirtable } = useAirtable(import.meta.env.VITE_AIRTABLE_API_KEY, 'appokzWANOONVHiia', 'search_history');

  const handleSaveToAirtable = async (record) => {
    const recordData = {
      fields: {
        "Search Term": record["Search Term"],
        "Units Found": record["Results Found"],
        "Average Price": record["Average Price"],
      }
    };
  
    try {
      await saveToAirtable(recordData); // Call the save function with the correct data structure
      toast({
        title: "Save Successful",
        description: "Your search has been saved to Airtable.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error saving to Airtable:', error);
      toast({
        title: "Save Failed",
        description: "There was a problem saving your search to Airtable.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  

  return (
    <VStack spacing={4} align="center">
      {history.map((record, index) => (
        <StyledBoxHistory key={index} borderTopColor="orangered">
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
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
            <Box display="flex" justifyContent="flex-end" alignItems="center">
              <Button colorScheme="red" size="sm" onClick={() => onDeleteRecord(index)}>Delete</Button>
              <Button colorScheme="green" size="sm" ml={2} onClick={() => handleSaveToAirtable(record)}>Save Search</Button>
            </Box>
          </Grid>
        </StyledBoxHistory>
      ))}
    </VStack>
  );
}

export default SearchRecords;


