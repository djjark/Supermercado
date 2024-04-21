import React, { useState } from 'react';
import supabase from './supabaseClient'; // Import the Supabase client
import { useNavigate } from 'react-router-dom';

function AddItem() {
    const [productName, setProductName] = useState('');
    const [pingoDoce, setPingoDoce] = useState('');
    const [lidl, setLidl] = useState('');
    const [continente, setContinente] = useState('');
    const [auchan, setAuchan] = useState('');
    const [recheio, setRecheio] = useState('');
    const [makro, setMakro] = useState('');
    const navigate = useNavigate();
    const handleAddItem = async () => {
        if (!productName.trim()) return;
        try {
            const { data, error } = await supabase.from('supermercado').insert([{
                Nome: productName,
                'Pingo Doce': pingoDoce,
                lidl: lidl,
                continente: continente,
                auchan: auchan,
                recheio: recheio,
                makro: makro
            }]);
            if (error) {
                throw error;
            }
            // Reset fields after adding item
            setProductName('');
            setPingoDoce('');
            setLidl('');
            setContinente('');
            setAuchan('');
            setRecheio('');
            setMakro('');
            navigate('/'); // Redirect to the home page
        } catch (error) {
            console.error('Error adding item:', error.message);
        }
    };

    return (
        <div className="container">
            <h2>Add Item</h2>
            <div className="add-item-form">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Pingo Doce"
                    value={pingoDoce}
                    onChange={(e) => setPingoDoce(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Lidl"
                    value={lidl}
                    onChange={(e) => setLidl(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Continente"
                    value={continente}
                    onChange={(e) => setContinente(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Auchan"
                    value={auchan}
                    onChange={(e) => setAuchan(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Recheio"
                    value={recheio}
                    onChange={(e) => setRecheio(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Makro"
                    value={makro}
                    onChange={(e) => setMakro(e.target.value)}
                />
                <button onClick={handleAddItem}>Add Item</button>
            </div>
        </div>
    );
}

export default AddItem;
