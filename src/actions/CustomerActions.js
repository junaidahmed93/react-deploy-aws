import CONSTANTS from '../constants/actionConstants';
import * as LoaderActions from './loaderActions';
import CustomerSource from '../sources/CustomerSource';
import MessageBox from '../components/MessageBox';

export function getCustomerSuccess(customers) {
  const action = {
    type: CONSTANTS.GET_CUSTOMER_SUCCESS,
    customers,
  };
  return action;
}

export function getCustomerFail(message) {
  const action = {
    type: CONSTANTS.GET_CUSTOMER_FAIL,
    message,
  };
  return action;
}

export function CustomerNotificationSuccess(notificationList) {
  const action = {
    type: CONSTANTS.CUSTOMER_NOTIFICATION_SUCCESS,
    notificationList,
  };
  return action;
}

export function CustomerNotificationFail() {
  const action = {
    type: CONSTANTS.CUSTOMER_NOTIFICATION_FAIL,
  };
  return action;
}


export function getAllNotificationSuccess(notificationList) {
  const action = {
    type: CONSTANTS.GET_ALL_NOTIFICATION_SUCCESS,
    notificationList,
  };
  return action;
}

export function getAllNotificationFail(message) {
  const action = {
    type: CONSTANTS.GET_ALL_NOTIFICATION_FAIL,
    message,
  };
  return action;
}

export function resetStatus() {
  return (dispatch) => {
    dispatch(CustomerNotificationFail());
  };
}

export function sendNotifications(notificationDto) {
  return (dispatch) => {
    dispatch(LoaderActions.loaderStart());
    return CustomerSource.sendNotifications(notificationDto)
      .then(() => {
        dispatch(LoaderActions.loaderStop());
        MessageBox('Notification Sent', 'success');
        dispatch(CustomerNotificationSuccess());
      })
      .catch((err) => {
        dispatch(LoaderActions.loaderStop());
        dispatch(CustomerNotificationFail());
        MessageBox(err.message, 'error');
      });
  };
}

export function getAllCustomer() {
  return (dispatch) => {
    dispatch(LoaderActions.loaderStart());
    return CustomerSource.getAllCustomer()
      .then((res) => {
        dispatch(LoaderActions.loaderStop());
        dispatch(getCustomerSuccess(res.data));
      })
      .catch((err) => {
        dispatch(LoaderActions.loaderStop());
        dispatch(getCustomerFail());
        MessageBox(err.message, 'error');
      });
  };
}

export function getAllNotifications() {
  return (dispatch) => {
    dispatch(LoaderActions.loaderStart());
    return CustomerSource.getAllNotifications()
      .then((res) => {
        dispatch(LoaderActions.loaderStop());
        dispatch(getAllNotificationSuccess(res.data));
      })
      .catch((err) => {
        dispatch(LoaderActions.loaderStop());
        dispatch(getAllNotificationFail());
        MessageBox(err.message, 'error');
      });
  };
}

