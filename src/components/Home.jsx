import React, { Component } from 'react';
import { logout, isLogin } from './utils/index';
import { Link } from 'react-router-dom';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLogin: isLogin()
        }
    }

    handleLogout = () => {
        logout();
        this.setState({
            isLogin: false
        })
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                {this.state.isLogin ? 
                    <button onClick={() => this.handleLogout()}>Cerrar sesion</button>
                    : <Link to="/login">Login</Link>
                }
            </div>
        );
    }
}

export default Home;