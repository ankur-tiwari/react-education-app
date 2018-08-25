// Ref: Redux Examples taken from  https://bit.ly/2BIGB2T
import {
  ADD_USER,
  GET_USERS,
  DELETE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  ERRORS
} from './typesActions';

import axios from 'axios';
import {setAuthToken} from './../helpers'
import jwtDecode from 'jwt-decode';



// Add Course
export const addUser = userData => dispatch => {
  axios.post('/api/user/', userData)
    .then(res =>
      dispatch({
        type: ADD_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ERRORS,
        payload: err.response.data
      })
    );
};


// Get Users
export const getUsers = () => dispatch => {
  axios.get('/api/user/')
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ERRORS,
        payload: null
      })
    );
};


export const setUser = userData => {
  return {
    type: LOGIN_USER,
    payload: userData
  }
}


// Delete User
export const deleteUser = userId => dispatch => {
  axios.delete(`/api/user/${userId}`)
    .then(res =>
      dispatch({
        type: DELETE_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ERRORS,
        payload: null
      })
    );
};


// Login User
export const loginUser = userData => dispatch => {
  axios.post('/api/user/login', userData)
    .then(res =>{

      // Ref: Seen example from https://goo.gl/HCaXX2
      let token = res.data.token
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      let dUser = jwtDecode(token)
      dispatch(setUser(dUser))
    })
    .catch(err =>
      dispatch({
        type: ERRORS,
        payload: err.response.data
      })
    );
};



// Logout User
export const logoutUser = () => dispatch => {

  setAuthToken(false)
  localStorage.removeItem('jwtToken');
  dispatch({
    type: LOGOUT_USER
  })
};
