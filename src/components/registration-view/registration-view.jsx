import React, { useState } from 'react';
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
            <form>
                <label>
                    Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <label>
                    Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    Birth date:
        <input type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
                </label>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
            <br />
            <button onClick={backLogin}>Log In with existing User</button>
        </div>
    );
}

RegistrationView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};