import CONSTANTS from '../constants/actionConstants';
import MessageBox from '../components/MessageBox';
import DashboardSource from '../sources/DashboardSource';
import * as loaderActions from './loaderActions';

export function getDriporterLocationSuccess(driporterLocations) {
  const action = {
    type: CONSTANTS.GET_DRIPORTER_LOCATION_SUCCESS,
    driporterLocations,
  };
  return action;
}
export function getDriporterLocationFail() {
  const action = {
    type: CONSTANTS.GET_DRIPORTER_LOCATION_FAIL,
  };
  return action;
}

export function getBookingsPerCitySuccess(bookingsPerCity) {
  const action = {
    type: CONSTANTS.GET_BOOKINGS_PER_CITY_SUCCESS,
    bookingsPerCity,
  };
  return action;
}

export function getBookingsPerCitySuccessAfter() {
  const action = {
    type: CONSTANTS.GET_BOOKINGS_PER_CITY_SUCCESS_AFTER,
  };
  return action;
}

export function getBookingsPerCityFail() {
  const action = {
    type: CONSTANTS.GET_BOOKINGS_PER_CITY_FAIL,
  };
  return action;
}

export function getRegistrationPerCitySuccess(registrationsPerCityWeeklyReport) {
  const action = {
    type: CONSTANTS.GET_REGISTRATION_PER_CITY_SUCCESS,
    registrationsPerCityWeeklyReport,
  };
  return action;
}

export function getRegistrationPerCitySuccessAfter() {
  const action = {
    type: CONSTANTS.GET_REGISTRATION_PER_CITY_SUCCESS_AFTER,
  };
  return action;
}

export function getRegistrationPerCityFail() {
  const action = {
    type: CONSTANTS.GET_REGISTRATION_PER_CITY_FAIL,
  };
  return action;
}

export function getBookingsPerChannelSuccess(bookingsPerCity) {
  const action = {
    type: CONSTANTS.GET_BOOKINGS_PER_CHANNEL_SUCCESS,
    bookingsPerCity,
  };
  return action;
}

export function getBookingsPerChannelSuccessAfter() {
  const action = {
    type: CONSTANTS.GET_BOOKINGS_PER_CHANNEL_SUCCESS_AFTER,
  };
  return action;
}

export function getBookingsPerChannelFail() {
  const action = {
    type: CONSTANTS.GET_BOOKINGS_PER_CHANNEL_FAIL,
  };
  return action;
}


export function getBookingPerCity(chartData) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    DashboardSource.getBookingPerCity(chartData)
      .then((response) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getBookingsPerCitySuccess(response.data));
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getBookingsPerCitySuccess());
        MessageBox(err.message, 'error');
      });
  };
}

export function getRegistrationPerCity(chartData) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    DashboardSource.getRegistrationPerCity(chartData)
      .then((response) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getRegistrationPerCitySuccess(response.data));
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getRegistrationPerCityFail());
        MessageBox(err.message, 'error');
      });
  };
}

export function getBookingPerChannel(chartData) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    DashboardSource.getBookingPerChannel(chartData)
      .then((response) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getBookingsPerChannelSuccess(response.data));
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getBookingsPerChannelFail());
        MessageBox(err.message, 'error');
      });
  };
}

export function getDriportersLocation() {
  return dispatch =>
    DashboardSource.getDriporterLocations()
      .then((partner) => {
        dispatch(getDriporterLocationSuccess(partner.data));
      })
      .catch((err) => {
        dispatch(getDriporterLocationFail());
        MessageBox(err.message, 'error');
      });
}
