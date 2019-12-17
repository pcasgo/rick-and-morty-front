import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class CharacterComponent extends Component {

    constructor() {
        super();
        this.state = {
            auth: null,
            characters: null,
        };
    }

    componentDidMount() {
        this.getToken();
    }

    getToken = () => {
        const dto = {
            user: "Pablo",
            password: "123456"
        }

        fetch('http://localhost:3500/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto),
        }).then(resolve => {
            return resolve.json();
        }).then(auth => {
            this.setState({
                auth
            })
            this.handleCharacters();
        });
    }

    handleCharacters = () => {
        fetch('http://localhost:3500/characters',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': this.state.auth.token
                }
            }
        ).then(resolve => {
            return resolve.json();
        }).then(characters => {
            this.setState({
                characters
            })
        });
    }

    render() {

        const { characters } = this.state;
        return (
            <div className="chars">
                {
                    characters ? characters.map(character =>
                        <div>
                            {character.name}
                            {character.status}
                            {character.species}
                            {character.gender}
                            {character.image}
                        </div>
                    ) : <CircularProgress size={50} />
                }
            </div>
        );
    }
}

export default CharacterComponent;
