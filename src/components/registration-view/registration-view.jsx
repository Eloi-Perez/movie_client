import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthdate);
        /* Send a request to the server for authentication  TO DO*/
        props.onLoggedIn(username);
    };

    const backLogin = () => {
        props.onLoggedIn(null);
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

                <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            </Form>
            <br />
            <Button variant="secondary" onClick={backLogin}>Log In with existing User</Button>
        </div>
    );
}

RegistrationView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};