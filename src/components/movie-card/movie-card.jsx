import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        // const setFavorite = (e) => {
        //     console.log(e.id);
        //     console.log(e.checked);
        // }

        return (
            <Card>
                <Link to={`/movies/${movie._id}`}>
                    <Card.Img variant="top" src={"https://movie-api2.herokuapp.com" + movie.ImagePath} />
                </Link>
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    {/* <Form.Switch //Form.Check
                        // type="switch"
                        id={`switch-${movie._id}`}
                        label="Favorite"
                        // value=""
                        onChange={e => setFavorite(e.target)}
                    /> */}

                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        // Description: PropTypes.string.isRequired,
        // Genre: PropTypes.shape({
        //     Name: PropTypes.string.isRequired
        // }),
        // Director: PropTypes.shape({
        //     Name: PropTypes.string.isRequired
        // }),
        ImagePath: PropTypes.string.isRequired
    }).isRequired
    // onMovieClick: PropTypes.func.isRequired
};