import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    const [msg, setMsg] = useState('');
    const [msgDel, setMsgDel] = useState('');
    const [testUser, setTestUser] = useState(false);

    useEffect(() => {
        if ('testUser' == localStorage.getItem('user')) {
            setTestUser(true);
        }
    }, [userParam]);

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
                    setMsg('Updated Successfully!');
                    //log out and ask to login again? or update token?
                })
                .catch((err) => {
                    console.log(err);
                    console.log('user or password incorrect')
                    setMsg('Error');
                    setTimeout(() => setMsg(''), 2500);
                });
        }
    };

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
                    //send deleted to DOM?
                    onLoggedOut();
                })
                .catch((err) => {
                    console.log(err);
                    console.log('password incorrect')
                    setMsgDel("Password incorrect");
                    setTimeout(() => setMsgDel(''), 2500);
                });
        }
    };

    return (
        <div>
            <br />
            <Button variant="secondary" onClick={() => { onBackClick() }}>Back</Button>
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
                {!testUser && (
                    <Button variant="warning" type="submit" onClick={updateUser}>Update Acount</Button>
                )}
                {testUser && (
                    <Button variant="warning"><del>Update Acount</del></Button>
                )}
                <span className="red"> {msg}</span>
            </Form>
            <br /><br /><br /><br />
            <h3>DELETE AND REMOVE ALL DATA</h3>
            <Form>
                <Form.Group controlId="formDelPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setDelPassword(e.target.value)} />
                </Form.Group>
                {!testUser && (
                    <Button variant="danger" type="submit" onClick={deleteUser}>DELETE Acount</Button>
                )}
                {testUser && (
                    <Button variant="danger"><del>DELETE Acount</del></Button>
                )}
                <span className="red"> {msgDel}</span>
            </Form>
            <br /><br />
        </div>
    )

}