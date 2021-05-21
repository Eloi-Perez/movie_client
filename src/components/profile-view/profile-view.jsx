import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { MovieCard } from '../movie-card/movie-card';

export function ProfileView(props) {
    const { userParam, getUserMovies, userMovies } = props;

    useEffect(() => {
        getUserMovies(userParam);
    }, [userParam]);
    console.log(userMovies);

    return (
        <div>
            <h2>PROFILE INFO</h2>
            <p>Username: {userParam}</p>
            <br /><br />
            <h2>Favorite Movies:</h2>
            <Row>{
                userMovies &&
                userMovies.map(m => {
                    if (m.Favorite) {
                    return ( <Col md={3} key={m.Movie._id}> <MovieCard movie={m.Movie} /> </Col> ) //update to redux
                    }
                })
            }</Row>
            <br /><br />
            <Link to={`/users/${userParam}/edit`}>Edit Profile pesonal information</Link>
            <br /><br />
        </div>
    );

}