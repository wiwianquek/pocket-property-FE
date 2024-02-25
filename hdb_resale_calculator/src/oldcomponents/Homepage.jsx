import React from 'react';
import { Box, Flex, VStack, Text, Button } from '@chakra-ui/react';
import background from '../assets/My-Chinatown-2.jpg'; 
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  let navigate = useNavigate();

  const onGetStartedClick = () => {
    navigate('/hdb-resale-data'); // Function to navigate to HDB Resale Data page
  };

  return (
    <Flex direction="column" align="center" w="full">
      <Box
        bgImage={`url(${background})`}
        bgPos="center"
        bgSize="cover"
        bgAttachment="fixed"
        h="100vh"
        w="full"
        position="relative"
      >
        <Box
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
          bg="rgba(0, 0, 0, 0.5)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <VStack
            p={10}
            spacing={4}
            color="white"
            textAlign="center"
          >
            <Text fontSize="5xl" fontWeight="bold" fontFamily="'Great Vibes', cursive">
              Time to buy HDB?
            </Text>
            <Text fontSize="2xl" fontFamily="'Open Sans', sans-serif">
              Need average metrics? Lazy to calculate?
            </Text>
            <Text fontSize="2xl" fontFamily="'Open Sans', sans-serif">
              We've got everything you need here!
            </Text>
            <Button mt={4} size="lg" colorScheme="teal" onClick={onGetStartedClick}>
              Get Started
            </Button>
          </VStack>
        </Box>

        {/* Copyright notice */}
        <Text
          position="absolute"
          bottom="2"
          w="full"
          textAlign="center"
          fontSize="xs"
          color="white"
          p="2" 
        >
          Image copyrighted from Street Art Singapore China Town The Curious Journal
        </Text>
      </Box>
    </Flex>
  );
};

export default HomePage;



