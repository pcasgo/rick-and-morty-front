import React, { useState } from 'react';
import useForm from "react-hook-form";
import { login } from './utils';
import { Link } from 'react-router-dom';

const SignIn = (props) => {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            user: "",
            password: ""
        }
    });

    const onSubmit = data => {
        fetch('http://localhost:3500/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(resolve => {
            return resolve.json();
        }).then(auth => {
            if (auth.status === 200)
                login(auth.token);
                props.history.push('/characters');
        });
        props.history.push('/signin');
    };

    return (
        <div className="Login">
            <h2>Login</h2>
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
                <Link to="/register">Registrarse</Link>
            </form>
        </div>
    );
};

export default SignIn;