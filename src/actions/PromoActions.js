import request from 'superagent';
import { browserHistory } from 'react-router';
import CONSTANTS from '../constants/actionConstants';
import APIURL from '../constants/apiUrlConstants';
import * as NotificationActions from './NotificationActions';
import * as loaderActions from './loaderActions';
import Converters from '../utils/Converters';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';
import PromoSource from '../sources/PromoSource';
import MessageBox from '../components/MessageBox';

export function addPromoCodeSuccess() {
  const action = {
    type: CONSTANTS.ADD_PROMO_CODE_SUCCESS,

  };
  return action;
}
export function addPromoCodeFail() {
  const action = {
    type: CONSTANTS.ADD_PROMO_CODE_FAIL,

  };
  return action;
}

export function addPromoCodeSuccessAfter() {
  const action = {
    type: CONSTANTS.ADD_PROMO_CODE_SUCCESS_AFTER,

  };
  return action;
}

export function updatePromoCodeSuccess() {
  const action = {
    type: CONSTANTS.UPDATE_PROMO_CODE_SUCCESS,

  };
  return action;
}
export function updatePromoCodeFail() {
  const action = {
    type: CONSTANTS.UPDATE_PROMO_CODE_FAIL,

  };
  return action;
}

export function updatePromoCodeSuccessAfter() {
  const action = {
    type: CONSTANTS.UPDATE_PROMO_CODE_SUCCESS_AFTER,

  };
  return action;
}

export function changePromoStatusSuccess() {
  const action = {
    type: CONSTANTS.CHANGE_PROMO_STATUS_SUCCESS,

  };
  return action;
}
export function changePromoStatusFail() {
  const action = {
    type: CONSTANTS.CHANGE_PROMO_STATUS_FAIL,

  };
  return action;
}

export function changePromoStatusSuccessAfter() {
  const action = {
    type: CONSTANTS.CHANGE_PROMO_STATUS_SUCCESS_AFTER,

  };
  return action;
}

export function getPromoListSuccess(promoList) {
  const action = {
    type: CONSTANTS.GET_PROMO_LIST_SUCCESS,
    promoList,
  };
  return action;
}
export function getPromoListFail() {
  const action = {
    type: CONSTANTS.GET_PROMO_LIST_FAIL,

  };
  return action;
}

export function addPromoCode(promoDto, customerIds) {
  return dispatch =>
    // dispatch(loaderActions.loaderStart());
    PromoSource.addPromoCode(promoDto, customerIds)
      .then((promoList) => {
        dispatch(loaderActions.loaderStop());
        if (promoList.requestedResult === false) {
          MessageBox(promoList.message, 'success');
        } else {
          dispatch(addPromoCodeSuccess(promoList));
        }
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(addPromoCodeFail());
        MessageBox(err.message, 'error');
      });
}

export function updatePromoCode(promoDto, customerIds) {
  return dispatch =>
    // dispatch(loaderActions.loaderStart());
    PromoSource.updatePromoCode(promoDto, customerIds)
      .then((promoList) => {
        dispatch(loaderActions.loaderStop());
        dispatch(updatePromoCodeSuccess(promoList));
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(updatePromoCodeFail());
        MessageBox(err.message, 'error');
      });
}


export function getPromoList() {
  return dispatch =>
    // dispatch(loaderActions.loaderStart());
    PromoSource.getPromoList()
      .then((res) => {
        dispatch(loaderActions.loaderStop());
        const promos = [];
        if (res && res.data) {
          res.data.map(((data) => {
            if (!(data.status === 'ARCHIVE_STATUS')) {
              promos.push(data);
            }
          }));
          dispatch(getPromoListSuccess(promos));
        }
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getPromoListFail());
        MessageBox(err.message, 'error');
      });
}

export function changePromoStatus(promoObj) {
  return dispatch =>
    // dispatch(loaderActions.loaderStart());
    PromoSource.changePromoStatus(promoObj)
      .then((res) => {
        dispatch(loaderActions.loaderStop());
        dispatch(changePromoStatusSuccess(res.data));
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(changePromoStatusFail());
        MessageBox(err.message, 'error');
      });
}
