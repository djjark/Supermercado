import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient'; // Import the Supabase client

function ProductList() {
    const [products, setProducts] = useState([]);
    const [newProductName, setNewProductName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data, error } = await supabase.from('supermercado').select('*').order('Nome');
            if (error) {
                throw error;
            }
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    };

    const handleAddProduct = async () => {
        if (!newProductName.trim()) return;
        try {
            const { data, error } = await supabase.from('supermercado').insert([{ Nome: newProductName }]);
            if (error) {
                throw error;
            }
            setNewProductName('');
            fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error.message);
        }
    };

    const handleUpdateProduct = async (id, column, newValue) => {
        try {
            const { data, error } = await supabase
                .from('supermercado')
                .update({ [column]: newValue })
                .eq('id', id);
            if (error) {
                throw error;
            }
            // Update the local state to reflect the changes
            const updatedProducts = products.map(product => {
                if (product.id === id) {
                    return { ...product, [column]: newValue };
                }
                return product;
            });
            setProducts(updatedProducts);
            console.log('Update successful:', data);
        } catch (error) {
            console.error('Error updating product:', error.message);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            const { data, error } = await supabase
                .from('supermercado')
                .delete()
                .eq('id', id);
            if (error) {
                throw error;
            }
            // Remove the deleted product from the local state
            const updatedProducts = products.filter(product => product.id !== id);
            setProducts(updatedProducts);
            console.log('Delete successful:', data);
        } catch (error) {
            console.error('Error deleting product:', error.message);
        }
    };


    const handleSearch = async () => {
        try {
            const { data, error } = await supabase.from('supermercado').select('*').ilike('Nome', `%${searchQuery}%`);
            if (error) {
                throw error;
            }
            setProducts(data);
        } catch (error) {
            console.error('Error searching products:', error.message);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        fetchProducts();
    };
    return (
        <div className="container">
            <div className="search">
                <input
                    type="text"
                    placeholder="Search by product name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyUp={handleSearch}
                />
                <button onClick={clearSearch}>Clear</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Pingo Doce</th>
                        <th>Lidl</th>
                        <th>Continente</th>
                        <th>Auchan</th>
                        <th>Recheio</th>
                        <th>Makro</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.Nome}</td>
                            <td>
                                <span>{item['Pingo Doce']}</span>
                                <input
                                    type="text"
                                    value={item['Pingo Doce']}
                                    onChange={e => handleUpdateProduct(item.id, 'Pingo Doce', e.target.value)}
                                />
                            </td>
                            <td>
                                <span>{item.lidl}</span>
                                <input
                                    type="text"
                                    value={item.lidl}
                                    onChange={e => handleUpdateProduct(item.id, 'lidl', e.target.value)}
                                />
                            </td>
                            <td>
                                <span>{item.continente}</span>
                                <input
                                    type="text"
                                    value={item.continente}
                                    onChange={e => handleUpdateProduct(item.id, 'continente', e.target.value)}
                                />
                            </td>
                            <td>
                                <span>{item.auchan}</span>
                                <input
                                    type="text"
                                    value={item.auchan}
                                    onChange={e => handleUpdateProduct(item.id, 'auchan', e.target.value)}
                                />
                            </td>
                            <td>
                                <span>{item.recheio}</span>
                                <input
                                    type="text"
                                    value={item.recheio}
                                    onChange={e => handleUpdateProduct(item.id, 'recheio', e.target.value)}
                                />
                            </td>
                            <td>
                                <span>{item.makro}</span>
                                <input
                                    type="text"
                                    value={item.makro}
                                    onChange={e => handleUpdateProduct(item.id, 'makro', e.target.value)}
                                />
                            </td>
                            <td>
                                <button className="btn-save" onClick={() => handleUpdateProduct(item.id)}>Save</button>
                            </td>
                            <td className="border px-4 py-2">
                                <button onClick={() => handleDeleteProduct(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;
