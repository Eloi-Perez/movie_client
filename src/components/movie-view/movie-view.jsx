import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export function MovieView(props) {
    const [checkedFav, setCheckedFav] = useState(false)
    const [checkedPlan, setCheckedPlan] = useState(false)
    const [score, setScore] = useState("")
    const { movie, myMovie, onBackClick } = props;

    useEffect(() => {
        if (!!myMovie) {
            setCheckedFav(myMovie.Favorite);
            setCheckedPlan(myMovie.PlanToWatch);
            setScore(myMovie.Score);
            console.log(myMovie);
        }
    }, []); //loading only once

    const switchFavorite = (e) => {
        checkedFav ? setCheckedFav(false) : setCheckedFav(true);
    }
    const switchPlan = (e) => {
        checkedPlan ? setCheckedPlan(false) : setCheckedPlan(true);
    }
    const switchScore = (val) => {
        let numVal = parseInt(val);
        setScore(numVal);
    }

    const scoreFunc = () => {
        if (score) { return score }
    }

    const saveProperties = (e) => {
        e.preventDefault();
        console.log('saving...');
        let storedUser = localStorage.getItem('user');
        let token = localStorage.getItem('token');
        axios.put(`https://movie-api2.herokuapp.com/users/${storedUser}/myMovies`, {
            Movie: movie.Title,
            Favorite: checkedFav,
            PlanToWatch: checkedPlan,
            Score: score
        }, {
            headers: { Authorization: `Bearer ${token}` }

        })
            .then(response => {
                const data = response.data;
                console.log(data);
                console.log('saved');
                //update myMovie(need to be pass as a prop) <--------------------HERE--------------------
                //data not being updated automatically, when you add a film, go out and back info not saved in react, only in DB, so you need to relog
                //need to update myMovie with response.data
            })
            .catch(err => {
                console.log(err.response.data);
                // console.log(err.response.data.errors[0]);
                console.error(err)
            });
    }

    return (
        <div className="movie-view">
            <div className="movie-poster">
                <img src={`https://movie-api2.herokuapp.com${movie.ImagePath}`} />
            </div>
            <div className="movie-title">
                <span className="label">Title: </span>
                <span className="value">{movie.Title}</span>
            </div>
            <div className="movie-description">
                <span className="label">Description: </span>
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
                        <option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option>

                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={saveProperties}>Save changes</Button>
            </Form>

            <br /><br />
            <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">Director</Button>
            </Link>
            <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">Genre</Button>
            </Link>

            <button onClick={() => { onBackClick() }}>Back</button>
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