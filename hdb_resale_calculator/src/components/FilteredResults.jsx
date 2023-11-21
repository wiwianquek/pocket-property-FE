import React, { useEffect, useState } from 'react';
import { Box, Text, Select, Icon, VStack, Image, Center } from '@chakra-ui/react';
import { FaHome, FaDollarSign } from 'react-icons/fa';
import { SearchBar } from './SearchBar';
import homeImage from '../assets/home.png'; // Adjust this path to your image location

function FilteredResults({ searchResults, selectedStreet, setSelectedStreet, averagePrice, streetNames, onSearch, onSearchTermChange }) {
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const filtered = searchResults.length > 0
      ? searchResults.filter(item => !selectedStreet || item.street_name === selectedStreet)
      : [];
    setFilteredResults(filtered);
  }, [selectedStreet, searchResults]);

  return (
    <>
      <SearchBar onSearch={onSearch} onSearchTermChange={onSearchTermChange} />
      {searchResults.length === 0 ? (
        <Center flexDirection="column" my={10}>
          <Image src={homeImage} boxSize="150px" />
          <Text fontSize="xl" mt={3}>Let's search for some town!</Text>
        </Center>
      ) : (
        <Box
          bg="beige"
          p={8}
          w="50%"
          mx="auto"
          my={5}
          display="flex"
          flexDirection="column"
          alignItems="center"
          borderRadius="md"
          boxShadow="md"
          color="darkslategrey"
        >
          {filteredResults.length > 0 && (
            <VStack spacing={8}>
              <Text fontSize="xl">
                <Icon as={FaHome} mr={2} />
                <Text as="span" color="orangered">{filteredResults.length}</Text> units found
              </Text>
              
              <Text fontSize="xl">
                <Icon as={FaDollarSign} mr={2} />
                Average Price: <Text as="span" color="orangered">{new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'SGD',
                  maximumFractionDigits: 0,
                  currencyDisplay: 'symbol'
                }).format(averagePrice)}</Text>
              </Text>
              
              <Select onChange={e => setSelectedStreet(e.target.value)} value={selectedStreet} placeholder="All Streets">
                {streetNames.map((street, index) => (
                  <option key={index} value={street}>{street}</option>
                ))}
              </Select>
            </VStack>
          )}
        </Box>
      )}
    </>
  );
}

export default FilteredResults;
