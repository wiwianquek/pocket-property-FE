import React from 'react';
import SearchRecords from './SearchRecords';
import { Box } from '@chakra-ui/react';

function History({ history, onDeleteRecord }) {
  return (
    <Box>
      <SearchRecords history={history} onDeleteRecord={onDeleteRecord} />
    </Box>
  );
}

export default History;

