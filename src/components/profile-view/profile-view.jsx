import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { MovieCard } from '../movie-card/movie-card';

export function ProfileView(props) {
    const { userParam, getUserMovies, userMovies, myMovies } = props;

    const sameUser = () => {
        if (userParam === localStorage.getItem('user')) {
            console.log('is same user');
            return true;
        } else {
            console.log('is NOT same user');
            return false;
        }
    }

    useEffect(() => {
        if (!sameUser()) {
            getUserMovies(userParam);
        }
    }, [userParam]);
    console.log(userMovies);

    return (
        <div>
            <h2>PROFILE INFO</h2>
            <p>Username: {userParam}</p>
            <br /><br />
            <h2>Favorite Movies:</h2>
            <Row>{
                (function () {
                    if (sameUser()) {
                        return (
                            myMovies &&
                            myMovies.map(m => {
                                console.log('test');
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
            <br /><br />
            <Link to={`/users/${userParam}/edit`}>Edit Profile pesonal information</Link>
            <br /><br />
        </div>
    );

}