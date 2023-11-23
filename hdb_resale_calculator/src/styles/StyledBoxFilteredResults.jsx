import { Box } from '@chakra-ui/react';

const StyledBoxFilteredResults = ({ borderTopColor, children }) => (
    <Box
          bg="beige"
          p={8}
          w="50%"
          mx="auto"
          my={5}
          display="flex"
          flexDirection="column"
          alignItems="center"
          borderRadius="md"
          boxShadow="md"
          color="darkslategrey"
    >
        {children} {/* Render children inside the Box */}
    </Box>
  );
  
export default StyledBoxFilteredResults;
