import React, { useState } from 'react';
import { Box, Flex, Grid, GridItem, Input, Button, FormControl, FormLabel, Heading, useToast, Spinner } from '@chakra-ui/react';
import { getLoginDetails, loginUser } from '../service/users'; 
import { useNavigate } from 'react-router-dom';
import { hashDataWithSaltRounds, storeToken } from '../util/security'; 
import { Link } from 'react-router-dom';
import pocketPropertyImage from '../assets/hdbhome.png';
  
export default function LoginPage() {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
    const [loading, setLoading] = useState(false); // Add this line
  
    const toast = useToast();
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
      
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true); // Set loading to true
      try {
        const loginDetails = await getLoginDetails(formData.email);
        const hashedPassword = hashDataWithSaltRounds(
          formData.password,
          loginDetails.salt,
          loginDetails.iterations
        );
  
        const token = await loginUser({ email: formData.email, password: hashedPassword });
        storeToken(token); 
        toast({
          title: 'Login successful.',
          description: "You're now logged in!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/');
      } catch (error) {
        console.error(error);
        toast({
          title: 'Login Failed.',
          description: 'The login details are incorrect.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false); // Set loading to false regardless of the outcome
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
              mt={{ base: "50%", md: "30%" }}
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
                  isLoading={loading} // Add this line
                  loadingText="Logging in" // Add this line
                  spinner={<Spinner size="sm" />} // Optional: Customize the spinner
                  disabled={loading} // Add this line
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
        </GridItem>
      </Grid>
    );
}



