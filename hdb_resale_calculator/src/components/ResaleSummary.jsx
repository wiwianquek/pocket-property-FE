import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import { getSearchSummaryByUserId, deleteSearchSummary } from '../service/resalesummary';

function formatCurrency(value) {
    return `SGD ${parseFloat(value).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}

const ResaleSummary = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch saved search summaries for the user
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getSearchSummaryByUserId();
        setSummaries(data);
      } catch (error) {
        console.error('Failed to fetch summaries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle the deletion of a summary
  const handleDelete = async (summaryId) => {
    try {
      await deleteSearchSummary(summaryId);
      setSummaries(summaries.filter(summary => summary._id !== summaryId));
    } catch (error) {
      console.error('Failed to delete summary:', error);
    }
  };

  // Here you would include the method to handle saving a new summary
  // which you would trigger from another part of your UI
  const handleSave = async (newSummary) => {
    try {
      const savedSummary = await saveSearchSummary(newSummary);
      setSummaries([...summaries, savedSummary]);
    } catch (error) {
      console.error('Failed to save new summary:', error);
    }
  };

  // Helper function to format search terms
  const formatSearchTerms = (terms) => {
    return {
      town: terms.town || 'All',
      flat_type: terms.flat_type?.join(', ') || 'All',
      property_type: terms.property_type?.join(', ') || 'All',
      storey_range: terms.storey_range?.join(', ') || 'All',
    };
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <VStack spacing={4}>
      {summaries.map((summary) => {
        // Format the search terms for display
        const formattedSearchTerms = formatSearchTerms(summary.searchTerms);

        return (
          <Flex key={summary._id} align="center" justify="space-between" p={3} w="full" borderWidth="1px">
            <Box>
              <Text fontWeight="bold">Search Term: {formattedSearchTerms.town}</Text>
              <Text>Units Found: {summary.unitsFound}</Text>
              <Text>Average Price: {formatCurrency(summary.averagePrice)}</Text>
              <Text>Lease Term: {summary.averageLeaseTerm}</Text>
              <Text>Flat Type: {formattedSearchTerms.flat_type}</Text>
              <Text>Property Type: {formattedSearchTerms.property_type}</Text>
              <Text>Storey Range: {formattedSearchTerms.storey_range}</Text>
            </Box>
            <Button colorScheme="red" my={5} py={5} onClick={() => handleDelete(summary._id)}>
              Delete
            </Button>
          </Flex>
        );
      })}
    </VStack>
  );
};

export default ResaleSummary;

