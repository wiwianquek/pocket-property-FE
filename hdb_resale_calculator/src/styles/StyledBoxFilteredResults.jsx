import { Box } from '@chakra-ui/react';

const StyledBoxFilteredResults = ({ children }) => (
    <Box
        bg="white"
        p={5}
        my={5}
        mx="auto" // Centers the box
        borderRadius="md"
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
        borderTop="3px solid var(--chakra-colors-blue-400)"
        w="full" // Takes full width of the container
        maxW="xl" // Maximum width
        _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
        transition="transform 0.3s ease"
    >
        {children} {/* Render children inside the Box */}
    </Box>
);

export default StyledBoxFilteredResults;
