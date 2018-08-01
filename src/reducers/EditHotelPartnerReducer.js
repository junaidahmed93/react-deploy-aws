import CONSTANTS from '../constants/actionConstants';

const initialState = {
  error: '',
  EditParnterUser: false,
};

const EditHotelPartnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.EDIT_HOTEL_PARTNER_SUCCESS:
      return Object.assign({}, state, {
        EditParnterUser: true,
      });
    case CONSTANTS.EDIT_HOTEL_PARTNER_SUCCESS_AFTER:
      return Object.assign({}, state, {
        EditParnterUser: false,
      });
    case CONSTANTS.EDIT_HOTEL_PARTNER_FAIL:
      return Object.assign({}, state, {
        EditParnterUser: false,
      });
    default:
      return state;
  }
};
export default EditHotelPartnerReducer;
