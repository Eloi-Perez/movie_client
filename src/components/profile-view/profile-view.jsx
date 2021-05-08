import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";






export class ProfileView extends React.Component {
    constructor() {
        super();
        this.dataUsers = [];
    };

    render() {
        const { user1 } = this.props;

        const getUser = new Promise((resolve, reject) => {
            let token = localStorage.getItem('token');
            axios.get(`https://movie-api2.herokuapp.com/users/${user1}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    // if (response.data) {
                    resolve(response.data);
                    // }
                })
                .catch((err) => {
                    console.log(err);
                });
        });
        getUser.then(e => this.dataUsers.push(e))
            .then(this.dataUsers.map(e => console.log(e)));
        // if (!dataUsers.find(o => o.Username === "user1")) {console.log('not here')} else console.log('already here')
        // dataUsers.push(user1)
        // let myName = dataUsers.find(o => o.Username === "user1");
        // console.log(myName)
        // console.log(dataUsers[0])

        return (
            <div>{console.log(this.dataUsers)}
                <h2>PROFILE INFO</h2>
                <p>Username: {`data from axios`}</p>
                <p>myMovies: {`data from axios and call movie-card-with-fav-button`}</p>
                <Link to={`/users/${user1}/edit`}>Edit Profile pesonal information</Link>
            </div>
        )


    }
}


// export function ProfileView(props) {
//     const [user1, setUsername] = useState('');

//     return (
//         <div>
//         {/* {console.log(user)} */}
//             <h2>PROFILE INFO</h2>
//             <Link to={`/users/${user1}`}>
//                 Open
//             </Link>
//         </div>
//     )
// }