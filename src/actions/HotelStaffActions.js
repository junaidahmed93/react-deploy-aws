import CONSTANTS from '../constants/actionConstants';
import * as loaderActions from './loaderActions';
import MessageBox from '../components/MessageBox';
import HotelStaffSource from '../sources/HotelStaffSource';

export function addHotelStaffSuccess(hotelStaff) {
  const action = {
    type: CONSTANTS.ADD_HOTEL_STAFF_SUCCESS,
    hotelStaff,
  };
  return action;
}
export function addHotelStaffFail() {
  const action = {
    type: CONSTANTS.ADD_HOTEL_STAFF_FAIL,
  };
  return action;
}

export function getHotelStaffSuccess(staffList) {
  const action = {
    type: CONSTANTS.GET_HOTEL_STAFF_SUCCESS,
    staffList,
  };
  return action;
}
export function getHotelStaffFail() {
  const action = {
    type: CONSTANTS.GET_HOTEL_STAFF_FAIL,
  };
  return action;
}

export function getHotelStaffProfileSuccess(hotelStaffProfile) {
  const action = {
    type: CONSTANTS.GET_HOTEL_STAFF_PROFILE_SUCCESS,
    hotelStaffProfile,
  };
  return action;
}

export function getHotelStaffProfileFail() {
  const action = {
    type: CONSTANTS.GET_HOTEL_STAFF_PROFILE_FAIL,
  };
  return action;
}

export function hotelStaffUpdateSuccess() {
  const action = {
    type: CONSTANTS.UPDATE_HOTEL_STAFF_SUCCESS,
  };
  return action;
}

export function HotelStaffUpdateFail() {
  const action = {
    type: CONSTANTS.UPDATE_HOTEL_STAFF_FAIL,
  };
  return action;
}

export function HotelStaffProfile(id) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return HotelStaffSource.HotelStaffProfile(id)
      .then((HotelStaff) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getHotelStaffProfileSuccess(HotelStaff.data));
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getHotelStaffProfileFail());
        MessageBox(err.message, 'error');
      });
  };
}
export function addHotelStaff(staff) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return HotelStaffSource.addHotelStaff(staff)
      .then((HotelStaff) => {
        dispatch(loaderActions.loaderStop());
        dispatch(addHotelStaffSuccess(HotelStaff));
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(addHotelStaffFail());
        MessageBox(err.message, 'error');
      });
  };
}

export function getHotelStaff() {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return HotelStaffSource.getAllHotelStaff()
      .then((HotelStaff) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getHotelStaffSuccess(HotelStaff));
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getHotelStaffFail());
        MessageBox(err.message, 'error');
      });
  };
}

export function updateHotelStaff(HotelStaff) {
  return dispatch =>
    HotelStaffSource.updateHotelStaff(HotelStaff)
      .then(() => {
        dispatch(loaderActions.loaderStop());
        dispatch(hotelStaffUpdateSuccess());
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(HotelStaffUpdateFail());
        MessageBox(err.message, 'error');
      });
}

