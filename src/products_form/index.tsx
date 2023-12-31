import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Inputs } from '../utils/types.ts';
import ConfirmationDialog from '../utils/dialog/index.tsx';
import { userToken } from '../utils/auth_helper.tsx';
import { baseURL } from '../utils/service.ts';
import './products_form.css';

const ProductFormPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [loadingMessage, setLoadingMessage] = useState<string>('Cargando');
    const [isAddRoute, setIsAddRoute] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>()
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/', { replace: true })
    };

    const handleDelete = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
    }

    const handleDeleteConfirm = () => {
        setDeleteDialogOpen(false);
        setIsLoading(true);
        setLoadingMessage('Borrando producto...');
        fetch(`${baseURL()}/products/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userToken(),
                },
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
                console.error('Error deleting product: ', error);
                setError(error.toString());
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const onSubmit = (data: Inputs) => {
        setIsLoading(true);
        setLoadingMessage('Guardando producto...');
        fetch(`${baseURL()}/products${isAddRoute ? '' : `/${id}`}`,
            {
                method: isAddRoute ? 'POST' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userToken(),
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
                console.error(isAddRoute ? 'Error creating:' : 'Error updating:', error);
                setError(error.toString());
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    useEffect(() => {
        setIsAddRoute(location.pathname.endsWith('/add'));
    }, [location.pathname]);

    useEffect(() => {
        if (!isAddRoute && id) {
            setIsLoading(true);
            setLoadingMessage('Cargando producto...');
            fetch(`${baseURL()}/products/${id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((response) => {
                    setValue('name', response.data.name || '');
                    setValue('category', response.data.category || '');
                    setValue('description', response.data.description || '');
                    setValue('price', response.data.price || 0);
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                    setError(error.toString());
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }
    }, [id]);

    return (
        <>
            <div className='product-details'>
                <h2>{isAddRoute ? 'Agregar producto' : 'Editar producto'}</h2>
                {error && <div className='error'>{error}</div>}
                {
                    isLoading ? <span>{loadingMessage}</span> :
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className='form-group'>
                                {
                                    !isAddRoute && (
                                        <>
                                            <label htmlFor='pid'>ID:</label>
                                            <input
                                                type='text'
                                                id='pid'
                                                placeholder='ID'
                                                value={id}
                                                readOnly
                                            />
                                        </>
                                    )
                                }
                                <label htmlFor='name'>Nombre:</label>
                                <input
                                    type='text'
                                    id='name'
                                    placeholder='Nombre'
                                    {...register('name', {
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
                                />
                                <span className='error'>{errors.name?.message}</span>
                            </div>

                            <div className='form-group'>
                                <label htmlFor='category'>Categoría:</label>
                                <input
                                    type='text'
                                    id='category'
                                    placeholder='Categoría'
                                    {...register('category', {
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
                                />
                                <span className='error'>{errors.category?.message}</span>
                            </div>

                            <div className='form-group'>
                                <label htmlFor='description'>Descripción:</label>
                                <input
                                    type='text'
                                    id='description'
                                    placeholder='Descripción'
                                    {...register('description', {
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
                                />
                                <span className='error'>{errors.description?.message}</span>
                            </div>

                            <div className='form-group'>
                                <label htmlFor='price'>Precio:</label>
                                <input
                                    type='number'
                                    step='any'
                                    id='price'
                                    placeholder='Precio'
                                    {...register('price', {
                                        required: { value: true, message: 'El precio es requerido' },
                                        validate: {
                                            positiveNumber: value => value > 0 || 'El precio debe ser mayor que 0',
                                        },
                                    })}
                                />
                                <span className='error'>{errors.price?.message}</span>
                            </div>

                            <div className='button-group'>
                                <button
                                    className='button'
                                    onClick={() => handleBack()}
                                    type='button'>
                                    Volver al listado
                                </button>
                                {
                                    !isAddRoute && (
                                        <button
                                            className='button button-error'
                                            onClick={() => handleDelete()}
                                            type='button'>
                                            Borrar
                                        </button>
                                    )
                                }
                                <button className='button button-success' type='submit'>
                                    {isAddRoute ? 'Crear' : 'Guardar'}
                                </button>
                            </div>

                        </form>
                }
            </div>
            {isDeleteDialogOpen && (
                <ConfirmationDialog
                    isOpen={isDeleteDialogOpen}
                    title='¿Estás seguro que deseás borrar este producto?'
                    cancelText='Cancelar'
                    onCancel={() => handleDeleteCancel()}
                    confirmText='Borrar'
                    onConfirm={() => handleDeleteConfirm()}
                />
            )}
        </>
    );
};


export default ProductFormPage;
