import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export class DirectorView extends React.Component {

    render() {
        const { director, onBackClick } = this.props;

        return (
            <div className="director-view">
                <div className="director-name">
                    <span className="value"><h3>{director.Name}</h3></span>
                </div>
                <div className="director-description">
                    {/* <span className="label">Bio: </span> */}
                    <span className="value">{director.Bio}</span>
                </div>
                <br />
                <Button onClick={() => { onBackClick() }}>Back</Button>
            </div>
        );
    }
}

DirectorView.propTypes = {
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired
    }),
    onBackClick: PropTypes.func.isRequired
};