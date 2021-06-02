import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

// Redux Components
import { setMovies, setUser, setMyMovies } from '../../actions/actions';

// React.Hook
import { LoginView } from '../login-view/login-view';
import { ProfileEditView } from '../profileedit-view/profileedit-view';
import { RegistrationView } from '../registration-view/registration-view';
// React.Hook + Redux
import MoviesList from '../movies-list/movies-list';
import ProfileView from '../profile-view/profile-view';
import MovieView from '../movie-view/movie-view';
// React.Component
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
// import { MovieCard } from '../movie-card/movie-card'; //moved inside MoviesList

import { LinkContainer } from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'

import './main-view.scss';
import imgWelcome from '../../assets/welcome-stephen-hawking.jpg';


class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            // movies: [],
            // user: null,
            // myMovies: null,
            userMovies: null
        }
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            let logUser = localStorage.getItem('user');
            this.props.setUser(logUser)
            this.getMovies(accessToken);
            this.getMyMovies(logUser, accessToken);
        }
    }

    /* After login, updates 'user' in state */
    onLoggedIn(authData) {
        this.props.setUser(authData.Username);
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.Username);
        this.getMovies(authData.token);
        this.getMyMovies(authData.Username, authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.setUser(null);
        this.props.setMovies(null);
        // this.setState({
        //     user: null,
        //     myMovies: null
        // });
        return location.assign('/');
    }

    getMovies(token) {
        axios.get('https://movie-api2.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setMovies(response.data);
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
                this.props.setMyMovies(response.data.myMovies);
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

    render() {
        const { movies, user, myMovies } = this.props;  //from Redux
        const { userMovies } = this.state;              //from Constructor state

        return (
            <Router>
                <div className="main-view"><Container fluid>

                    <Nav variant="tabs" defaultActiveKey="/">
                        <Nav.Item as="li" className="d-flex">
                            <LinkContainer to="/">
                                <Button variant="primary">Home</Button>
                            </LinkContainer>
                        </Nav.Item>
                        {!!user && (
                            <>
                                <Nav.Item as="li">
                                    <LinkContainer to={`/users/${user}`}>
                                        <Nav.Link>Profile</Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <LinkContainer to={`/users/testUser`}>
                                        <Nav.Link>Profile of test User</Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>
                                <Nav.Item className="flex-grow-1"></Nav.Item>
                                <Nav.Item className="d-flex">
                                    <Button variant="secondary" onClick={a => this.onLoggedOut(a)}>logout</Button>
                                </Nav.Item>
                            </>
                        )}
                    </Nav>
                    <br />
                    <Row className="justify-content-md-center">
                        <Route exact path="/" render={() => {
                            if (!user) return <><Col xs={12}  md={6}> <LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>
                            <Col xs={12} md={6}>
                            <Image src={imgWelcome} rounded fluid />
                            <br /><br />
                            <h4>Welcome to the online database of films about Time Traveling.</h4>
                            <br />
                            <h5>Spoiler Alert: Some of the films listed here don't reveal that some kind of time travel happens until later in the storyline.</h5>
                            <p>(More films to be added.)</p>
                            <br />
                            <h6>To know more about how I developed this React website visit:<br />
                            <Link to={{ pathname: "https://github.com/Eloi-Perez/movie_client" }} target="_blank" rel="noopener noreferrer">github.com/Eloi-Perez/movie_client</Link>
                            </h6>
                            </Col>
                            </>
                            if (movies.length === 0) return <div className="main-view" />;

                            return <MoviesList />; //passed as a prop? needed?  // movies={movies}
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
                            // if (!user) return <Redirect to="/" />
                            if (!user) return <Col> <LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>
                            if (movies.length === 0) return <div className="main-view" />;

                            return <Col md={8}>
                                <ProfileView userParam={match.params.username} getUserMovies={a => this.getUserMovies(a)} userMovies={userMovies} />
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
                </Container>
                </div>
            </Router>

        );
    }

}

let mapStateToProps = state => {
    return {
        movies: state.movies,
        user: state.user,
        myMovies: state.myMovies
    }
}

export default connect(mapStateToProps, { setMovies, setUser, setMyMovies })(MainView);