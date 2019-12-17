import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { isLogin, getToken, logout } from './utils/index';
class Characters extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chars: null,
            status: 'PENDING',
            error: ''
        };
    }

    componentDidMount() {
        if (isLogin()) {
            this.handleCharacters(getToken());
        }
    }

    handleCharacters = (token) => {
        fetch('http://localhost:3500/characters',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            }
        ).then(resolve => {
            return resolve.json();
        }).then(response => {
            if (response.status === undefined) {
                this.setState({
                    chars: response,
                    status: 'OK'
                });
            } else {
                if (response.status === 401) {
                    this.setState({
                        error: 'Su sesion a expirado',
                        status: 'ERROR'
                    });
                    logout();
                    this.setState({
                        isLogin: false
                    })
                }
            }
        });
    }

    render() {

        const { chars, status } = this.state;
        return (
            <div className="chars">
                {
                    status !== 'ERROR' && chars !== null ? chars.map(character =>
                        <div>

                            {character.name}
                            {character.status}
                            {character.species}
                            {character.gender}
                            {character.image}
                        </div>
                    ) : status === 'ERROR' ? <div>Su sesion a expirado</div>
                            : <CircularProgress size={50} />
                }
            </div>
        );
    }
}

export default Characters;
