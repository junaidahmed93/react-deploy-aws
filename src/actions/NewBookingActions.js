import CONSTANTS from '../constants/actionConstants';
import NewBookingSource from '../sources/NewBookingSource';
import * as LoaderActions from './loaderActions';
import MessageBox from '../components/MessageBox';

export function newHotelBookingSuccess() {
  const action = {
    type: CONSTANTS.NEW_BOOKING_SUCCESS,

  };
  return action;
}
export function newBookingFail() {
  const action = {
    type: CONSTANTS.NEW_BOOKING_FAIL,

  };
  return action;
}

export function newBookingSuccessAfter() {
  const action = {
    type: CONSTANTS.NEW_BOOKING_SUCCESS_AFTER,

  };
  return action;
}

export function flightStatsSuccess(flightDetails) {
  const action = {
    type: CONSTANTS.FLIGHT_STATS_SUCCESS,
    flightDetails,
  };
  return action;
}

export function flightStatsFail() {
  const action = {
    type: CONSTANTS.FLIGHT_STATS_FAIL,
  };
  return action;
}

export function flightStatsSuccessAfter() {
  const action = {
    type: CONSTANTS.FLIGHT_STATS_SUCCESS_AFTER,
  };
  return action;
}

// export function getFlightStats(flightInput) {
//     return dispatch => {
//         dispatch(LoaderActions.loaderStart());
//         dispatch(flightStatsSuccessAfter());
//         return NewBookingSource.getFlightStats(flightInput)
//             .then((res) => {
//                 dispatch(LoaderActions.loaderStop());
//                 if (res.requestedResult === true) {
//                     dispatch(flightStatsSuccess(res.data));
//                 }
//                 if (res.requestedResult === false) {
//                     dispatch(flightStatsFail());
//                     dispatch(NotificationActions.showNotification('No Scheduled flight'));
//                 }
//             })
//             .catch((err) => {
//                 dispatch(LoaderActions.loaderStop());
//                 dispatch(flightStatsFail());
//                  MessageBox(err.message, 'error');
//             })
//     };
// }

export function newBooking(booking) {
  return (dispatch) => {
    dispatch(LoaderActions.loaderStart());
    return NewBookingSource.newBooking(booking)
      .then((res) => {
        dispatch(LoaderActions.loaderStop());
        dispatch(newHotelBookingSuccess(res.data));
      })
      .catch((err) => {
        dispatch(LoaderActions.loaderStop());
        dispatch(newBookingFail());
        MessageBox(err.message, 'error');
      });
  };
}

