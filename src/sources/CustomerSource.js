
import request from 'superagent';
import { browserHistory } from 'react-router';
import APIURL from '../constants/apiUrlConstants';
import { loadState } from '../utils/StorageUtils';
import { AuthIntercept } from './LogoutSource';

const CustomerSource = {
  getAllCustomer() {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });

    return new Promise((resolve, reject) => {
      request.get(APIURL.GET_CUSTOMER_LIST)
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, res) => {
          if (res && res.text) {
            const responseData = JSON.parse(res.text);
            if (responseData && responseData.data && responseData.data) {
              resolve({ requestedResult: true, data: responseData.data });
            }
            if (responseData && responseData.data === null) {
              const responseErrorMessage = responseData.errors[0].errorMessage;
              resolve({ requestedResult: false, message: responseErrorMessage });
            }
          } else {
            reject(err);
          }
        });
    });
  },
  getAllNotifications() {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });

    return new Promise((resolve, reject) => {
      request.get(APIURL.GET_ALL_NOTIFICATION)
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, res) => {
          if (res && res.text) {
            const responseData = JSON.parse(res.text);
            if (responseData && responseData.data && responseData.data) {
              resolve({ requestedResult: true, data: responseData.data });
            }
            if (responseData && responseData.data === null) {
              const responseErrorMessage = responseData.errors[0].errorMessage;
              resolve({ requestedResult: false, message: responseErrorMessage });
            }
          } else {
            reject(err);
          }
        });
    });
  },
  sendNotifications(notificationDto) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });
    const payload = {
      message: notificationDto.notification,
      title: notificationDto.title,
      sendToAll: notificationDto.sendToAll,
      users: notificationDto.customerIds,
    };
    return new Promise((resolve, reject) => {
      request.post(APIURL.NOTIFICATION)
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .send(payload)
        .timeout(30000)
        .end((err, res) => {
          if (res && res.text) {
            const responseData = JSON.parse(res.text);
            if (responseData && responseData.success && responseData.success === true) {
              browserHistory.push('/home/admin/customer-notification');
              resolve({ requestedResult: true, data: responseData.data });
            }
            if (responseData && responseData.success && responseData.success === false) {
              resolve({ requestedResult: false, message: 'Notification Sending Failed' });
            }
          } else {
            reject(err);
          }
        });
    });
  },
};

export default CustomerSource;
