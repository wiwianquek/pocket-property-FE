import React, { useState } from 'react';
import {
  Box,
  Grid,
  VStack,
  Text,
  Textarea,
  Button,
} from '@chakra-ui/react';
import SearchRecords from './searchrecords'; // Your existing component
import MortgageCalculationsTable from './MortgageCalculationsTable'; // The new component we created above
import Notes from './Notes';

function Dashboard() {
  const [savedSearches, setSavedSearches] = useState([
    {
      "Search Term": "tampines",
      "Results Found": "11049",
      "Average Price": "SGD 515,716",
    },
    {
      "Search Term": "woodlands",
      "Results Found": "11714",
      "Average Price": "SGD 438,235",
    },
    // ... more dummy data
  ]);
  const [notes, setNotes] = useState('');

  // // ... handle note change and save
  // const handleNoteChange = (event) => {
  //   setNotes(event.target.value);
  // };

  // const handleSaveNote = () => {
  //   // Save the note to MongoDB
  // };

  // // ... rest of your component logic

  return (
    <Box p={5}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <VStack>
          <Text fontSize="lg" fontWeight="bold">Mortgage Calculations</Text>
          <MortgageCalculationsTable />
        </VStack>
        <VStack>
          <Text fontSize="lg" fontWeight="bold">Saved Searches</Text>
          <SearchRecords history={savedSearches} onDeleteRecord={() => {}} />
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

