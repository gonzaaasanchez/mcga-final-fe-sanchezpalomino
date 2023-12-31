import React, { useState } from 'react';
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase/firebase.ts';
import { useNavigate } from 'react-router-dom'
import ConfirmationDialog from '../utils/dialog/index.tsx';
import { saveUserData } from '../utils/auth_helper.tsx';
import '../App.css';
import './auth.css';

const AuthPage = () => {
    const navigate = useNavigate();
    const [isLoginFlow, setIsLoginFlow] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

    const showMenu = () => {
        navigate('/', { replace: true });
    }

    const getUserTokenID = (user: User) => {
        user.getIdToken(true).then(function (idToken) {
            console.log('idToken', idToken);
            saveUserData(user, idToken);
        }).catch((_) => {
            setError('Hubo un error al loguear el usuario');
        }).finally(() => {
            showMenu();
        });
    }

    const onLogin = (e: { preventDefault: () => void; }) => {
        if (isLoading) {
            return;
        }
        e.preventDefault();
        setIsLoading(true);

        if (isLoginFlow) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log('userCredential', userCredential);
                    getUserTokenID(userCredential.user);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.log(errorMessage)
                    setError('Hubo un error al loguear el usuario');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((_) => {
                    setIsLogoutDialogOpen(true);
                    setIsLoginFlow(true);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.log(errorMessage)
                    setError('Hubo un error al crear el usuario');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    const switchAuthFlow = () => {
        setIsLoginFlow(!isLoginFlow);
    };

    return (
        <>
            <div className='auth'>
                <h2>  {isLoginFlow ? 'Login' : 'Registro'}</h2>

                <form>
                    <div className='form-group'>
                        <label htmlFor='email-address'>
                            Email address
                        </label>
                        <input
                            id='email-address'
                            name='email'
                            type='email'
                            required
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>
                            Contraseña
                        </label>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            required
                            placeholder='Contraseña'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && !isLoading && <div className='error'>{error}</div>}
                        {isLoading && <div>{isLoginFlow ? 'Logueándose...' : 'Registrando usuario...'}</div>}
                    </div>
                    <div>
                        <button className='button button-success' onClick={onLogin}>
                            {isLoginFlow ? 'Login' : 'Registrarme'}
                        </button>
                    </div>
                </form>

                <p >
                    {isLoginFlow ? '¿Aún no tenés cuenta?' : '¿Ya tenés cuenta?'}
                    <button type='button' className='underlined-button' onClick={switchAuthFlow}>
                        {isLoginFlow ? 'Registrarme' : 'Loguearme'}
                    </button>
                </p>

            </div>

            {isLogoutDialogOpen && (
                <ConfirmationDialog
                    isOpen={isLogoutDialogOpen}
                    title='¡Te has registrado correctamente!'
                    confirmText='Ir al menú'
                    onConfirm={() => {
                        setIsLogoutDialogOpen(false);
                        showMenu();
                    }}
                />
            )}
        </>
    )
}

export default AuthPage