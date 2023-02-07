import React from 'react';

import Logout from '../Logout';

const Header = ({ setIsAdding, setIsAuthenticated, setPerPage, perPage }) => {
  return (
    <header>
      <h1>Employee Management Software</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setIsAdding(true)}>Add Employee</button>
        <Logout setIsAuthenticated={setIsAuthenticated} />
        <select onChange={e => setPerPage(e.target.options[e.target.selectedIndex].value)} style={{ maxWidth: '100px' }}>
          <option value={2} selected={perPage === 2 ? true : false}>2</option>
          <option value={10} selected={perPage === 10 ? true : false}>10</option>
          <option value={20} selected={perPage === 20 ? true : false}>20</option>
          <option value={50} selected={perPage === 50 ? true : false}>50</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
