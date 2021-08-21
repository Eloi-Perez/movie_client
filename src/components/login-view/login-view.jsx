import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
// import { fetchUserAction } from '../../actions/actions'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios.post('https://movie-api2.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                // console.log(e)
                console.log('no such user')
                setMsg('The username or password is incorrect');
                setTimeout(() => setMsg(''), 2500);
            });
    };


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const user = await fetchUserAction(username,password )

    //             props.onLoggedIn(user);

    // };

    return (
        <div>
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}>Login</Button>
                <span className="red"> {msg}</span>
            </Form>
            <br />
            <h5>Thank you for visiting, Login or register a free account to access all the content.<br />Or try it with: testUser pw: 123</h5>
            <Link to={'/register'}>
                <Button variant="secondary">Register new Account</Button>
            </Link>
        </div>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};