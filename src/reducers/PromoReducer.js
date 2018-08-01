import CONSTANTS from '../constants/actionConstants';

const initialState = {
  promoCreated: false,
  promoStatusChange: false,
  promoUpdated: false,
  promoList: [],
  errorInPromoList: false,
};
const PromoReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_PROMO_CODE_SUCCESS:
      return Object.assign({}, state, {
        promoCreated: true,
      });
    case CONSTANTS.ADD_PROMO_CODE_FAIL:
      return Object.assign({}, state, {
        promoCreated: false,
      });
    case CONSTANTS.ADD_PROMO_CODE_SUCCESS_AFTER:
      return Object.assign({}, state, {
        promoCreated: false,
      });
    case CONSTANTS.UPDATE_PROMO_CODE_SUCCESS:
      return Object.assign({}, state, {
        promoUpdated: true,
      });
    case CONSTANTS.UPDATE_PROMO_CODE_FAIL:
      return Object.assign({}, state, {
        promoUpdated: false,
      });
    case CONSTANTS.UPDATE_PROMO_CODE_SUCCESS_AFTER:
      return Object.assign({}, state, {
        promoUpdated: false,
      });
    case CONSTANTS.CHANGE_PROMO_STATUS_SUCCESS:
      return Object.assign({}, state, {
        promoStatusChange: true,
      });
    case CONSTANTS.CHANGE_PROMO_STATUS_FAIL:
      return Object.assign({}, state, {
        promoStatusChange: false,
      });
    case CONSTANTS.CHANGE_PROMO_STATUS_SUCCESS_AFTER:
      return Object.assign({}, state, {
        promoStatusChange: false,
      });
    case CONSTANTS.GET_PROMO_LIST_SUCCESS:
      return Object.assign({}, state, {
        promoList: action.promoList,
        errorInPromoList: true,
      });
    case CONSTANTS.GET_PROMO_LIST_FAIL:
      return Object.assign({}, state, {
        errorInPromoList: false,
      });

    default:
      return state;
  }
};
export default PromoReducer;
