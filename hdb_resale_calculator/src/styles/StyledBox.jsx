import { Box } from '@chakra-ui/react';

const StyledBox = ({ borderTopColor, children }) => (
  <Box
    p={5}
    borderRadius="lg"
    boxShadow="sm"
    w={{ md: "50%" }}
    border="1px solid transparent"
    borderTop={`3px solid ${borderTopColor}`}
    transition="transform 0.3s ease"
    _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
    mr={{ md: 4 }}
    mb={{ base: 4, md: 0 }}
  >
    {children}
  </Box>
);

export default StyledBox;


