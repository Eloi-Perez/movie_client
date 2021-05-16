import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



export function ProfileEditView(props) {
    const [putPassword, setPutPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [delPassword, setDelPassword] = useState('');
    const { userParam, onLoggedOut, onBackClick } = props;


    const deleteUser = (e) => {
        e.preventDefault();
        let storedUser = localStorage.getItem('user');
        let delAlert = confirm(`Are you sure that you want to\ndelete permantly: ${storedUser} ?`);
        if (delAlert) {
            console.log('deleting...');
            console.log(delPassword);

            let payload = {
                Username: storedUser,
                Password: delPassword
            };

            axios.delete('https://movie-api2.herokuapp.com/users', { data: payload }) // http://localhost:8080/users
                .then(response => {
                    console.log(response.data);
                    console.log("deleted");
                    onLoggedOut();
                })
                .catch((err) => {
                    console.log(err);
                    //send error to DOM
                    console.log('user or password incorrect')
                });
        }
    };

    const updateUser = (e) => {
        e.preventDefault();
        let storedUser = localStorage.getItem('user');
        let delAlert = confirm(`Are you sure that you want to\nupdate: ${storedUser} ?`);
        if (delAlert) {
            console.log('updating...');

            let payload = {
                Username: storedUser,
                Password: putPassword,
            };
            if (newUsername) payload.NewUsername = newUsername;
            if (newPassword) payload.NewPassword = newPassword;
            if (newEmail) payload.NewEmail = newEmail;
            if (birthdate) payload.BirthDate = birthdate;
            console.log(payload);

            axios.put('https://movie-api2.herokuapp.com/users', payload)
                .then(response => {
                    console.log(response.data);
                    console.log("updated");
                })
                .catch((err) => {
                    console.log(err);
                    //send error to DOM
                    console.log('user or password incorrect')
                });
        }
    };
    return (
        <div>
            <br />
            <button onClick={() => { onBackClick() }}>Back</button>
            <br /><br />
            <h3>FORM EDIT INFO</h3>
            <Form>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password*:</Form.Label>
                    <Form.Control type="password" onChange={e => setPutPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formNewUsername">
                    <Form.Label>New Username:</Form.Label>
                    <Form.Control type="text" onChange={e => setNewUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formNewPassword">
                    <Form.Label>New Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setNewPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>New Email:</Form.Label>
                    <Form.Control type="email" onChange={e => setNewEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBirthdate">
                    <Form.Label>Birthdate:</Form.Label>
                    <Form.Control type="date" onChange={e => setBirthdate(e.target.value)} />
                </Form.Group>

                <Button variant="warning" type="submit" onClick={updateUser}>Update Acount</Button>
            </Form>
            <br /><br /><br /><br />
            <h3>FORM DELETE ACCOUNT</h3>
            <Form>
                <Form.Group controlId="formDelPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setDelPassword(e.target.value)} />
                </Form.Group>
                <Button variant="danger" type="submit" onClick={deleteUser}>DELETE Acount</Button>
            </Form>
        </div>
    )

}