import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from './util/security';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import {
  ChakraProvider,
  Flex,
  HStack,
  Heading,
  Button,
  Link as ChakraLink,
} from '@chakra-ui/react';
import LoginPage from './components/LoginPage'; 
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/Dashboard';
import ResaleData from './components/ResaleData';
import ResaleSummary from './components/ResaleSummary';
import { logoutUser } from './service/users';

function PrivateRoute({ children }) {
  const token = getToken(); // get the token from local storage
  return token ? children : <Navigate to="/login" />;
}

function Layout() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/signup' && location.pathname !== '/login' && (
        <Flex as="header" bg="white" w="full" justify="space-between" p={4} align="center" boxShadow="sm">
          <Heading as="h1" size="lg" ml={8}>
            Pocket Property
          </Heading>
          <HStack as="nav" spacing={4}>
            <ChakraLink as={Link} to="/" px={2} py={1} _hover={{ color: 'blue.500' }}>
              My Dashboard
            </ChakraLink>
            <ChakraLink as={Link} to="/resaledata" px={2} py={1} _hover={{ color: 'blue.500' }}>
              Search HDB Resale Data
            </ChakraLink>
            <Button as={Link} to="#" colorScheme="blue" size="sm" onClick={logoutUser}>
              Log Out
            </Button>
          </HStack>
        </Flex>
      )}
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/resalesummary"
          element={
            <PrivateRoute>
              <ResaleSummary />
            </PrivateRoute>
          }
        />
        <Route
          path="/resaledata"
          element={
            <PrivateRoute>
              <ResaleData />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  
  return (
    <ChakraProvider>
      <Router>
        <Layout />
      </Router>
    </ChakraProvider>
  );
}

export default App;


