import CONSTANTS from '../constants/actionConstants';
import MessageBox from '../components/MessageBox';
import * as LoaderActions from './loaderActions';
import GetBookingSource from '../sources/GetBookingSource';
import NewBookingSource from '../sources/NewBookingSource';

export function getBookingSuccess(bookings) {
  const action = {
    type: CONSTANTS.GET_BOOKING_SUCCESS,
    bookings,
  };
  return action;
}

export function getBookingFail(message) {
  const action = {
    type: CONSTANTS.GET_BOOKING_FAIL,
    message,
  };
  return action;
}

export function enableCashMethod(id) {
  return (dispatch) => {
    dispatch(LoaderActions.loaderStart());
    return NewBookingSource.enableCashMethod(id)
      .then(() => {
        dispatch(LoaderActions.loaderStop());
      })
      .catch((err) => {
        dispatch(LoaderActions.loaderStop());
        MessageBox(err.message, 'error');
      });
  };
}

export function cancelBooking(booking) {
  return (dispatch) => {
    dispatch(LoaderActions.loaderStart());
    return NewBookingSource.cancelBooking(booking)
      .then(() => {
        dispatch(LoaderActions.loaderStop());
      })
      .catch((err) => {
        dispatch(LoaderActions.loaderStop());
        MessageBox(err.message, 'error');
      });
  };
}
export function getAllBookings(isLoader) {
  return (dispatch) => {
    if (isLoader === 'showLoader') {
      dispatch(LoaderActions.loaderStart());
    }
    GetBookingSource.getAllBookings()
      .then((res) => {
        dispatch(LoaderActions.loaderStop());
        if (res && res.requestedResult === true) {
          const bookings = [];
          res.data.forEach((element) => {
            const obj = Object.assign({}, element.userDto, element.bookingDto, { bookingId: element.bookingDto.id });
            bookings.push(obj);
          });
          dispatch(getBookingSuccess(bookings));
        } else {
          MessageBox(res.message, 'error');
        }
      })
      .catch((err) => {
        dispatch(LoaderActions.loaderStop());
        dispatch(getBookingFail());
        MessageBox(err.message, 'error');
      });
  };
}

export function editBooking(booking) {
  return (dispatch) => {
    dispatch(LoaderActions.loaderStart());
    return NewBookingSource.editBooking(booking)
      .then(() => {
        dispatch(LoaderActions.loaderStop());
      })
      .catch((err) => {
        dispatch(LoaderActions.loaderStop());
        MessageBox(err.message, 'error');
      });
  };
}
