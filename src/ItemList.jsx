import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient'; // Import the Supabase client


function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log(supabase)
        async function fetchProducts() {
            const { data, error } = await supabase.from('supermercado').select('*');
            if (error) {
                console.error('Error fetching products:', error.message);
                return;
            }
            console.log("data")
            console.log(data)
            setProducts(data);
        }

        fetchProducts();
    }, []);


    return (
        <div>
            <h2>Supermarket Data</h2>
            <table>
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
                    </tr>
                </thead>
                <tbody>
                    {products.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.Nome}</td>
                            <td>{item['Pingo Doce']}</td>
                            <td>{item.lidl}</td>
                            <td>{item.continente}</td>
                            <td>{item.auchan}</td>
                            <td>{item.recheio}</td>
                            <td>{item.makro}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;