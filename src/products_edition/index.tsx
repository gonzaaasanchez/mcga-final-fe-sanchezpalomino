import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './products_edition.css';


const ProductDetailsPage: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const handleDelete = () => {
        // Handle delete action
    };

    const handleSave = () => {
        // Handle save action
    };

    useEffect(() => {
        fetch('http://localhost:3000/products/657dce01b4a468f94ac0771f')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((response) => {
                setName(response.data.name || '');
                setCategory(response.data.category || '');
                setDescription(response.data.description || '');
                setPrice(response.data.price || 0);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setError('Error fetching product. Please try again.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, ['']);

    return (
        <>
            <div className="product-details">
                <h2>Edit Product</h2>
                {error && <div className="error">{error}</div>}
                {
                    isLoading ? "Loading product..." : <form>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="category">Category:</label>
                            <input
                                type="text"
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price:</label>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </div>

                        <div className="button-group">
                            <button className="button" onClick={handleBack}>
                                Back
                            </button>
                            <button className="button" onClick={handleDelete}>
                                Delete
                            </button>
                            <button className="button" onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    </form>
                }

            </div>
        </>

    );
};


export default ProductDetailsPage;
