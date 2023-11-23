import { Box } from '@chakra-ui/react';

const StyledBoxHistory = ({ borderTopColor, children }) => (
    <Box
        bg="white"
        p={5}
        m={2}
        borderRadius="md"
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
        border="1px solid transparent"
        borderTop={`3px solid ${borderTopColor}`} // Utilizing the borderTopColor prop
        w="full"
        _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
        transition="transform 0.3s ease"
    >
        {children} {/* Render children inside the Box */}
    </Box>
  );
  
export default StyledBoxHistory;
