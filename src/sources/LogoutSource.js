
import request from 'superagent';
import Auth1Intercept from 'superagent-intercept';
import APIURL from '../constants/apiUrlConstants';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';
import { forceLogOut } from '../actions/LogoutActions';

export const AuthIntercept = Auth1Intercept((err, res) => {
  if (res && res.text) {
    const parsedResponse = JSON.parse(res.text);
    if (parsedResponse && parsedResponse.errors && parsedResponse.errors[0]) {
      if (parsedResponse.errors[0].errorCode === 1 || parsedResponse.errors[0].errorCode === '1') {
        forceLogOut();
        localStorage.clear();
      }
    }
    if (parsedResponse && parsedResponse.status === 400) {
      forceLogOut();
      localStorage.clear();
    }
  } else {
    // forceLogOut();
    // localStorage.clear();
  }
});


const LogoutSource = {
  requestLogOutSource() {
    const user = loadState();
    const header = Object.assign({}, APIURL.API_HEADERS, { token: user.token });
    return new Promise((resolve, reject) => {
      request
        .post(APIURL.LOGOUT)
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              resolve({ requestedResult: true });
            }
            if (responseData && responseData.success === false) {
              const handleError = ErrorMapping.serverDefinedError(responseData);
              reject({ requestedResult: false, message: handleError });
            }
          } else {
            const handleError = ErrorMapping.unhandleError(err);
            reject({ requestedResult: false, message: handleError });
          }
        });
    });
  },
  forceLogOut() {
    return new Promise((resolve) => {
      resolve();
    });
  },
};

export default LogoutSource;
