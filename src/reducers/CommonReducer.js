import CONSTANTS from '../constants/actionConstants';
// import initialState from "../store/initialState";
const initialState = {
  batch: [],
  countryList: [],
  airportList: [],
  serviceAreaList: [],
  bookingCancelReasonList: [],
  promoType: {},
  error: '',
  batchSuccess: false,
  countryListSuccess: false,
  airportListSucces: false,
  serivesAreaListSuccess: false,
  bookingCancelReasonListSuccess: false,
  promoTypeSuccess: false,
};
const CommonReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_COUNTRY_LIST_SUCCESS:
      return Object.assign({}, state, {
        countryListSuccess: true,
        countryList: action.countryList,
        error: '',
      });
    case CONSTANTS.GET_AIRPORT_LIST_FAIL:
      return Object.assign({}, state, {
        countryListSuccess: false,
        error: '',
      });
    case CONSTANTS.GET_AIRPORT_LIST_SUCCESS:
      return Object.assign({}, state, {
        airportListSucces: true,
        airportList: action.airportList,
        error: '',
      });
    case CONSTANTS.GET_PROMO_TYPE_SUCCESS:
      return Object.assign({}, state, {
        promoType: action.promoType,
        promoTypeSuccess: true,
      });
    case CONSTANTS.GET_PROMO_TYPE_FAIL:
      return Object.assign({}, state, {
        promoType: {},
        promoTypeSuccess: false,
      });
    case CONSTANTS.GET_COUNTRY_LIST_FAIL:
      return Object.assign({}, state, {
        airportListSucces: false,
        error: '',
      });
    case CONSTANTS.GET_SERVICE_AREA_LIST_FAIL:
      return Object.assign({}, state, {
        serivesAreaListSuccess: false,
        error: '',
      });
    case CONSTANTS.GET_SERVICE_AREA_LIST_SUCCESS:
      return Object.assign({}, state, {
        serivesAreaListSuccess: true,
        serviceAreaList: action.serviceAreaList,
        error: '',
      });
    case CONSTANTS.GET_BOOKING_CANCEL_REASON_SUCCEES:
      return Object.assign({}, state, {
        bookingCancelReasonListSuccess: true,
        bookingCancelReasonList: action.bookingCancelReasonList,
        error: '',
      });
    case CONSTANTS.GET_BOOKING_CANCEL_REASON_FAIL:
      return Object.assign({}, state, {
        bookingCancelReasonListSuccess: false,
        error: '',
      });
    case CONSTANTS.GET_BATCH_SUCCESS:
      return Object.assign({}, state, {
        batchSuccess: true,
        batch: action.batch,
      });
    case CONSTANTS.GET_BATCH_FAIL:
      return Object.assign({}, state, {
        batchSuccess: false,
        batch: [],
        error: '',
      });
    default:
      return state;
  }
};
export default CommonReducer;
