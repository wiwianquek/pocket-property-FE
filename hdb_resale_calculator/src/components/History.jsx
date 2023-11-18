import React from 'react';
import SearchRecords from './SearchRecords';

function History({ history }) {
  return (
    <div>
      <SearchRecords history={history} />
    </div>
  );
}

export default History;
