import React, { useState } from 'react';
import { Box, Flex, Input, Button, FormControl, FormLabel, Heading, useToast } from '@chakra-ui/react';
import { getLoginDetails, loginUser } from '../service/users'; // Updated import
import { useNavigate } from 'react-router-dom';
import { hashDataWithSaltRounds, storeToken } from '../util/security'; // Updated import
import { Link } from 'react-router-dom';
import pocketPropertyImage from '../assets/pocketproperty.png';
  
export default function LoginPage() {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
    const toast = useToast();
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
      
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Get the salt and iterations from the backend for the user's email
      try {
        const loginDetails = await getLoginDetails(formData.email);
        const hashedPassword = hashDataWithSaltRounds(
          formData.password,
          loginDetails.salt,
          loginDetails.iterations
        );
  
        // Attempt to log in with the hashed password
        const token = await loginUser({ email: formData.email, password: hashedPassword });
        storeToken(token); // Store the token
        toast({
          title: 'Login successful.',
          description: "You're now logged in!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/'); // Navigate to the dashboard
      } catch (error) {
        console.error(error);
        toast({
          title: 'Login Failed.',
          description: 'The login details are incorrect.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };
  
  return (
    <Flex
      minH="100vh"
      w="full"
      align="center"
      justify="flex-end"
      bgImage={`url(${pocketPropertyImage})`}
      bgSize="212vh"
      bgPosition="center"
      position="relative"
      pr={{ base: 4, md: 8, lg: 12 }}
    >
      <Box
        p={8}
        borderRadius="md"
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
        border="1px solid transparent"
        bg="white"
        maxW="md"
        width="full"
        zIndex="docked"
        mr="20"
        _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
        transition="transform 0.3s ease"
      >
        <form onSubmit={handleSubmit}>
          <Heading as="h2" size="xl" mb="6" textAlign="center">Log In</Heading>
          <FormControl mb="4">
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            mt="4"
            w="full"
          >
            Log In
          </Button>
        </form>
        <Button
            as={Link} // This makes the button act as a router link
            to="/signup" // Path to the signup page
            colorScheme="blue"
            variant="link" // Make it look like a link
            mt="4"
            >
            Don't have an account? Sign up here.
            </Button>
      </Box>
    </Flex>
  );
}


  