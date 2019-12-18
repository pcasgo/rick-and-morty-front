import React, { useState } from 'react';
import useForm from 'react-hook-form';

const Register = (props) => {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            user: "",
            password: ""
        }
    });

    const [message, setMessage] = useState('');

    const onSubmit = data => {
        setMessage('');
        fetch('http://localhost:3500/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(resolve => {
            return resolve.json();
        }).then(response => {
            if (response.status === 201) {
                props.history.push('/login');
            } else {
                setMessage(response.message);
            }
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 offset-md-4 mt-5">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h2>Registro de usuario</h2>
                                <div className="form-group">
                                    <label htmlFor="user">Usuario</label>
                                    <input
                                        name="user"
                                        className="form-control"
                                        placeholder="Usuario"
                                        ref={register}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Contraseña"
                                        ref={register}
                                    />
                                </div>
                                { message !== '' ? <label>{message}</label> : ''}
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-block">
                                    Aceptar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;