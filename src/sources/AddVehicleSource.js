import request from 'superagent';
import APIURL from '../constants/apiUrlConstants';
import { loadState } from '../utils/StorageUtils';

const AddVehicleSource = {
  addVehicle(vehicle) {
    const token = loadState().token;
    const header = Object.assign({ token, testString: 'car string' });

    return new Promise((resolve, reject) => {
      request
        .post(APIURL.TEST_VEHICLE)
        .field('testPart', 'Tobi')
        .set(header)
        .attach('file', vehicle.vehicleFrontImage)
        .attach('file', vehicle.vehicleLeftView)
        .then((res) => {
          resolve(res);
        }, (error) => {
          reject(error);
        });
    });
  },
};

export default AddVehicleSource;
