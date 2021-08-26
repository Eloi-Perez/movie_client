import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';

import { LinkContainer } from 'react-router-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function ProfileView(props) {
    const [sameUser, setSameUser] = useState(true);
    const { userParam, getUserMovies, userMovies, myMovies } = props;

    useEffect(() => {
        // (async () => {
        //     try {
        if (userParam === localStorage.getItem('user')) {
            setSameUser(true);
            console.log('is same user');
        } else {
            getUserMovies(userParam);
            setSameUser(false);
            console.log('is NOT same user');
        }
        // console.log(sameUser);
        //     } catch (e) { console.error(e) }
        // })()
    }, [userParam]);

    return (
        <div>
            <Row>
            <h2>PROFILE INFO</h2>
            <h5>Username: {userParam}</h5>
            <br /><br />
            <h2>Favorite Movies:</h2>
            </Row>
            <Row>{
                (function () {
                    if (sameUser) {
                        return (
                            myMovies &&
                            myMovies.map(m => {
                                if (m.Favorite) {
                                    return (<Col md={3} key={m.Movie._id}> <MovieCard movie={m.Movie} /> </Col>)
                                }
                            })
                        )
                    } else {
                        return (
                            userMovies &&
                            userMovies.map(m => {
                                if (m.Favorite) {
                                    return (<Col md={3} key={m.Movie._id}> <MovieCard movie={m.Movie} /> </Col>)
                                }
                            })
                        )
                    }
                })()
            }</Row>
            { sameUser &&
                <>
                    <br />
                    <LinkContainer to={`/users/${userParam}/edit`}>
                        <Button>Edit Profile pesonal information</Button>
                    </LinkContainer>
                </>
            }
        </div>
    );

}

const mapStateToProps = state => {
    const { myMovies } = state;
    return { myMovies };
};

export default connect(mapStateToProps)(ProfileView);