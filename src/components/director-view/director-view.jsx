import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export class DirectorView extends React.Component {

    render() {
        const { director, onBackClick } = this.props;

        return (
            <div className="director-view">
                {/* <div className="movie-poster">                                            BIO is not included in API response
                    <img src={`https://movie-api2.herokuapp.com${movie.ImagePath}`} />
                </div> */}
                <div className="director-name">
                    <span className="label">Name: </span>
                    <span className="value">{director.Name}</span>
                </div>
                <div className="director-description">
                    <span className="label">Bio: </span>
                    <span className="value">{director.Bio}</span>
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