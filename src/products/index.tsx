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
                setError('Error al consultar productos.');
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
                <h2>Listado de productos</h2>
                {error && <div className="error">{error}</div>}
                {
                    isLoading ? <span>Cargando productos...</span> :
                        <>
                            <span>Total: {products.length}</span>
                            <ul>
                                <li >
                                    <strong>Nombre</strong>
                                    <strong>Categoría</strong>
                                    <strong>Descripción</strong>
                                    <strong>Precio</strong>
                                    <strong>Detalle</strong>
                                </li>
                                {
                                    products.map((product) => (
                                        <li key={product.id}>
                                            <strong>{product.name}</strong>
                                            <div className="category">{product.category}</div>
                                            <div className="description">{product.description}</div>
                                            <div className="price">${product.price}</div>
                                            <button className="button"
                                                onClick={() => showProductEdition(product.id)}>
                                                Editar
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </>
                }
            </div>
        </>
    );
};

export default App;