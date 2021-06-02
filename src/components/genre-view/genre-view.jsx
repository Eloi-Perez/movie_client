import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export class GenreView extends React.Component {

    render() {
        const { genre, onBackClick } = this.props;

        return (
            <div className="genre-view">
                <div className="genre-name">
                    <span className="value"><h3>{genre.Name}</h3></span>
                </div>
                <div className="genre-description">
                    {/* <span className="label">Description: </span> */}
                    <span className="value">{genre.Description}</span>
                </div>
                <br />
                <Button onClick={() => { onBackClick() }}>Back</Button>
            </div>
        );
    }
}

GenreView.propTypes = {
    Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    }),
    onBackClick: PropTypes.func.isRequired
};