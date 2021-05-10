import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { MovieCard } from '../movie-card/movie-card';

export function ProfileView(props) {
    // const [myMovies, setMyMovies] = useState(null)
    // const [myFavMovies, setMyFavMovies] = useState(null)


    const { userParam, getUserMovies, userMovies } = props;

    // const getUser = new Promise((resolve, reject) => { //async
    // const getUser = async (callback) => {
    //     let token = localStorage.getItem('token');
    //     axios.get(`https://movie-api2.herokuapp.com/users/${userParam}`, {
    //         headers: { Authorization: `Bearer ${token}` }
    //     })
    //         .then(response => {
    //             if (response.data) {
    //                 setMyMovies(response.data.myMovies);
    //                 console.log(response.data.myMovies);
    //                 return response.data.myMovies;
    //             } else { throw "is Empty" }
    //         })
    //         // .then(e => {
    //         //     e.map
    //         // })
    //         .catch((err) => {
    //             console.log(err);
    //             // return reject('error')
    //         });

    // };
    useEffect(() => {
        getUserMovies(userParam);
    }, [userParam]);
    console.log(userMovies);
    // const getUser = new Promise((resolve, reject) => {
    //     let token = localStorage.getItem('token');
    //     axios.get(`https://movie-api2.herokuapp.com/users/${userParam}`, {
    //         headers: { Authorization: `Bearer ${token}` }
    //     })
    //         .then(response => {
    //             // if (response.data) {
    //             resolve(response.data);
    //             // }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // });

    // for viewing profiles of other users
    // getUser.then(e => this.dataUsers.push(e))
    // .then(this.dataUsers.map(e => console.log(e)));
    // if (!dataUsers.find(o => o.Username === "userParam")) {console.log('not here')} else console.log('already here')
    // dataUsers.push(userParam)
    // let myName = dataUsers.find(o => o.Username === "userParam");
    // console.log(myName)
    // console.log(dataUsers[0])

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
                    return ( <Col md={3} key={m.Movie._id}> <MovieCard movie={m.Movie} /> </Col> )
                    }
                })
            }</Row>
            <br /><br />
            <Link to={`/users/${userParam}/edit`}>Edit Profile pesonal information</Link>
            <br /><br />

        </div>
    );



}


// export function ProfileView(props) {
//     const [user1, setUsername] = useState('');

//     return (
//         <div>
//         {/* {console.log(user)} */}
//             <h2>PROFILE INFO</h2>
//             <Link to={`/users/${user1}`}>
//                 Open
//             </Link>
//         </div>
//     )
// }