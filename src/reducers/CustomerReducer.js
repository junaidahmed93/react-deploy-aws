import CONSTANTS from '../constants/actionConstants';

const initialState = {
  customers: [],
  notificationList: [],
  notificationSent: false,
  notificationListSuccess: false,
};
const CustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_CUSTOMER_SUCCESS: {
      const customers = action && action.customers ? action.customers.reverse() : action.customers;
      return {
        ...state, customers,
      };
    }

    case CONSTANTS.GET_CUSTOMER_FAIL:
      return {
        ...state, customers: [],
      };
    case CONSTANTS.CUSTOMER_NOTIFICATION_SUCCESS:
      return {
        notificationSent: true,
      };
    case CONSTANTS.CUSTOMER_NOTIFICATION_FAIL:
      return {
        notificationSent: false,
      };
    case CONSTANTS.GET_ALL_NOTIFICATION_SUCCESS:
      {
        const notificationList = action && action.notificationList ? action.notificationList.reverse() : action.notificationList;
        return {
          ...state, notificationList, notificationListSuccess: true,
        };
      }
    case CONSTANTS.GET_ALL_NOTIFICATION_FAIL:
      return {
        notificationList: [],
        notificationListSuccess: false,
      };
    default:
      return state;
  }
};
export default CustomerReducer;
