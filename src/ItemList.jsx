// ItemList.js

import React, { useState, useEffect } from 'react';
import { getItems, deleteItem } from './db';

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const itemsFromDB = await getItems();
            setItems(itemsFromDB);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            await deleteItem(id);
            fetchItems();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div>
            <h1>Items</h1>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.name}
                        <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
