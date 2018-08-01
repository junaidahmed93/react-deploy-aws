import CONSTANTS from '../constants/actionConstants';
import AddVehicleSource from '../sources/AddVehicleSource';
import * as loaderActions from './loaderActions';

export function addVehicleSuccess() {
  return {
    type: CONSTANTS.ADD_VEHICLE_SUCCESS,
  };
}

export function addVehicleFail() {
  return {
    type: CONSTANTS.ADD_VEHICLE_FAIL,
  };
}
export function addVehicle(vehicleObj) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return AddVehicleSource.addVehicle(vehicleObj)
      .then((opsporter) => {
        dispatch(loaderActions.loaderStop());
        dispatch(addVehicleSuccess(opsporter));
        // dispatch(addUserSuccessAfter())
      })
      .catch(() => {
        dispatch(loaderActions.loaderStop());
        dispatch(addVehicleFail());
      });
  };
}

