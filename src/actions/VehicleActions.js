import CONSTANTS from '../constants/actionConstants';
import * as loaderActions from './loaderActions';
import VehicleSource from '../sources/VehicleSource';
import * as NotificationActions from './NotificationActions';
import MessageBox from '../components/MessageBox';

export function addVehicleSuccess(vehicle) {
  const action = {
    type: CONSTANTS.ADD_VEHICLE_SUCCESS,
    vehicle,
  };
  return action;
}
export function addVehicleFail() {
  const action = {
    type: CONSTANTS.ADD_VEHICLE_FAIL,
  };
  return action;
}

export function getVehicleSuccess(vehicle) {
  const action = {
    type: CONSTANTS.GET_VEHICLE_SUCCESS,
    vehicle,
  };
  return action;
}
export function getVehicleFail() {
  const action = {
    type: CONSTANTS.GET_VEHICLE_FAIL,
  };
  return action;
}

export function getVehicleProfileSuccess(vehicle) {
  const action = {
    type: CONSTANTS.GET_VEHICLE_PROFILE_SUCCESS,
    vehicle,
  };
  return action;
}

export function getVehicleProfileFail() {
  const action = {
    type: CONSTANTS.GET_VEHICLE_PROFILE_FAIL,
  };
  return action;
}

export function vehicleUpdateSuccess() {
  const action = {
    type: CONSTANTS.UPDATE_VEHICLE_SUCCESS,
  };
  return action;
}

export function vehicleUpdateFail() {
  const action = {
    type: CONSTANTS.UPDATE_VEHICLE_FAIL,
  };
  return action;
}

export function assignVehicleSuccess() {
  const action = {
    type: CONSTANTS.ASSIGN_VEHICLE_SUCCESS,
  };
  return action;
}

export function assignVehicleFail() {
  const action = {
    type: CONSTANTS.ASSIGN_VEHICLE_FAIL,
  };
  return action;
}

export function clearVehicleProfile() {
  const action = {
    type: CONSTANTS.CLEAR_VEHICLE_PROFILE,
  };
  return action;
}

export function assignVehicle(obj) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return VehicleSource.assignVehicle(obj)
      .then((vehicle) => {
        dispatch(loaderActions.loaderStop());
        dispatch(assignVehicleSuccess(vehicle));
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(assignVehicleFail());
        MessageBox(err.message, 'error');
      });
  };
}

export function vehicleProfile(id) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return VehicleSource.vehicleProfile(id)
      .then((vehicle) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getVehicleProfileSuccess(vehicle.data));
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getVehicleProfileFail());
        MessageBox(err.message, 'error');
      });
  };
}

export function addVehicle(vehicle) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    VehicleSource.addVehicle(vehicle)
      .then((res) => {
        dispatch(loaderActions.loaderStop());
        dispatch(addVehicleSuccess(res));
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(addVehicleFail());
        MessageBox(err.message, 'error');
      });
  };
}
export function getVehicle() {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return VehicleSource.getAllVehicle()
      .then((Vehicle) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getVehicleSuccess(Vehicle.data.vehicleList));
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getVehicleFail());
        MessageBox(err.message, 'error');
      });
  };
}

export function updateVehicle(vehicle) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return VehicleSource.updateVehicle(vehicle)
      .then((updated) => {
        dispatch(loaderActions.loaderStop());
        dispatch(vehicleUpdateSuccess());
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(vehicleUpdateFail());
        MessageBox(err.message, 'error');
      });
  };
}

