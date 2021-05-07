import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export class GenreView extends React.Component {

    render() {
        const { genre, onBackClick } = this.props;

        return (
            <div className="genre-view">
                {/* <div className="movie-poster">                                            DESCRIPTION is not included in API response
                    <img src={`https://movie-api2.herokuapp.com${movie.ImagePath}`} />
                </div> */}
                <div className="genre-name">
                    <span className="label">Name: </span>
                    <span className="value">{genre.Name}</span>
                </div>
                <div className="genre-description">
                    <span className="label">Description: </span>
                    <span className="value">{genre.Description}</span>
                </div>
                {/* <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">Director</Button>
                </Link>

                <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">Genre</Button>
                </Link> */}

                <Link to={'/'}>
                    <Button variant="link">Home</Button>
                </Link>
                <button onClick={() => { onBackClick() }}>Back</button>
            </div>
        );
    }
}

// MovieView.propTypes = {
//     movie: PropTypes.shape({
//         Title: PropTypes.string.isRequired,
//         Description: PropTypes.string.isRequired,
//         Genre: PropTypes.shape({
//             Name: PropTypes.string.isRequired
//         }),
//         Director: PropTypes.shape({
//             Name: PropTypes.string.isRequired
//         }),
//         ImagePath: PropTypes.string.isRequired
//     }).isRequired,
//     onBackClick: PropTypes.func.isRequired
// };