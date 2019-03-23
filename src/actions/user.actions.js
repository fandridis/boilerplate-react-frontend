import httpRequest from '../helpers/httpRequest';
import { 
  USER_LOGIN,
  USER_LOGOUT,
} from './types';

export const userActions = {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  validateResetPasswordToken,
  socialLogin
};

function signup(user) {
  return function(dispatch) {
    return httpRequest('POST', '/users/register', user)
      .then(user => {
        console.log('user: ', user);
        return user;
      })
      .catch(err => {
        console.log('err: ', err.response);
        const errorMessage = err.response.data.message;
        throw errorMessage;
      })
  }
}

function login(user) {
  console.log('login action');
  return function(dispatch) {
    console.log('http starts');
    return httpRequest('POST', '/users/authenticate', user)
      .then(user => {
        console.log('user: ', user);
        if (user.isVerified) {
          console.log('User is verified');
          localStorage.setItem('user', JSON.stringify(user));
          dispatch({ type: USER_LOGIN, payload: user });
          return user;
        }
        else {
          const errorMessage = 'user not verified';
          console.log('User is not verified');     
          throw errorMessage;
        }
      })
      .catch(err => {
        console.log('err @ actions: ', err.response);
        throw err.response.data.message;
      })
  }
}

function socialLogin(data, callback) { 
  return async (dispatch) => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      dispatch({ type: USER_LOGIN, payload: data.token });
      console.log('callback will fire!');
      callback();
    }
    else {
      return callback('error');
    }
  }
}

function logout() {
  localStorage.removeItem('user');

  return {
    type: USER_LOGOUT, payload: {}
  }
}

function forgotPassword(user) {
  return function(dispatch) {
    return httpRequest('POST', '/users/forgotPassword', user)
      .then(data => {
        console.log('data @ forgotPassword action', data);
        return data.message
      })
      .catch(err => {
        console.log('err @ forgotPassword action', err.response);
        return err.response.data.message;
      })
  }
}

function validateResetPasswordToken(data) {
  console.log('Validating the token: ', data);
  return function(dispatch) {
    return httpRequest('GET', `/users/validateResetPasswordToken/${data.resetToken}`)
      .then((data) => { 
        console.log('response @ validate: ', data);
        return data.msg;    
      })
      .catch((err) => {
        console.log('err @ validatePasswordToken action: ', err.response);
        throw err.response.data.message;
      })
  }
}

function resetPassword (data) {
  return function(dispatch) {
    return httpRequest('POST', '/users/resetPassword', data)
      .then(data => {
        console.log('data @ resetPassword: ', data);
        return data.message;
      })
      .catch(err => {
        console.log('err @ resetPassword: ', err.response);
        return err.response.data.message;
      })
  }
}

