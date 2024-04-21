// App.js

import React from 'react';
import ProductList from './ItemList';
import { Link, Outlet } from 'react-router-dom';

const App = () => {

  return (
    <div className='text-center'>
      <h1>Supermercado</h1>
      <Link to="/add-item">
        <button>Add Item</button>
      </Link>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ProductList />
      </div>
    </div>
  );
};

export default App;
