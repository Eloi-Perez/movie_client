import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setMyMovies } from '../../actions/actions';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function MovieView(props) {
    const [checkedFav, setCheckedFav] = useState(false);
    const [checkedPlan, setCheckedPlan] = useState(false);
    const [score, setScore] = useState(null);
    const [msg, setMsg] = useState('');
    const { movie, myMovie, onBackClick } = props; //myMovies

    useEffect(() => {
        if (!!myMovie) {
            setCheckedFav(myMovie.Favorite);
            setCheckedPlan(myMovie.PlanToWatch);
            setScore(myMovie.Score);
            console.log(myMovie);
        }
    }, []); //loading only once

    const switchFavorite = (e) => {
        setCheckedFav(!checkedFav);
    }
    const switchPlan = (e) => {
        setCheckedPlan(!checkedPlan);
    }
    const switchScore = (val) => {
        let numVal = parseInt(val);
        setScore(numVal);
    }

    const scoreFunc = () => {
        if (score) {
            return score;
        }
    }

    const saveProperties = (e) => {
        e.preventDefault();
        console.log('saving...');
        let storedUser = localStorage.getItem('user');
        let token = localStorage.getItem('token');
        // let scoreToSend = () => {if (score === null) {return ""}};
        // console.log('axios score: ->' + score + '<-');
        axios.put(`https://movie-api2.herokuapp.com/users/${storedUser}/myMovies`, {
            Movie: movie.Title,
            Favorite: checkedFav,
            PlanToWatch: checkedPlan,
            Score: score
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                props.setMyMovies(response.data.myMovies);
                console.log('saved');
                setMsg('Saved!');
                setTimeout(() => setMsg(''), 2500);
            })
            .catch(err => {
                console.log(err.response.data);
                // console.log(err.response.data.errors[0]);
                console.error(err)
                setMsg('Error');
                setTimeout(() => setMsg(''), 2500);
            });
    }

    return (
        <div className="movie-view">
            <div className="movie-poster">
                <img src={`https://movie-api2.herokuapp.com${movie.ImagePath}`} />
            </div>
            <br />
            <div className="movie-title h4">
                <span className="label h3">Title: </span>
                <span className="value h3">{movie.Title}</span>
                <span>  Director: </span>
                <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">{movie.Director.Name}</Button>
                </Link>
                <span> Genre: </span>
                <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">{movie.Genre.Name}</Button>
                </Link>
            </div>

            <div className="movie-description">
                <span className="label h3">Description: </span>
                <span className="value">{movie.Description}</span>
            </div>
            <br />
            <Form>
                <Form.Group controlId="formFav"><Form.Switch
                    id={`switchFav-${movie._id}`}
                    label="Favorite"
                    onChange={e => switchFavorite(e.target)}
                    checked={checkedFav}
                /></Form.Group>
                <Form.Group controlId="formPlan"><Form.Switch
                    id={`switchPlan-${movie._id}`}
                    label="Plan to watch"
                    onChange={e => switchPlan(e.target)}
                    checked={checkedPlan}
                /></Form.Group>
                <Form.Group controlId="formScore">
                    <Form.Label>Score</Form.Label>
                    <Form.Control as="select" value={scoreFunc()} onChange={e => switchScore(e.target.value)}>
                        <option value="" >Choose Score</option>
                        {[...Array(11).keys()].map(num => <option key={num}>{num}</option>)}

                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={saveProperties}>Save changes</Button>
                <span className="red"> {msg}</span>
            </Form>

            <br />
            <Button variant="secondary" onClick={() => { onBackClick() }}>Back</Button>
        </div>
    );
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};

export default connect(null, { setMyMovies })(MovieView); //mapStateToProps