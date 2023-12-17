import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Inputs } from './types';

import './products_edition.css';


const ProductDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [name, setName] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/', { replace: true })
    };

    const handleDelete = () => {
        // Handle delete action
    };

    const onSubmit = (data: Inputs) => {
        setIsLoading(true);
        fetch(`http://localhost:3000/products/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            })
            .then((_) => {
                handleBack();
            })
            .catch((error) => {
                console.error('Error updating:', error);
                setError('Error al actualizar producto.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
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
                setError('Error al consultar producto.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [id]);

    return (
        <>
            <div className="product-details">
                <h2>Editar producto</h2>
                {error && <div className="error">{error}</div>}
                {
                    isLoading ? <span>Cargando producto...</span> :
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-group">
                                <label htmlFor="name">Nombre:</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder='Nombre'
                                    {...register("name", {
                                        required: { value: true, message: 'El nombre es requerido' },
                                        minLength: {
                                            value: 2,
                                            message: 'El nombre debe tener al menos 2 caracteres'
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: 'El nombre debe tener menos de 30 caracteres'
                                        },
                                    })}
                                    defaultValue={name}
                                />
                                <span className="error">{errors.name?.message}</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category">Categoría:</label>
                                <input
                                    type="text"
                                    id="category"
                                    placeholder='Categoría'
                                    {...register("category", {
                                        required: { value: true, message: 'La categoría es requerida' },
                                        minLength: {
                                            value: 4,
                                            message: 'La categoría debe tener al menos 4 caracteres'
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: 'La categoría debe tener menos de 30 caracteres'
                                        },
                                    })}
                                    defaultValue={category}
                                />
                                <span className="error">{errors.category?.message}</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Descripción:</label>
                                <input
                                    type="text"
                                    id="description"
                                    placeholder='Descripción'
                                    {...register("description", {
                                        required: { value: true, message: 'La descripción es requerida' },
                                        minLength: {
                                            value: 10,
                                            message: 'La descripción debe tener al menos 10 caracteres'
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: 'La descripción debe tener menos de 60 caracteres'
                                        },
                                    })}
                                    defaultValue={description}
                                />
                                <span className="error">{errors.description?.message}</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Precio:</label>
                                <input
                                    type="number"
                                    step="any"
                                    id="price"
                                    placeholder='Precio'
                                    {...register("price", {
                                        required: { value: true, message: 'El precio es requerido' },
                                        validate: {
                                            positiveNumber: value => value > 0 || 'El precio debe ser mayor que 0',
                                        },
                                    })}
                                    defaultValue={price}
                                />
                                <span className="error">{errors.price?.message}</span>
                            </div>

                            <div className="button-group">
                                <button className="button" onClick={() => handleBack()}>
                                    Volver al listado
                                </button>
                                <button className="button" onClick={() => handleDelete()}>
                                    Borrar
                                </button>
                                <button className="button" type="submit">
                                    Actualizar
                                </button>
                            </div>

                        </form>
                }
            </div>
        </>
    );
};


export default ProductDetailsPage;
