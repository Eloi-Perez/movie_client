import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileEditView } from '../profileedit-view/profileedit-view';

// import { MovieCard } from '../movie-card/movie-card'; //will be imported in movies-list
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import { LinkContainer } from 'react-router-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            // movies: [],
            user: null,
            myMovies: null,
            userMovies: null
        }
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            let logUser = localStorage.getItem('user');
            this.setState({
                user: logUser
            });
            this.getMovies(accessToken);
            this.getMyMovies(logUser, accessToken);
        }
    }

    /* After login, updates 'user' in state */
    onLoggedIn(authData) {
        this.setState({
            user: authData.Username
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.Username);
        this.getMovies(authData.token);
        this.getMyMovies(authData.Username, authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null,
            myMovies: null
        });
        return location.assign('/');
    }

    getMovies(token) {
        axios.get('https://movie-api2.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setMovies(response.data);
                // this.setState({
                //     movies: response.data
                // });
            })
            .catch(err => {
                console.log(err);
            });
    }

    getMyMovies(user, token) {
        axios.get(`https://movie-api2.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    myMovies: response.data.myMovies
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    getUserMovies(user) {
        let token = localStorage.getItem('token');
        axios.get(`https://movie-api2.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                if (response.data.myMovies) {
                    this.setState({
                        userMovies: response.data.myMovies
                    });
                } else {
                    console.log('myMovies not in user')
                }
                console.log('getUserMovies executed');
            })
            .catch(err => {
                console.log(err);
            });
    }
    // async getUserMovies(user) {
    //     let token = localStorage.getItem('token');
    //     try {
    //         const response = await axios.get(`https://movie-api2.herokuapp.com/users/${user}`, {
    //             headers: { Authorization: `Bearer ${token}` }
    //         });
    //         this.setState({
    //             userMovies: response.data.myMovies
    //         });
    //         console.log('getUserMovies executed');
    //         return response.data.myMovies;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    render() {
        const { movies } = this.props;
        const { user, myMovies, userMovies } = this.state;

        return (
            <Router>
                <div className="main-view">

                    <Nav variant="tabs" defaultActiveKey="/">
                        <Nav.Item as="li">
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <LinkContainer to={`/users/${user}`}>
                                <Nav.Link>Profile</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <LinkContainer to={`/users/Me4`}>
                                <Nav.Link>Me4 Profile</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        {!!user && (
                            <Nav.Item as="li">
                                <Button variant="secondary" onClick={a => this.onLoggedOut(a)}>logout</Button>
                            </Nav.Item>
                        )}
                    </Nav>

                    <Row className="justify-content-md-center">
                        <Route exact path="/" render={() => {
                            if (!user) return <Col> <LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>
                            if (movies.length === 0) return <div className="main-view" />;

                            return <MoviesList movies={movies}/>;
                            // return movies.map(m => (
                            //     <Col md={3} key={m._id}>
                            //         <MovieCard movie={m} />
                            //     </Col>
                            // ))
                        }} />

                        {/* User Routes */}
                        <Route path="/register" render={({ history }) => {
                            if (user) return <Redirect to="/" />
                            return <Col>
                                <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />
                        <Route path="/users/:username" render={({ match, history }) => {
                            if (!user) return <Col> <LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>
                            if (movies.length === 0) return <div className="main-view" />;

                            return <Col md={8}>
                                <ProfileView userParam={match.params.username} getUserMovies={a => this.getUserMovies(a)} userMovies={userMovies} myMovies={myMovies} />
                            </Col>
                        }} />
                        <Route path="/users/:username/edit" render={({ match, history }) => {
                            if (!user) return <Col> <LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>
                            if (movies.length === 0) return <div className="main-view" />;

                            return <Col md={8}>
                                <ProfileEditView userParam={match.params.username} onLoggedOut={a => this.onLoggedOut(a)} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />

                        {/* Movie Routes */}
                        <Route path="/movies/:movieId" render={({ match, history }) => {
                            if (!user) return <Col> <LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={8}>
                                <MovieView //find throwing error if refresh inside MovieView
                                    movie={movies.find(m => m._id === match.params.movieId)}
                                    myMovie={myMovies.find(e => e.Movie._id === match.params.movieId)}
                                    // myMovies={myMovies} to be updated in MovieView
                                    onBackClick={() => history.goBack()} />
                            </Col>
                        }} />
                        <Route path="/genres/:name" render={({ match, history }) => {
                            if (!user) return <Col> <LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={8}>
                                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />
                        <Route path="/directors/:name" render={({ match, history }) => {
                            if (!user) return <Col> <LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={8}>
                                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />
                    </Row>
                </div>
            </Router>

        );
    }

}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);