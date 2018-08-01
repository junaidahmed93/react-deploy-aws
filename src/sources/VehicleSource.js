
import request from 'superagent';
import intercept from 'superagent-intercept';
import { browserHistory } from 'react-router';
import APIURL from '../constants/apiUrlConstants';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';
import Converters from '../utils/Converters';
import { AuthIntercept } from './LogoutSource';

const addVehicleDataMapping = (vehicle) => {
  const vehicleData = {
    model: vehicle.model,
    type: vehicle.type,
    engineNumber: vehicle.engineNumber,
    chassisNumber: vehicle.chassisNumber,
    insuranceNumber: vehicle.insuranceNumber,
    insuranceExpiry: Converters.vehicleDateConverter(vehicle.insuranceExpiry),
    engineType: vehicle.engineType,
    registrationNumber: vehicle.registrationNumber,
    colour: vehicle.colour,
    numberPlate: vehicle.numberPlate,
    loadCapacity: vehicle.loadCapacity,
    carImageUrl: vehicle.carImageUrl,
    leftSideImageUrl: vehicle.leftSideImageUrl,
    rightSideImageUrl: vehicle.rightSideImageUrl,
    engineSideImageUrl: vehicle.engineSideImageUrl,
    backSideImageUrl: vehicle.backSideImageUrl,
  };
  return vehicleData;
};

const editVehicleDataMapping = (vehicle) => {
  const vehicleData = {
    id: vehicle.id,
    model: vehicle.model,
    type: vehicle.type,
    engineNumber: vehicle.engineNumber,
    chassisNumber: vehicle.chassisNumber,
    insuranceNumber: vehicle.insuranceNumber,
    insuranceExpiry: Converters.vehicleDateConverter(vehicle.insuranceExpiry),
    engineType: vehicle.engineType,
    registrationNumber: vehicle.registrationNumber,
    colour: vehicle.colour,
    numberPlate: vehicle.numberPlate,
    loadCapacity: vehicle.loadCapacity,
    carImageUrl: vehicle.carImageUrl,
    leftSideImageUrl: vehicle.leftSideImageUrl,
    rightSideImageUrl: vehicle.rightSideImageUrl,
    engineSideImageUrl: vehicle.engineSideImageUrl,
    backSideImageUrl: vehicle.backSideImageUrl,
  };
  return vehicleData;
};

const VehicleSource = {
  getAllVehicle() {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });
    return new Promise((resolve, reject) => {
      request.get(APIURL.GET_VEHICLE)
        .use(intercept((ERRORs) => {
          if (ERRORs) {
            const handleError = ErrorMapping.unhandleError(ERRORs);
            reject({ requestedResult: false, message: handleError });
          }
        }))
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(10000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
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
  addVehicle(vehicle) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token, deviceId: '123', OSVersion: 'win10' });
    const payload = addVehicleDataMapping(vehicle);
    return new Promise((resolve, reject) => {
      request.post(APIURL.VEHICLE_REGISTER)
        .send(payload)
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              browserHistory.push('/home/admin/vehicle');
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
  vehicleProfile(id) {
    const result = {};
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, {
      token, deviceId: '123', OSVersion: 'win10', vehicleId: id,
    });
    const url = APIURL.GET_VEHICLE;
    return new Promise((resolve, reject) => {
      request.get(url)
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          async function runAjax(item) {
            /* eslint no-shadow: "off" */
            return new Promise((resolve, reject) => {
              const imageURL = APIURL.IMAGES.replace('{fileName}', item.fileName);
              request.get(imageURL)
                .use(AuthIntercept).accept('image/jpeg')
                .set(header)
                .responseType('blob')
                .timeout(30000)
                .end((errInGetImg, responseGetImages) => {
                  const reader = new FileReader();
                  if (responseGetImages && responseGetImages.body) {
                    reader.readAsDataURL(responseGetImages.body);
                    reader.onloadend = () => {
                      const base64data = reader.result;
                      resolve(base64data);
                    };
                  } else {
                    reject('');
                  }
                });
            });
          }
          async function getPorterImages(imagesName, responseData) {
            for (const item of imagesName) {
              result[item.type] = await runAjax(item, imagesName);
            }
            const vehicleProfile = Object.assign({}, responseData.data.vehicleList[0], result);
            resolve({ requestedResult: true, data: vehicleProfile });
          }
          if (response && response.text) {
            const responseData = JSON.parse(response.text);

            if (responseData && responseData.success === true) {
              const resData = responseData.data.vehicleList[0];
              const imagesName = [];
              imagesName.push(
                { fileName: resData.backSideImageUrl, type: 'backSideImageUrl' },
                { fileName: resData.carImageUrl, type: 'carImageUrl' },
                { fileName: resData.engineSideImageUrl, type: 'engineSideImageUrl' },
                { fileName: resData.leftSideImageUrl, type: 'leftSideImageUrl' },
                { fileName: resData.rightSideImageUrl, type: 'rightSideImageUrl' },
              );
              getPorterImages(imagesName, responseData);
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
  updateVehicleOld(vehicle) {
    const token = loadState().token;
    const header = Object.assign({}, { token, deviceId: '123' });
    const payload = Object.assign({}, editVehicleDataMapping(vehicle), { id: vehicle.id });
    const parseOb = JSON.stringify(payload);

    return new Promise((resolve, reject) => {
      request.put(APIURL.VEHICLE_REGISTER)
        // .send(data)
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .field('userDetails', parseOb)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              browserHistory.push('/home/admin/vehicle');
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
  updateVehicle(vehicle) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token, deviceId: '123', OSVersion: 'win10' });
    const payload = editVehicleDataMapping(vehicle);
    return new Promise((resolve, reject) => {
      request.post(APIURL.VEHICLE_REGISTER)
        .send(payload)
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              browserHistory.push('/home/admin/vehicle');
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
  assignVehicle(obj) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });
    return new Promise((resolve, reject) => {
      request.post(APIURL.ASSIGN_VEHICLE)
        .accept(APIURL.APPLICATION_TYPE)
        .send(obj)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
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

export default VehicleSource;
