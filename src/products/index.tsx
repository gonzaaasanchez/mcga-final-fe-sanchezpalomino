import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './products.css';
import { Product } from './types';

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((response) => {
                const transformedProducts: Product[] = response.data.map((product: any) => ({
                    ...product,
                    id: product._id
                }));
                setProducts(transformedProducts);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setError('Error fetching products. Please try again.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, []);

    const showProductEdition = (productId: string) => {
        navigate(`/product/${productId}`);
    };

    return (
        <>
            <div className="app">
                <h1>Product List</h1>
                {error && <div className="error">{error}</div>}
                <ul>
                    <li >
                        <strong>Name</strong>
                        <strong>Description</strong>
                        <strong>Category</strong>
                        <strong>Price</strong>
                        <strong>Detail</strong>
                    </li>
                    {
                        isLoading ? "Loading products..." : products.map((product) => (
                            <li key={product.id}>
                                <strong>{product.name}</strong>
                                <div className="description">{product.description}</div>
                                <div className="category">{product.category}</div>
                                <div className="price">${product.price}</div>
                                <div className="button-container">
                                    <button className="button"
                                        onClick={() => showProductEdition(product.id)}>
                                        Show Edition
                                    </button>
                                </div>
                            </li>
                        ))
                    }

                </ul>
            </div>
        </>
    );
};

export default App;