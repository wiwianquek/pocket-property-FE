import React, { useState } from 'react';
import { Box, Flex, Input, Button, FormControl, FormLabel, Heading, useToast } from '@chakra-ui/react';
import pocketPropertyImage from '../assets/pocketproperty.png'; // Make sure this path is correct
import { signUp } from '../service/users'; // Make sure to import the signUp function
import { hashData } from '../util/security'; // Importing hashData function from your utilities

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    // No need to include salt and iterations in state if they're generated during form submission
  });

  const toast = useToast(); // Initialize the toast function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Hash the password here before sending to the backend
    const { hash, salt, iterations } = hashData(formData.password);

    // Create the user object with hashed password, salt, and iterations
    const userToCreate = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      username: formData.username,
      email: formData.email,
      password: hash, // Use the hashed password here
      salt: salt, // Include the generated salt
      iterations: iterations, // Include the generated iterations
    };

    try {
      await signUp(userToCreate);
      toast({
        title: 'Account created.',
        description: "Welcome to Pocket Property!",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Further actions on success, like redirecting to a login page
    } catch (error) {
      toast({
        title: 'Error.',
        description: 'Unable to create account. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      // Further error handling
    }
  };

  return (
    <Flex
      minH="100vh"
      w="full"
      align="center"
      justify="flex-end" // Change from "center" to "flex-end" to lean towards the right
      bgImage={`url(${pocketPropertyImage})`}
      bgSize="212vh"
      bgPosition="center"
      position="relative"
      pr={{ base: 4, md: 8, lg: 12 }} // Add padding to the right to not stick to the edge
    >
        <Box
          p={8}
          borderRadius="md"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
          border="1px solid transparent"
          bg="white"
          maxW="md" // Increase the maximum width here
          width="full" // Make sure it takes the full width of the maxW
          zIndex="docked"
          mr="20"
          _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
          transition="transform 0.3s ease"
        >
          
          <form onSubmit={handleSubmit}>
            <Heading as="h2" size="xl" mb="6" textAlign="center">Sign Up</Heading>
            <FormControl mb="4">
              <FormLabel htmlFor="First Name">First Name</FormLabel>
              <Input
                id="first_name"
                type="text"
                name="first_name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel htmlFor="Last Name">Last Name</FormLabel>
              <Input
                id="last_name"
                type="text"
                name="last_name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </FormControl>
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
              Sign Up
            </Button>
          </form>
        </Box>
    </Flex>
  );
}
