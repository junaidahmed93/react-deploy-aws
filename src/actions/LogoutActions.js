import CONSTANTS from '../constants/actionConstants';
import * as loaderActions from './loaderActions';
import MessageBox from '../components/MessageBox';
import LogoutSource from '../sources/LogoutSource';
import { store } from '../store';

export function requestLogOutUser() {
  const action = {
    type: CONSTANTS.LOGOUT_USER,
  };
  return action;
}
export function logOutSuccess() {
  const action = {
    type: CONSTANTS.LOG_OUT,
  };
  return action;
}
export function logOutFail(error) {
  const action = {
    type: CONSTANTS.LOGOUT_FAIL,
    error,
  };
  return action;
}


export function forceLogOut() {
  store.dispatch(loaderActions.loaderStop());
  store.dispatch(requestLogOutUser());
}

export function logOutUser() {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return LogoutSource.requestLogOutSource()
      .then(() => {
        dispatch(loaderActions.loaderStop());
        dispatch(requestLogOutUser());
        localStorage.clear();
      })
      .catch((err) => {
        dispatch(requestLogOutUser());
        dispatch(loaderActions.loaderStop());
        MessageBox(err.message, 'error');
      });
  };
}
