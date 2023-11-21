import React from 'react';
import { Box, Flex, Input, Button, Link, useColorModeValue, Heading, Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NavigationBar = () => {
  const bg = useColorModeValue('white', 'gray.800'); // Adjust color based on theme

  return (
    <Box bg={bg} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            Navigation Center
          </Heading>
        </Box>

        <Flex alignItems={'center'}>
          <Link as={RouterLink} to="/" px={2}>
            HDB Resale Data
          </Link>
          <Link as={RouterLink} to="/mortgage-calculator" px={2}>
            Mortgage Calculator
          </Link>
          <Link as={RouterLink} to="/history" px={2}>
            Search History
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavigationBar;
