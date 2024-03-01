import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  VStack,
  StackDivider,
  Text,
  HStack,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import SearchBar from './SearchBar'; 
import { searchResaleData } from '../api/resaledata';
import { saveSearchSummary } from '../service/resalesummary';
import hdbImage from '../assets/hdbflats.png';

function formatCurrency(value) {
    return `SGD ${parseFloat(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

const ResaleData = () => {
  const [searchParams, setSearchParams] = useState({});
  const [searchSummary, setSearchSummary] = useState({
    unitsFound: '',
    averagePrice: '',
    averageLeaseTerm: '',
    searchTerms: {},
  });
  const [loading, setLoading] = useState(false);

  const toast = useToast(); 

 const handleSearchSubmit = async () => {
  setSearchSummary(null);  // reset to null when starting a new search
  setLoading(true); // start loading

  // display a toast indicating the search is starting
  toast({
    title: 'Searching...',
    description: 'Generating results.',
    status: 'info',
    duration: 3000,
    isClosable: true,
  });

  try {
    // make the API call to search for new data
    const data = await searchResaleData(searchParams);

    // update the search summary with the new data
    setSearchSummary({
      unitsFound: data.summary.unitsFound,
      averagePrice: formatCurrency(data.summary.averagePrice),
      averageLeaseTerm: `${data.summary.averageRemainingLeaseYears} years ${data.summary.averageRemainingLeaseExtraMonths} months`,
      searchTerms: {
        town: searchParams.search,
        flat_type: Array.isArray(data.searchTerms.flat_type) ? data.searchTerms.flat_type.join(', ') : data.searchTerms.flat_type || 'All',
        flat_model: Array.isArray(data.searchTerms.flat_model) ? data.searchTerms.flat_model.join(', ') : data.searchTerms.flat_model || 'All',
        storey_range: Array.isArray(data.searchTerms.storey_range) ? data.searchTerms.storey_range.join(', ') : data.searchTerms.storey_range || 'All',
      },
    });

    // displays a success toast after search results are fetched
    toast({
      title: 'Search Successful!',
      description: 'Successfully retrieved results.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  } catch (error) {
    console.error('Search failed:', error);
    toast({
      title: 'Search failed.',
      description: 'Unable to perform search.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }

  setLoading(false); // stop loading after search is completed or failed
};

    const handleSearchChange = (value) => {
        setSearchParams(prev => ({ ...prev, search: value }));
    };
    
    const handleFilterChange = (filterType, selectedValues) => {
    const allValues = {
        flat_type: ['1 ROOM', '2 ROOM', '3 ROOM', '4 ROOM', '5 ROOM'],
        flat_model: ['Improved', 'Standard', 'Apartment', 'Premium Apartment', 'New Generation', 'Improved-Maisonette', 'Multi Generation', 'Maisonette', 'Premium Maisonette', 'Model A-Maisonette', 'Terrace', 'Adjoined flat', 'Model A2', 'Model A', 'Type S1', 'Type S2', 'Simplified', 'Premium Apartment Loft', 'DBSS', '2-room'],
        storey_range: ['01 TO 03', '04 TO 06', '07 TO 09', '10 TO 12', '13 TO 15', '16 TO 18', '19 TO 21', '22 TO 24', '25 TO 27', '28 TO 30', '31 TO 33', '34 TO 36', '37 TO 39', '40 TO 42', '43 TO 45', '46 TO 48', '49 TO 51'],
    };
  
    let newValues;
    if (selectedValues.includes('all')) {
        // if "Select All" is checked, and it was previously not all selected, select all
        // else if "Select All" is checked, and all were previously selected, unselect all
        newValues = searchParams[filterType]?.length === allValues[filterType].length ? [] : [...allValues[filterType]];
    } else {
        // exclude the 'all' option and filter out any unselected values
        newValues = selectedValues.filter(value => value !== 'all');
    }
  
    setSearchParams(prev => ({ ...prev, [filterType]: newValues }));
};

      const handleSaveSearchSummary = async () => {
        try {
          const summaryToSave = {
            searchTerms: searchSummary.searchTerms,
            unitsFound: searchSummary.unitsFound,
            averagePrice: searchSummary.averagePrice.replace('SGD ', '').replace(/,/g, ''), // Remove formatting
            averageLeaseTerm: searchSummary.averageLeaseTerm,
          };
          await saveSearchSummary(summaryToSave);
          toast({
            title: 'Success!',
            description: 'Search summary saved.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        } catch (error) {
          toast({
            title: 'Error!',
            description: 'Failed to save search summary.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      };
      
 if (loading) {
  return (
    <Flex direction="column" align="center" justify="center" p={6} w="full">
      <Spinner size="xl" thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" />
    </Flex>
  );
}

          const clearSearch = () => {
            setSearchParams({}); 
            setSearchSummary({
              unitsFound: 0,
              averagePrice: '',
              averageLeaseTerm: '',
              searchTerms: {},
            });
          };


return (
  <>
    <VStack spacing={4} align="stretch" w="full">
      <Box
        width="full"
        h="320px"
        bgImage={`url(${hdbImage})`}
        bgPosition="center center"
        bgRepeat="no-repeat"
        bgSize="cover"
      >
      </Box>

      <Box mb={4} w="full">
        <HStack justifyContent="center" spacing={4}>
          <SearchBar onSearchChange={handleSearchChange} onSearchSubmit={handleSearchSubmit} />
          <Button colorScheme="green" onClick={handleSearchSubmit}>
            Search
          </Button>
          <Button colorScheme="gray" onClick={clearSearch}>
            Clear
          </Button>
        </HStack>
      </Box>

      <HStack justifyContent="center" spacing={4} my={4}>
        <Menu closeOnSelect={false}>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Flat Type
          </MenuButton>
              <MenuList minWidth='240px'>
                  <MenuOptionGroup 
                  value={searchParams.flat_type || []} // This should be bound to the state
                  title="Flat Type" 
                  type="checkbox" 
                  onChange={(selectedValues) => handleFilterChange('flat_type', selectedValues)}
              >
                  <MenuItemOption value="all">Select All</MenuItemOption>
                  <MenuItemOption value="1 ROOM">1 ROOM</MenuItemOption>
                  <MenuItemOption value="2 ROOM">2 ROOM</MenuItemOption>
                  <MenuItemOption value="3 ROOM">3 ROOM</MenuItemOption>   
                  <MenuItemOption value="4 ROOM">4 ROOM</MenuItemOption>
                  <MenuItemOption value="5 ROOM">5 ROOM</MenuItemOption>
                  </MenuOptionGroup>
              </MenuList>
      </Menu>

      {/* Property Type Filter */}
      <Menu closeOnSelect={false}>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Flat Model
          </MenuButton>
          <MenuList minWidth='240px'>
              <MenuOptionGroup 
                  value={searchParams.flat_model || []} 
                  title="Flat Model" 
                  type="checkbox" 
                  onChange={(selectedValues) => handleFilterChange('flat_model', selectedValues)}
              >
                  <MenuItemOption value="all">Select All</MenuItemOption>
                  <MenuItemOption value="Improved">Improved</MenuItemOption>
                  <MenuItemOption value="Standard">Standard</MenuItemOption>
                  <MenuItemOption value="Apartment">Apartment</MenuItemOption>   
                  <MenuItemOption value="Premium Apartment">Premium Apartment</MenuItemOption>
                  <MenuItemOption value="New Generation">New Generation</MenuItemOption>
                  <MenuItemOption value="Improved-Maisonette">Improved-Maisonette</MenuItemOption>
                  <MenuItemOption value="Multi Generation">Multi Generation</MenuItemOption>
                  <MenuItemOption value="Maisonette">Maisonette</MenuItemOption>
                  <MenuItemOption value="Premium Maisonette">Premium Maisonette</MenuItemOption>
                  <MenuItemOption value="Model A-Maisonette">Model A-Maisonette</MenuItemOption>
                  <MenuItemOption value="Terrace">Terrace</MenuItemOption>
                  <MenuItemOption value="Adjoined flat">Adjoined flat</MenuItemOption>
                  <MenuItemOption value="Model A2">Model A2</MenuItemOption>
                  <MenuItemOption value="Model A">Model A</MenuItemOption>
                  <MenuItemOption value="Type S1">Type S1</MenuItemOption>
                  <MenuItemOption value="Type S2">Type S2</MenuItemOption>
                  <MenuItemOption value="Simplified">Simplified</MenuItemOption>
                  <MenuItemOption value="Premium Apartment Loft">Premium Apartment Loft</MenuItemOption>
                  <MenuItemOption value="DBSS">DBSS</MenuItemOption>
                  <MenuItemOption value="2-room">2-room</MenuItemOption>
              </MenuOptionGroup>
          </MenuList>
      </Menu>

      {/* Storey Range Filter */}
      <Menu closeOnSelect={false}>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
           Storey Range
      </MenuButton>
          <MenuList minWidth='240px'>
              <MenuOptionGroup 
                  value={searchParams.storey_range || []} // This should be bound to the state
                  title="Storey" 
                  type="checkbox" 
                  onChange={(selectedValues) => handleFilterChange('storey_range', selectedValues)}
              >
                  <MenuItemOption value="all">Select All</MenuItemOption>
                  <MenuItemOption value="01 TO 03">01 TO 03</MenuItemOption>
                  <MenuItemOption value="04 TO 06">04 TO 06</MenuItemOption>
                  <MenuItemOption value="07 TO 09">07 TO 09</MenuItemOption>   
                  <MenuItemOption value="10 TO 12">10 TO 12</MenuItemOption>
                  <MenuItemOption value="13 TO 15">13 TO 15</MenuItemOption>
                  <MenuItemOption value="16 TO 18">16 TO 18</MenuItemOption>
                  <MenuItemOption value="19 TO 21">19 TO 21</MenuItemOption>
                  <MenuItemOption value="22 TO 24">22 TO 24</MenuItemOption>
                  <MenuItemOption value="25 TO 27">25 TO 27</MenuItemOption>
                  <MenuItemOption value="28 TO 30">28 TO 30</MenuItemOption>
                  <MenuItemOption value="31 TO 33">31 TO 33</MenuItemOption>
                  <MenuItemOption value="34 TO 36">34 TO 36</MenuItemOption>
                  <MenuItemOption value="37 TO 39">37 TO 39</MenuItemOption>
                  <MenuItemOption value="40 TO 42">40 TO 42</MenuItemOption>
                  <MenuItemOption value="43 TO 45">43 TO 45</MenuItemOption>
                  <MenuItemOption value="46 TO 48">46 TO 48</MenuItemOption>
                  <MenuItemOption value="49 TO 51">49 TO 51</MenuItemOption>
              </MenuOptionGroup>
           </MenuList>
      </Menu>
  </HStack>

  {searchSummary !== null && (
    <HStack justifyContent="center" spacing={4} my={4}>
        {/* Search Summary */}
        <Box mt={2} p={12} borderWidth="1px" borderRadius="lg" w="full" maxW="md" mx="auto">
            <Heading size='md' mb={4}>Search Summary</Heading>
            <StackDivider borderColor="gray.200" />
            {/* Units Found */}
            <Box mt={2}>
                <Text fontWeight="bold">Units Found:</Text>
                <Text color={'teal'}>{searchSummary.unitsFound}</Text>
            </Box>
            {/* Average Price */}
            <Box mt={2}>
                <Text fontWeight="bold">Average Price:</Text>
                <Text color={'teal'}>{searchSummary.averagePrice}</Text>
            </Box>
            {/* Remaining Average Lease Term */}
            <Box mt={2}>
                <Text fontWeight="bold">Remaining Average Lease Term:</Text>
                <Text color={'teal'}>{searchSummary.averageLeaseTerm}</Text>
            </Box>
            {/* Search Terms */}
            <Box mt={2}>
            <VStack align='start'>
                <Text color={'teal'}>{searchSummary.searchTerms.search}</Text>
                {/* Render other search terms here */}
                {searchSummary.searchTerms.town && (
                  <>
                      <Text fontWeight="bold">Town:</Text>
                      <Text color={'teal'}>{searchSummary.searchTerms.town}</Text>
                  </>
                )}
                
                {searchSummary.searchTerms.flat_type && (
                    <>
                        <Text fontWeight="bold">Flat Type:</Text>
                        <Text color={'teal'}>{searchSummary.searchTerms.flat_type}</Text>
                    </>
                )}
                {searchSummary.searchTerms.flat_model && (
                    <>
                        <Text fontWeight="bold">Flat Model:</Text>
                        <Text color={'teal'}>{searchSummary.searchTerms.flat_model}</Text>
                    </>
                )}
                {searchSummary.searchTerms.storey_range && (
                    <>
                        <Text fontWeight="bold">Storey Range:</Text>
                        <Text color={'teal'}>{searchSummary.searchTerms.storey_range}</Text>
                    </>
                )}
            </VStack>
        </Box>
      </Box>
    </HStack>
  )}


      <Button colorScheme="blue" alignSelf="center" my={4} onClick={handleSaveSearchSummary}>
        Save Search
      </Button>
    </VStack>
  </>
);
};

export default ResaleData;
