import CONSTANTS from '../constants/actionConstants';

export function showNotification(message) {
  const action = {
    type: CONSTANTS.SHOW_NOTIFICATION,
    message,
  };
  return action;
}
export function hideNotification() {
  const action = {
    type: CONSTANTS.HIDE_NOTIFICATION,
  };
  return action;
}

export function displayNotifcation(message) {
  return (dispatch) => {
    dispatch(showNotification(message));
  };
}

export function removeNotification() {
  return (dispatch) => {
    dispatch(hideNotification());
  };
}
