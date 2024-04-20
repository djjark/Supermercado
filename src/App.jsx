// App.js

import React from 'react';
//import ItemList from './ItemList';
// import { addItem, updateItem } from './db.js';

const App = () => {
  const handleAddItem = async () => {
    try {
      const newItemId = await addItem('New Item');
      console.log('New item added with ID:', newItemId);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleUpdateItem = async (id, newName) => {
    try {
      const rowsAffected = await updateItem(id, newName);
      console.log('Rows affected:', rowsAffected);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div>
      <h1>My App</h1>
      <button onClick={handleAddItem}>Add Item</button>
      {/* <ItemList /> */}
    </div>
  );
};

export default App;
