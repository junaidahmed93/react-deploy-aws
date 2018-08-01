
import request from 'superagent';
import APIURL from '../constants/apiUrlConstants';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';
import { AuthIntercept } from './LogoutSource';

const DashboardSource = {

  getDriporterLocations() {
    const user = loadState();
    const token = user.token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });
    const URL = APIURL.GET_DRIPORTER_LOCATIONS;
    return new Promise((resolve, reject) => {
      request.get(URL)
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const driporterLocationInfo = [];
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              const allDriporter = responseData.data;

              for (let i = 0; i < allDriporter.length; i++) {
                const t = Object.assign({}, allDriporter[i], { lat: allDriporter[i].latitude, lng: allDriporter[i].longitude });
                driporterLocationInfo.push(t);
              }

              // let temp;
              // const data4 = JSON.parse(localStorage.getItem('location'));
              // if (data4) {
              //   let lt = data4[0].lat;
              //   let lg = data4[0].lng;
              //   lt = Number(lt) + 0.000150;
              //   lg = Number(lg) - 0.000300;

              //   let lt1 = data4[0].lat;
              //   let lg1 = data4[0].lng;
              //   lt1 = Number(lt1) + 0.000450;
              //   lg1 = Number(lg1) - 0.000900;
              //   temp = [
              //     { lat: lt, lng: lg },
              //     { lat: lt1, lng: lg1 },
              //   ];
              //   localStorage.setItem('location', JSON.stringify(temp));
              // } else {
              //   temp = [
              //     { lat: 25.202505, lng: 55.275397 },
              //     { lat: 25.202711, lng: 55.275048 },
              //   ];
              //   localStorage.setItem('location', JSON.stringify(temp));
              // }

              resolve({ requestedResult: true, data: driporterLocationInfo });
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
  getBookingPerCity(obj) {
    const user = loadState();
    const token = user.token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });
    const URL = APIURL.BOOKING_PER_CITY.replace('{fromDate}', obj.fromDate).replace('{regionId}', obj.regionId);
    return new Promise((resolve, reject) => {
      request.get(URL)
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              resolve({ requestedResult: true, data: responseData.data.bookingsPerCityWeeklyReport });
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
  getRegistrationPerCity(obj) {
    const user = loadState();
    const token = user.token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });
    const URL = APIURL.REGISTRATION_PER_CITY.replace('{fromDate}', obj.fromDate).replace('{regionId}', obj.regionId);
    return new Promise((resolve, reject) => {
      request.get(URL)
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              resolve({ requestedResult: true, data: responseData.data.registrationsPerCityWeeklyReport });
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

export default DashboardSource;
