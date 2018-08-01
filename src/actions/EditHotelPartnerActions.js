import { browserHistory } from 'react-router';
import CONSTANTS from '../constants/actionConstants';
import * as loaderActions from './loaderActions';
import MessageBox from '../components/MessageBox';
import EditHotelPartnerSource from '../sources/EditHotelPartnerSource';

export function EdithotelPartnerSuccess() {
  const action = {
    type: CONSTANTS.EDIT_HOTEL_PARTNER_SUCCESS,
  };
  return action;
}
export function EdithotelPartnerFail() {
  const action = {
    type: CONSTANTS.EDIT_HOTEL_PARTNER_FAIL,
  };
  return action;
}
export function EdithotelPartnerSuccessAfter() {
  const action = {
    type: CONSTANTS.EDIT_HOTEL_PARTNER_SUCCESS_AFTER,
  };
  return action;
}

export function editHotelPartner(user) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return EditHotelPartnerSource.editHotelPartner(user)
      .then(() => {
        dispatch(loaderActions.loaderStop());
        dispatch(EdithotelPartnerSuccess());
        browserHistory.push('/home/admin/hotel-partner');
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(EdithotelPartnerFail());
        MessageBox(err.message, 'error');
      });
  };
}

