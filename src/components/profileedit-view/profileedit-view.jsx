import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';






export class ProfileEditView extends React.Component {
    render() {

        const { user1 } = this.props;

        const deleteUser = (e) => {
            e.preventDefault();
            console.log(e);
            let delAlert = confirm("Are you sure?");
            if (delAlert) {
                console.log('deleting');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                return location.assign('/');
            }
            // let token = localStorage.getItem('token');
            // let payload = {
            //     Username: user1,
            //     Password: password
            // };
            // console.log("deleting");

            // axios.delete(`https://movie-api2.herokuapp.com/users/${user1}`, payload)
            //     .then(response => {
            //         console.log(response.data);
            //         return response.data;
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        };
        console.log('props')

        return (
            <div>
                <h3>FORM EDIT INFO</h3>
                <h3>FORM DELETE ACCOUNT</h3>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>

                    <Button variant="danger" type="submit" onClick={deleteUser}>DELETE Acount</Button>
                </Form>
            </div>
        )


    }
}