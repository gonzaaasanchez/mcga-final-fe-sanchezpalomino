import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from './types.ts';
import { baseURL } from '../utils/service.ts';
import './products.css';

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${baseURL()}/products`)
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

    const showProductCreation = () => {
        navigate(`/product/add`);
    };

    return (
        <>
            <div className='products-container'>
                <h2>Listado de productos</h2>
                {error && <div className='error'>{error}</div>}
                <div>
                    <button className='button button-success'
                        onClick={() => showProductCreation()}>
                        Agregar nuevo producto
                    </button>
                </div>

                {
                    isLoading ?
                        <div className='information'>
                            <span>Cargando productos...</span>
                        </div> :
                        <>

                            {
                                !error && (
                                    <>
                                        <div className='information'>
                                            <span >Total: {products.length}</span>
                                        </div>
                                        <table className="products-table">
                                            <thead>
                                                <tr>
                                                    <th>Nombre</th>
                                                    <th>Categoría</th>
                                                    <th>Descripción</th>
                                                    <th>Precio</th>
                                                    <th>Detalle</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.map((product) => (
                                                    <tr key={product.id}>
                                                        <td><strong>{product.name}</strong></td>
                                                        <td >{product.category}</td>
                                                        <td>{product.description}</td>
                                                        <td className='price'>${product.price}</td>
                                                        <td>
                                                            <button
                                                                className='button button-normal'
                                                                onClick={() => showProductEdition(product.id)}>
                                                                Editar
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>
                                )
                            }
                        </>
                }
            </div>
        </>
    );
};

export default App;