import React, { useState } from 'react';
import { Box, Flex, Grid, GridItem, Input, Button, FormControl, FormLabel, Heading, useToast } from '@chakra-ui/react';
import pocketPropertyImage from '../assets/hdbhome.png'; // Make sure this path is correct
import { signUp } from '../service/users'; // Make sure to import the signUp function
import { hashData } from '../util/security'; // Importing hashData function from your utilities
import { Link } from 'react-router-dom';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
  });

  const toast = useToast(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // hash the password here before sending to the backend
    const { hash, salt, iterations } = hashData(formData.password);

    // create the user object with hashed password, salt, and iterations
    const userToCreate = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      username: formData.username,
      email: formData.email,
      password: hash, // use the hashed password here
      salt: salt, // include the generated salt
      iterations: iterations, // include the generated iterations
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
    } catch (error) {
      toast({
        title: 'Error.',
        description: 'Unable to create account. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Grid
      h="100vh"
      templateColumns={{ md: "1.5fr 1fr" }} // Split into two columns on medium screens and above
      templateRows="1fr"
    >
      <GridItem
        bgImage={`url(${pocketPropertyImage})`}
        bgSize="cover"
        bgPosition="center"
      />
      <GridItem>
        <Flex
          align="center"
          justify="center"
          p={{ base: 4, md: 8, lg: 12 }}
        >
          <Box
            p={3}
            mt={{ base: "50%", md: "10%" }}
            borderRadius="md"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
            border="1px solid transparent"
            bg="white"
            maxW="md"
            w="full"
            zIndex="docked"
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
            <Button
              as={Link} 
              to="/login" 
              colorScheme="blue"
              variant="link" 
              mt="4"
              >
              Have an account? Login here.
              </Button>
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
}






