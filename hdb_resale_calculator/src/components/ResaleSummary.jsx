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

    // fetch saved search summaries for the user
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

  // handle the deletion of a summary
  const handleDelete = async (summaryId) => {
    try {
      await deleteSearchSummary(summaryId);
      setSummaries(summaries.filter(summary => summary._id !== summaryId));
    } catch (error) {
      console.error('Failed to delete summary:', error);
    }
  };

  // helper function to format search terms
  const formatSearchTerms = (terms) => {
    return {
      town: terms?.town || 'All', // Access the 'search' key instead of 'town'
      flat_type: terms?.flat_type?.join(', ') || 'All',
      flat_model: terms?.flat_model?.join(', ') || 'All',
      storey_range: terms?.storey_range?.join(', ') || 'All',
    };
  };

  function generatePropertyGuruUrl(searchTerm, flatTypes) {
    const baseUrl = 'https://www.propertyguru.com.sg/property-for-sale';
    const searchParams = new URLSearchParams({
      'market': 'residential',
      'freetext': searchTerm,
      'listing_type': 'sale',
      'property_type': 'H', // Assuming 'H' is for HDB
      'search': 'true'
    });
  
    // define property type codes for each room type
    const propertyTypeCodes = {
      '1 ROOM': ['1R'],
      '2 ROOM': ['2A', '2I', '2S'],
      '3 ROOM': ['3A', '3NG', '3Am', '3NGm', '3I', '3Im', '3S', '3STD', '3PA'],
      '4 ROOM': ['4A', '4NG', '4PA', '4S', '4I', '4STD'],
      '5 ROOM': ['5A', '5I', '5PA', '5S', '6J', 'EA', 'EM', 'MG', 'TE'],
    };
  
    // add 'beds[]' and 'property_type_code[]' parameters
    flatTypes.split(',').forEach(flatType => {
      const trimmedFlatType = flatType.trim();
      const codes = propertyTypeCodes[trimmedFlatType];
      if (codes) {
        codes.forEach(code => {
          searchParams.append('property_type_code[]', code);
        });
        // assuming the number of beds is the first digit in the flat type string
        const beds = trimmedFlatType[0];
        if (beds) {
          searchParams.append('beds[]', beds);
        }
      }
    });
  
    return `${baseUrl}?${searchParams.toString()}`;
  }

  function generateNineNineCoUrl(searchTerm, flatTypes) {
    const baseUrl = 'https://www.99.co/singapore/sale';
    const searchParams = new URLSearchParams({
      'autocom': 'true',
      'main_category': 'hdb',
      'name': searchTerm,
      'show_nearby': 'true'
    });
  
    // map flat types to 99.co's room parameters
    const roomMapping = {
      '1 ROOM': '1',
      '2 ROOM': '2',
      '3 ROOM': '3',
      '4 ROOM': '4',
      '5 ROOM': '5',
    };
  
    // add 'rooms' parameter based on the flatTypes
    let rooms = flatTypes.split(',').map(flatType => roomMapping[flatType.trim()]).filter(Boolean);
    if (rooms.length > 0) {
      searchParams.append('rooms', rooms.join(','));
    }
  
    return `${baseUrl}?${searchParams.toString()}`;
  }
  
  
  if (loading) {
    return <Text>Loading...</Text>;
  }

  // check if summaries are not null or undefined before rendering
  if (!summaries) {
    return <Text>No data found.</Text>;
  }

    return (
      <Box maxW="840px" maxH="480px" overflowX="auto">
        <TableContainer>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Saved Searches</Th>
                        <Th>Units Found</Th>
                        <Th>Average Price</Th>
                        <Th>Average Lease Term</Th>
                        <Th>Flat Type</Th>
                        <Th>Flat Model</Th>
                        <Th>Storey Range</Th>
                        <Th>Action</Th>
                        <Th>Search Similar Properties</Th>
                        <Th>Search Similar Properties</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                      {summaries.map((summary) => {
                        const formattedSearchTerms = formatSearchTerms(summary.searchTerms);
                        const propertyGuruUrl = generatePropertyGuruUrl(formattedSearchTerms.town, formattedSearchTerms.flat_type);
                        const nineNineCoUrl = generateNineNineCoUrl(formattedSearchTerms.town, formattedSearchTerms.flat_type);
            
                        return (
                          <Tr key={summary._id}>
                                <Td color={'teal'}>{formattedSearchTerms.town}</Td>
                                <Td>{summary.unitsFound}</Td>
                                <Td color={'teal'}>{formatCurrency(summary.averagePrice)}</Td>
                                <Td>{summary.averageLeaseTerm}</Td>
                                <Td>{formattedSearchTerms.flat_type}</Td>
                                <Td>{formattedSearchTerms.flat_model}</Td>
                                <Td>{formattedSearchTerms.storey_range}</Td>
                                <Td>
                                    <Button colorScheme="red" onClick={() => handleDelete(summary._id)}>
                                        Delete
                                    </Button>
                                </Td>
                                <Td>
                                  <Button
                                    colorScheme="blue"
                                    onClick={() => window.open(propertyGuruUrl, '_blank')}
                                  >
                                    Search on PropertyGuru
                                  </Button>
                                </Td>
                                <Td>
                                  <Button
                                    colorScheme="blue"
                                    onClick={() => window.open(nineNineCoUrl, '_blank')}
                                  >
                                    Search on 99.co
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



