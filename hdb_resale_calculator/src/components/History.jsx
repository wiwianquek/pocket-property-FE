import React from 'react';
import SearchRecords from './SearchRecords';
import { Box } from '@chakra-ui/react';

function History({ history }) {
  return (
    <Box>
      <SearchRecords history={history} />
    </Box>
  );
}

export default History;
