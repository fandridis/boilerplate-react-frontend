import { 
  USER_LOGIN,
  USER_LOGOUT,
} from '../actions/types';

let user = JSON.parse(localStorage.getItem('user'));
const defaultState = user ? { loggedIn: true, ...user } : {};

export default function(state = defaultState, action) {
  console.log('action @ user.reducer: ', action);

  switch (action.type) {
    case USER_LOGIN:
      return { ...state, ...action.payload };

    case USER_LOGOUT:
      return { ...action.payload };
    
    default:
      return state;
  }
}
