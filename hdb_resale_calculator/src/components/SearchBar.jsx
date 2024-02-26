import React, { useState, useEffect } from 'react';
import { Box, Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = ({ onSearchChange, onSearchSubmit }) => {
    const [searchValue, setSearchValue] = useState('');
  
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        onSearchSubmit(); // Call onSearchSubmit only when Enter is pressed
      }
    };
  
    const handleChange = (event) => {
      const value = event.target.value;
      setSearchValue(value); // Update the local state
      onSearchChange(value); // Update the parent component's state
    };
  
    return (
      <Box display="flex" justifyContent="center" my={5}>
         <InputGroup w="lg">
                <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={SearchIcon} color="gray.300" />}
                />
          <Input
            type="text"
            placeholder="Type a town or street name..."
            value={searchValue}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
        </InputGroup>
      </Box>
    );
  };
  
  export default SearchBar;
  