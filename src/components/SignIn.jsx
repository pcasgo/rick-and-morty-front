import React, { useState } from 'react';
import useForm from "react-hook-form";

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
            console.log('auth: ', auth);
            auth.status === 200 ?
                props.history.push('/dashboard') :
                props.history.push('/home');
        });
    };

    return (
        <div className="Login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="user">Usuario</label>
                    <input name="user" placeholder="Juan" ref={register} />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input name="password" placeholder="" ref={register} />
                </div>
                <input type="submit" />
            </form>
        </div>
    );
};

export default SignIn;