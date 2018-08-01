
import request from 'superagent';
// import { message } from 'antd';
import { browserHistory } from 'react-router';
import APIURL from '../constants/apiUrlConstants';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';
import { AuthIntercept } from './LogoutSource';

const CommonSource = {
  getCountryList() {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });

    return new Promise((resolve, reject) => {
      request.get(APIURL.GET_COUNTRY_LIST)
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, res) => {
          if (res && res.text) {
            const responseData = JSON.parse(res.text);
            if (responseData && responseData.data && responseData.data.countryList) {
              resolve({ requestedResult: true, data: responseData.data.countryList });
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
  getAirports() {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });

    return new Promise((resolve, reject) => {
      request.get(APIURL.GET_AIRPORT_LIST)
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
  getServiceArea() {
    const token = loadState().token;
    // const token = 'b12357fd5bb445088ab038acb08040de';
    const header = Object.assign({}, APIURL.API_HEADERS, { token });

    return new Promise((resolve, reject) => {
      request.get(APIURL.GET_SERVICEAREA_LIST)
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
  getPromoTypes() {
    const token = loadState().token;
    // const token = 'b12357fd5bb445088ab038acb08040de';
    const header = Object.assign({}, APIURL.API_HEADERS, { token });

    return new Promise((resolve, reject) => {
      request.get(APIURL.GET_PROMO_TYPES)
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
  getCommonImages(booking) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });
    return new Promise((resolve, reject) => {
      getPorterImages(booking.luggageList, resolve);
    });

    async function runAjax(item) {
      /* eslint no-shadow: "off" */
      return new Promise((resolve1) => {
        const imageURL = APIURL.IMAGES.replace('{fileName}', item.luggageImageurl);
        request.get(imageURL)
          .use(AuthIntercept).accept('image/jpeg')
          .set(header)
          .responseType('blob')
          .timeout(30000)
          .end((errInGetImg, responseGetImages) => {
            const reader = new FileReader();
            reader.readAsDataURL(responseGetImages.body);
            reader.onloadend = () => {
              const base64data = reader.result;
              resolve1(base64data);
            };
          });
      });
    }

    async function getPorterImages(imagesName, resolve) {
      const result = [];
      for (let i = 0; i < imagesName.length; i++) {
        const dataURL = await runAjax(imagesName[i], imagesName);
        result.push({ dataURL, imagesName: imagesName[i] });
      }
      resolve({ requestedResult: true, data: result });
    }
  },
  getBookingCancelReasons() {
    const token = loadState().token;
    // const token = 'b12357fd5bb445088ab038acb08040de';
    const header = Object.assign({}, APIURL.API_HEADERS, { token });

    return new Promise((resolve, reject) => {
      request.get(APIURL.CANCEL_BOOKING_REASON)
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
  getBatch() {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });

    return new Promise((resolve, reject) => {
      request.get(APIURL.BATCH)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, res) => {
          if (res && res.text) {
            const responseData = JSON.parse(res.text);
            if (responseData && responseData.data && responseData.data.currentBatchList) {
              resolve({ requestedResult: true, data: responseData.data.currentBatchList });
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
  staffActivation(userId, staff) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token, userId });

    return new Promise((resolve, reject) => {
      request.put(APIURL.STAFF_ACTIVATION)
        .set(header)
        .timeout(30000)
        .end((err, res) => {
          if (res && res.text) {
            const responseData = JSON.parse(res.text);
            if (responseData && responseData.success && responseData.success === true) {
              browserHistory.push(`/home/admin/${staff}`);
              resolve({ requestedResult: true });
            }
            if (responseData && responseData.success && responseData.success === false) {
              const responseErrorMessage = responseData.errors[0].errorMessage;
              resolve({ requestedResult: false, message: responseErrorMessage });
            }
          } else {
            const handleError = ErrorMapping.unhandleError(err);
            reject({ requestedResult: false, message: handleError });
          }
        });
    });
  },
  staffDeActivation(userId, staff) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token, userId });
    return new Promise((resolve, reject) => {
      request.put(APIURL.STAFF_DEACTIVATION)
        .set(header)
        .timeout(30000).end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              browserHistory.push(`/home/admin/${staff}`);
              resolve({ requestedResult: true, data: responseData.data });
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
};

export default CommonSource;
