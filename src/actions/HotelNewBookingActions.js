import CONSTANTS from '../constants/actionConstants';
import HotelNewBookingSource from '../sources/HotelNewBookingSource';
import * as LoaderActions from './loaderActions';
import * as NotificationActions from './NotificationActions';
import MessageBox from '../components/MessageBox';

export function addHotelBookingSuccess() {
  const action = {
    type: CONSTANTS.ADD_HOTEL_BOOKING_SUCCESS,

  };
  return action;
}
export function addHotelBookingFail() {
  const action = {
    type: CONSTANTS.ADD_HOTEL_BOOKING_FAIL,

  };
  return action;
}

export function addHotelBookingSuccessAfter() {
  const action = {
    type: CONSTANTS.ADD_HOTEL_BOOKING_SUCCESS_AFTER,

  };
  return action;
}

export function addNewBooking(booking) {
  return (dispatch) => {
    dispatch(LoaderActions.loaderStart());
    return HotelNewBookingSource.addNewBooking(booking)
      .then((res) => {
        dispatch(LoaderActions.loaderStop());
        if (res && res.requestedResult === true) {
          dispatch(addHotelBookingSuccess());
        } else {
          MessageBox(res.message, 'error');
        }
      })
      .catch((err) => {
        dispatch(LoaderActions.loaderStop());
        dispatch(addHotelBookingFail());
        MessageBox(err.message, 'error');
      });
  };
}

