import { combineReducers } from 'redux';

import { SET_MOVIES, SET_FILTER, SET_USER, SET_MYMOVIES } from '../actions/actions';

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}


function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}

function user(state = '', action) {
    switch (action.type) {
        case SET_USER:
            return action.value;
        default:
            return state;
    }
}

function myMovies(state = [], action) {
    switch (action.type) {
        case SET_MYMOVIES:
            return action.value;
        default:
            return state;
    }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  myMovies
});

export default moviesApp;