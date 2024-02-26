import React from 'react';
import { Text, Select, Icon, VStack, Image, Center, Box } from '@chakra-ui/react';
import { FaHome, FaDollarSign } from 'react-icons/fa';
import { SearchBar } from './SearchBar';
import homeImage from '../assets/home.png';
import StyledBoxFilteredResults from '../styles/StyledBoxFilteredResults';

function FilteredResults({
  searchResults,
  selectedStreet,
  setSelectedStreet,
  averagePrice,
  streetNames,
  onSearch,
  onSearchTermChange,
  errorMessage
}) {
  // Directly filter the results 
  const filteredResults = selectedStreet
    ? searchResults.filter(item => item.street_name === selectedStreet)
    : searchResults;

  return (
    <>
      {/* Search bar component */}
      <SearchBar onSearch={onSearch} onSearchTermChange={onSearchTermChange} />

      {/* Error message */}
      {errorMessage && (
        <Center color="red.500" my={10}>
          <Box>
            <Text fontSize="xl">{errorMessage}</Text>
          </Box>
        </Center>
      )}

      {/* If there's no error message and no results, show a prompt */}
      {!errorMessage && searchResults.length === 0 && (
        <Center flexDirection="column" my={10}>
          <Image src={homeImage} boxSize="150px" />
          <Text fontSize="xl" mt={3}>Let's search for some town!</Text>
        </Center>
      )}

      {/* If there are results, show the results box */}
      {filteredResults.length > 0 && !errorMessage && (
        <StyledBoxFilteredResults>
          <VStack spacing={8}>
            {/* Displaying number of units found */}
            <Text fontSize="xl">
              <Icon as={FaHome} mr={2} />
              <Text as="span" color="orangered">{filteredResults.length}</Text> units found
            </Text>
            
            {/* Displaying average price */}
            <Text fontSize="xl">
              <Icon as={FaDollarSign} mr={2} />
              Average Price: <Text as="span" color="orangered">{new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'SGD',
                maximumFractionDigits: 0,
                currencyDisplay: 'symbol'
              }).format(averagePrice)}</Text>
            </Text>
            
            {/* Dropdown for selecting street */}
            <Select onChange={e => setSelectedStreet(e.target.value)} value={selectedStreet} placeholder="All Streets">
              {streetNames.map((street, index) => (
                <option key={index} value={street}>{street}</option>
              ))}
            </Select>
          </VStack>
        </StyledBoxFilteredResults>
      )}
    </>
  );
}

export default FilteredResults;
