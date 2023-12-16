import React, { useState, useEffect } from 'react';
import './products.css';
import { Product } from './types';

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                const transformedProducts: Product[] = data.data.map((product: any) => ({
                    ...product,
                    id: product._id
                }));
                setProducts(transformedProducts);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setError('Error fetching products. Please try again.');
            });
    }, []);

    return (
        <>
            <div className="app">
                <h1>Product List</h1>
                {error && <div className="error">{error}</div>}
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <strong>{product.name}</strong>
                            <div className="description">{product.description}</div>
                            <div className="category">{product.category}</div>
                            <div className="price">${product.price}</div>
                            <div className="button-container">
                                <button className="button">Show Details</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default App;