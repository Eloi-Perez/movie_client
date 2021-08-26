import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [msg, setMsg] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post('https://movie-api2.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthdate: birthdate
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                props.onLoggedIn(data);
                //no redirection needed, once user is detected in state react will show main-view
            })
            .catch(err => {
                console.log(err.response.data.errors[0]);
                console.error(err)
                setMsg(err.response.data.errors[0].msg);
                setTimeout(() => setMsg(''), 2500);
            });
    };

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

                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBirthdate">
                    <Form.Label>Birthdate:</Form.Label>
                    <Form.Control type="date" onChange={e => setBirthdate(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleRegister}>Register</Button>
                <span className="red"> {msg}</span>
                {/* JS instant validation ? */}
            </Form>
            <br />
            <Button variant="secondary" onClick={props.onBackClick}>Log In with existing User</Button>
        </div>
    );
}

RegistrationView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};