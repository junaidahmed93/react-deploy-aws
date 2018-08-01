import CONSTANTS from '../constants/actionConstants';
import * as loaderActions from './loaderActions';
import MessageBox from '../components/MessageBox';
import GetHotelPartnerSource from '../sources/GetHotelPartnerSource';

export function getHotelPartnerSuccess(partnerList) {
  const action = {
    type: CONSTANTS.GET_HOTEL_PARTNER_SUCCESS,
    partnerList,
  };
  return action;
}
export function getHotelPartnerFail() {
  const action = {
    type: CONSTANTS.GET_HOTEL_PARTNER_FAIL,
  };
  return action;
}


export function getHotelPartnerUsers() {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return GetHotelPartnerSource.getHotelPartnerUsers()
      .then((partner) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getHotelPartnerSuccess(partner.data));
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getHotelPartnerFail());
        MessageBox(err.message, 'error');
      });
  };
}
