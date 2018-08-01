import CONSTANTS from '../constants/actionConstants';
import * as loaderActions from './loaderActions';
import CommonSource from '../sources/CommonSource';
import MessageBox from '../components/MessageBox';

export function getCountyListSuccess(countryList) {
  const action = {
    type: CONSTANTS.GET_COUNTRY_LIST_SUCCESS,
    countryList,
  };
  return action;
}
export function getCountryListFail() {
  const action = {
    type: CONSTANTS.GET_COUNTRY_LIST_FAIL,
  };
  return action;
}

export function getAirportListSuccess(airportList) {
  const action = {
    type: CONSTANTS.GET_AIRPORT_LIST_SUCCESS,
    airportList,
  };
  return action;
}
export function getAirportListFail() {
  const action = {
    type: CONSTANTS.GET_AIRPORT_LIST_FAIL,
  };
  return action;
}

export function getServiceAreaListSuccess(serviceAreaList) {
  const action = {
    type: CONSTANTS.GET_SERVICE_AREA_LIST_SUCCESS,
    serviceAreaList,
  };
  return action;
}
export function getServiceAreaListFail() {
  const action = {
    type: CONSTANTS.GET_SERVICE_AREA_LIST_FAIL,
  };
  return action;
}

export function getCancelBookingReasonSuccess(bookingCancelReasonList) {
  const action = {
    type: CONSTANTS.GET_BOOKING_CANCEL_REASON_SUCCEES,
    bookingCancelReasonList,
  };
  return action;
}
export function getCancelBookingReasonFail() {
  const action = {
    type: CONSTANTS.GET_BOOKING_CANCEL_REASON_FAIL,
  };
  return action;
}

export function getBatchSuccess(batch) {
  const action = {
    type: CONSTANTS.GET_BATCH_SUCCESS,
    batch,
  };
  return action;
}
export function getBatchFail() {
  const action = {
    type: CONSTANTS.GET_BATCH_FAIL,
  };
  return action;
}

export function getPromoTypeSuccess(promoType) {
  const action = {
    type: CONSTANTS.GET_PROMO_TYPE_SUCCESS,
    promoType: promoType.data,
  };
  return action;
}
export function getPromoTypeFail() {
  const action = {
    type: CONSTANTS.GET_PROMO_TYPE_FAIL,
  };
  return action;
}

export function getBatch() {
  return dispatch =>
    CommonSource.getBatch()
      .then((batch) => {
        dispatch(getBatchSuccess(batch));
      })
      .catch((err) => {
        dispatch(getBatchFail(err));
        MessageBox('Services Failed: Batch list', 'error');
      });
}

export function getAllCountries() {
  return dispatch =>
    CommonSource.getCountryList()
      .then((countries) => {
        dispatch(getCountyListSuccess(countries));
      })
      .catch(() => {
        dispatch(getCountryListFail());
        MessageBox('Services Failed: Country list', 'error');
      });
}


export function getAirports() {
  return dispatch =>
    CommonSource.getAirports()
      .then((airports) => {
        dispatch(getAirportListSuccess(airports));
      })
      .catch(() => {
        dispatch(getAirportListFail());
        MessageBox('Services Failed: Airport list', 'error');
      });
}

export function getServiceAreas() {
  return dispatch =>
    CommonSource.getServiceArea()
      .then((serviceArea) => {
        dispatch(getServiceAreaListSuccess(serviceArea));
      })
      .catch(() => {
        dispatch(getServiceAreaListFail());
        MessageBox('Services Failed: Areas', 'error');
      });
}

export function getPromoTypes() {
  return dispatch =>
    CommonSource.getPromoTypes()
      .then((promoType) => {
        dispatch(getPromoTypeSuccess(promoType));
      })
      .catch(() => {
        dispatch(getPromoTypeFail());
        MessageBox('Services Failed: Promo Type', 'error');
      });
}

export function getBookingCancelReasons() {
  return dispatch =>
    CommonSource.getBookingCancelReasons()
      .then((serviceArea) => {
        dispatch(getCancelBookingReasonSuccess(serviceArea));
      })
      .catch(() => {
        dispatch(getCancelBookingReasonFail());
        MessageBox('Services Failed: Cancellation Reason', 'error');
      });
}

export function staffDeActivation(id, staff) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return CommonSource.staffDeActivation(id, staff)
      .then((serviceArea) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getCancelBookingReasonSuccess(serviceArea));
      })
      .catch(() => {
        dispatch(loaderActions.loaderStop());
        dispatch(getCancelBookingReasonFail());
        MessageBox('Services Failed: Staff ativation', 'error');
      });
  };
}

export function staffActivation(id, staff) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return CommonSource.staffActivation(id, staff)
      .then((serviceArea) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getCancelBookingReasonSuccess(serviceArea));
      })
      .catch(() => {
        dispatch(loaderActions.loaderStop());
        dispatch(getCancelBookingReasonFail());
        MessageBox('Services Failed: Service area', 'error');
      });
  };
}
