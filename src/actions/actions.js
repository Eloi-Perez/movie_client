export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const SET_MYMOVIES = 'SET_MYMOVIES';
// export const SET_USERMOVIES = 'SET_USERMOVIES';

//action creators
export function setMovies(value) {
    return { type: SET_MOVIES, value };
}

export function setFilter(value) {
    return { type: SET_FILTER, value };
}

export function setUser(value) {
    return { type: SET_USER, value };
}

export function setMyMovies(value) {
    return { type: SET_MYMOVIES, value };
}

// export function setUserMovies(value) {
//     return { type: SET_USERMOVIES, value };
// }
// export const fetchUserAction = async (username,password) => {
//     try {
//         const res = await axios.post('https://movie-api2.herokuapp.com/login', {
//             Username: username,
//             Password: password
//         })
//         return res.data;
//         //     props.onLoggedIn(data);
//         // res
//     } catch (error) {
//         console.log('no such user')
//     }

        // .then(response => {
        //     const data = response.data;
        //     props.onLoggedIn(data);
        // })
        // .catch(e => {
        //     // console.log(e)
        //     console.log('no such user')
        // });
// }