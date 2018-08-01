import CONSTANTS from '../constants/actionConstants';
import MessageBox from '../components/MessageBox';
import * as loaderActions from './loaderActions';
import AddHotelPartnerSource from '../sources/AddHotelPartnerSource';

export function AddhotelPartnerSuccess() {
  const action = {
    type: CONSTANTS.ADD_HOTEL_PARTNER_SUCCESS,
  };
  return action;
}
export function AddhotelPartnerFail() {
  const action = {
    type: CONSTANTS.ADD_HOTEL_PARTNER_FAIL,
  };
  return action;
}
export function AddhotelPartnerSuccessAfter() {
  const action = {
    type: CONSTANTS.ADD_HOTEL_PARTNER_SUCCESS_AFTER,
  };
  return action;
}

export function addHotelPartner(user) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return AddHotelPartnerSource.addHotelPartner(user)
      .then(() => {
        dispatch(loaderActions.loaderStop());
        dispatch(AddhotelPartnerSuccess());
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(AddhotelPartnerFail());
        MessageBox(err.message, 'error');
      });
  };
}
