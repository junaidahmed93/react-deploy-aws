import CONSTANTS from '../constants/actionConstants';

const initialState = {
  error: '',
  bookingSaved: false,
};

const HotelNewBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_HOTEL_BOOKING_SUCCESS:
      return Object.assign({}, state, {
        bookingSaved: true,
      });
    case CONSTANTS.ADD_HOTEL_BOOKING_SUCCESS_AFTER:
      return Object.assign({}, state, {
        bookingSaved: false,
      });
    case CONSTANTS.ADD_HOTEL_BOOKING_FAIL:
      return Object.assign({}, state, {
        bookingSaved: false,
      });


    default:
      return state;
  }
};
export default HotelNewBookingReducer;
