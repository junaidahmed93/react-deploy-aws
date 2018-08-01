import CONSTANTS from '../constants/actionConstants';
import * as loaderActions from './loaderActions';
import ForgetPasswordSource from '../sources/ForgetPasswordSource';
import MessageBox from '../components/MessageBox';

export function forgetPasswordCodeSendSuccess() {
  const action = {
    type: CONSTANTS.FORGET_PASSWORD_CODE_SEND_SUCCESS,
  };
  return action;
}
export function forgetPasswordCodeSendFail() {
  const action = {
    type: CONSTANTS.FORGET_PASSWORD_CODE_SEND_FAIL,
  };
  return action;
}

export function forgetPasswordCodeVerifySucess(token) {
  const action = {
    type: CONSTANTS.FORGET_PASSWORD_CODE_VERIFY_SUCCESS,
    token,
  };
  return action;
}

export function forgetPasswordCodeVerifyFail() {
  const action = {
    type: CONSTANTS.FORGET_PASSWORD_CODE_VERIFY_FAIL,
  };
  return action;
}

function passwordResetSuccess() {
  const action = {
    type: CONSTANTS.PASSWORD_RESET_SUCCESS,
  };
  return action;
}

function passwordResetFail() {
  const action = {
    type: CONSTANTS.PASSWORD_RESET_FAIL,
  };
  return action;
}

export function resetAllForgetPasswordStates() {
  const action = {
    type: CONSTANTS.RESET_ALL_STATE,
  };
  return action;
}

export function sendCode(user) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return ForgetPasswordSource.sendCode(user)
      .then(() => {
        dispatch(loaderActions.loaderStop());
        MessageBox('Code has been sent', 'success');
        dispatch(forgetPasswordCodeSendSuccess());
      })
      .catch((error) => {
        dispatch(loaderActions.loaderStop());
        MessageBox(error, 'error');
        dispatch(forgetPasswordCodeSendFail());
      });
  };
}

export function verifyCode(code) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return ForgetPasswordSource.verifyCode(code)
      .then((token) => {
        dispatch(loaderActions.loaderStop());
        MessageBox('Code verified: Enter new password', 'error');
        dispatch(forgetPasswordCodeVerifySucess(token));
      })
      .catch((error) => {
        dispatch(loaderActions.loaderStop());
        MessageBox(error, 'error');
        dispatch(forgetPasswordCodeVerifyFail());
      });
  };
}

export function setNewPassword(user) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return ForgetPasswordSource.setNewPassword(user)
      .then(() => {
        dispatch(loaderActions.loaderStop());
        MessageBox('New Password updated', 'error');
        dispatch(passwordResetSuccess());
      })
      .catch((error) => {
        dispatch(loaderActions.loaderStop());
        MessageBox(error, 'error');
        dispatch(passwordResetFail());
      });
  };
}
