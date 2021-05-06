import React from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';



export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        }
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
          this.setState({
            user: localStorage.getItem('user')
          });
          this.getMovies(accessToken);
        }
      }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    /* After login, updates 'user' in state */
    onLoggedIn(authData) {
        this.setState({
            user: authData.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
          user: null
        });
      }

    getMovies(token) {
        axios.get('https://movie-api2.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
          // Assign the result to the state
          this.setState({
            movies: response.data
          });
          console.log(this.state.movies);//del
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    render() {
        const { movies, selectedMovie } = this.state;
        // console.log(this.state.authData);
        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        //if (!this.state.authData) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        // if (this.state.authData === "toRegister") return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} />;


        if (movies.length === 0) return <div className="main-view" />;

        return (
            <Row className="main-view justify-content-md-center">
                {selectedMovie
                    ? (
                        <Col md={8}>
                            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                        </Col>
                    )
                    : (movies.map(movie => (
                        <Col md={3}>
                            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                        </Col>
                    )))
                }
            </Row>
        );

    }

}

export default MainView;