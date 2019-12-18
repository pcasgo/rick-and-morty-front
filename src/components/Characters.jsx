import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { isLogin, getToken, logout } from './utils/index';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const Characters = (props) => {

    const classes = useStyles();
    const [token] = useState(getToken());
    const [chars, setChars] = useState(null);
    const [status, setStatus] = useState('PENDING');
    const [error, setError] = useState('');

    useEffect(() => {
        if (isLogin()) {
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
                    setChars(response);
                    setStatus('OK');
                } else {
                    if (response.status === 401) {
                        setError('Su sesion a expirado');
                        setStatus('ERROR');
                        logout();
                    }
                }
            });
        } else {
            props.history.push('/login');
        }
    });

    const onSubmit = data => {
        logout();
        props.history.push('/login');
    }

    return (
        <div className="container">
             <form onSubmit={onSubmit}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        sendIcon={<Icon>send</Icon>}>Salir</Button>
                </form>
            <div className="row">
                {
                    status !== 'ERROR' && chars !== null ? chars.map(character =>
                        <div className="col-md-4 offset-sd-1 mt-5">
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={character.image}
                                        title={character.species}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {character.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {character.gender}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {character.status}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    ) : status === 'ERROR' ? <div>{error}</div>
                            : <CircularProgress size={50} />
                }
                
            </div>
        </div>
    );
}

export default Characters;
