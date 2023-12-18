import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase/firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import '../App.css';
import './login.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onLogin = (e: { preventDefault: () => void; }) => {
        if (isLoading) {
            return;
        }
        e.preventDefault();
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate('/', { replace: true })
                console.log(user);
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
                setError('Credenciales incorrectas');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <>
            <div className='login'>
                <h2>Login</h2>

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
                        {isLoading && <div>Logueándose..</div>}
                    </div>
                    <div>
                        <button className='button button-success' onClick={onLogin}>
                            Login
                        </button>
                    </div>
                </form>

                {/* acá va la lógica de mostrar login/registro */}
                <p className='text-sm text-white text-center'>
                    ¿Aún no tenés cuenta? {' '}
                    <NavLink to='/signup'>
                        Registrar
                    </NavLink>
                </p>

            </div>
        </>
    )
}

export default LoginPage