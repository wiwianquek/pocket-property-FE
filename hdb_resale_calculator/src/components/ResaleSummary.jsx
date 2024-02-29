import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Text, Box } from '@chakra-ui/react';
import { getSearchSummaryByUserId, deleteSearchSummary } from '../service/resalesummary';

function formatCurrency(value) {
    return `SGD ${parseFloat(value).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}

const ResaleSummary = () => {
    const [summaries, setSummaries] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch saved search summaries for the user
  useEffect(() => {
    const fetchData = async () => {
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

  // Helper function to format search terms
  const formatSearchTerms = (terms) => {
    return {
      town: terms?.town || 'All', // Access the 'search' key instead of 'town'
      flat_type: terms?.flat_type?.join(', ') || 'All',
      flat_model: terms?.flat_model?.join(', ') || 'All',
      storey_range: terms?.storey_range?.join(', ') || 'All',
    };
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  // Check if summaries are not null or undefined before rendering
  if (!summaries) {
    return <Text>No data found.</Text>;
  }

    return (
      <Box maxW="820px" overflowX="auto">
        <TableContainer>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Search Term</Th>
                        <Th>Units Found</Th>
                        <Th>Average Price</Th>
                        <Th>Average Lease Term</Th>
                        <Th>Flat Type</Th>
                        <Th>Flat Model</Th>
                        <Th>Storey Range</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {summaries.map((summary) => {
                        const formattedSearchTerms = formatSearchTerms(summary.searchTerms);
                        return (
                            <Tr key={summary._id}>
                                <Td>{formattedSearchTerms.town}</Td>
                                <Td>{summary.unitsFound}</Td>
                                <Td>{formatCurrency(summary.averagePrice)}</Td>
                                <Td>{summary.averageLeaseTerm}</Td>
                                <Td>{formattedSearchTerms.flat_type}</Td>
                                <Td>{formattedSearchTerms.flat_model}</Td>
                                <Td>{formattedSearchTerms.storey_range}</Td>
                                <Td>
                                    <Button colorScheme="red" onClick={() => handleDelete(summary._id)}>
                                        Delete
                                    </Button>
                                </Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
      </Box> 
    );
};

export default ResaleSummary;


