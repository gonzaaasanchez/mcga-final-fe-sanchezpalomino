
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1>Product Edition</h1>
            <p>Product ID: {id}</p>
            {/* Add more details or fetch the product data from an API */}
        </div>
    );
};

export default ProductDetailsPage;
