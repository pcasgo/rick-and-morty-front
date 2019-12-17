import React, { useState } from 'react';
import useForm from 'react-hook-form';

const Register = (props) => {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            user: "",
            password: ""
        }
    });

    const [state, setState] = useState('');

    const onSubmit = data => {
        fetch('http://localhost:3500/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(resolve => {
            return resolve.json();
        }).then(response => {
            console.log('response: ', response);
            if (response.status !== 201) {
                props.history.push('/signin');
            } else {
                setState(response.message);
            }
        });
    };

    return (
        <div className="Register">
            <h2>Registro de usuario</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="user">Usuario</label>
                    <input name="user" placeholder="Usuario" ref={register} />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name="password" placeholder="Contraseña" ref={register} />
                </div>
                <input type="submit" />
                <label>{state}</label>
            </form>
        </div>
    );
}

export default Register;