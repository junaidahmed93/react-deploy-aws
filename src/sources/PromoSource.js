
import request from 'superagent';
import { browserHistory } from 'react-router';
import APIURL from '../constants/apiUrlConstants';
import { loadState } from '../utils/StorageUtils';
import { AuthIntercept } from './LogoutSource';
import Converters from '../utils/Converters';

const promoCodeMapping = (promoDto, customerIds) => {
  let discountType;
  if (promoDto.discountType === 'Percentage') {
    discountType = 'PERCENTAGE_DISCOUNT';
  } else {
    discountType = 'FIXED_DISCOUNT';
  }

  if (promoDto.type === 'ALL_CUSTOMERS') {
    promoDto.type = 'ALL_CUSTOMERS_TYPE';
  }
  const promoObj = {
    code: promoDto.promoCode,
    validFrom: Converters.vehicleDateConverter(promoDto.startingDate),
    validTill: Converters.vehicleDateConverter(promoDto.endingDate),
    description: promoDto.description,
    usagePerUserLimit: promoDto.perUserLimit,
    totalUsageLimit: promoDto.totalUsage,
    type: promoDto.type,
    // type: "PROMO_CODE_CONSTANT_CUSTOMER_SPECIFIC_TYPE",
    discountType,
    discount: promoDto.discount,
    maximumDiscount: promoDto.maximumDiscount,
    customers: customerIds || null,
    regions: promoDto.promoCity,
  };
  return promoObj;
};

const editPromoCodeMapping = (promoDto, customerIds) => {
  // let discountType;
  // if (promoDto.discountType === '"Percentage"') {
  //   discountType = 'PERCENTAGE_DISCOUNT'
  // }
  // else {
  //   discountType = 'FIXED_DISCOUNT'
  // }
  const promoObj = {
    id: promoDto.id,
    code: promoDto.code,
    validFrom: Converters.vehicleDateConverter(promoDto.validFrom),
    validTill: Converters.vehicleDateConverter(promoDto.validTill),
    description: promoDto.description,
    usagePerUserLimit: promoDto.usagePerUserLimit,
    totalUsageLimit: promoDto.totalUsageLimit,
    type: promoDto.type,
    status: promoDto.status,
    discountType: promoDto.discountType,
    discount: promoDto.discount,
    maximumDiscount: promoDto.maximumDiscount,
    customers: customerIds || null,
    regions: promoDto.regions,
  };
  return promoObj;
};

const PromoSource = {
  addPromoCode(promoDto, customerIds) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });

    const payload = promoCodeMapping(promoDto, customerIds);
    return new Promise((resolve) => {
      request.post(APIURL.ADD_PROMO_CODE)
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .send(payload)
        .timeout(30000)
        .end((err, res) => {
          if (res && res.text) {
            const responseData = JSON.parse(res.text);
            if (responseData && responseData.success && responseData.success === true) {
              resolve({ requestedResult: true, data: responseData.data });
            }
            if (responseData && responseData.data === null) {
              if (responseData.errors && responseData.errors[0]) {
                resolve({ requestedResult: false, message: responseData.errors[0].errorMessage });
              } else {
                resolve({ requestedResult: false, message: 'Promo could not created' });
              }
            }
            if (responseData && responseData.success && responseData.success === false) {
              resolve({ requestedResult: false, message: 'Promo creation failed' });
            }
          } else {
            // const handleError = ErrorMapping.unhandleError(err);
            // reject({ requestedResult: false, message: handleError });
          }
        });
    });
  },
  updatePromoCode(promoDto, customerIds) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });

    const payload = editPromoCodeMapping(promoDto, customerIds);
    return new Promise((resolve, reject) => {
      request.put(APIURL.UPDATE_PROMO)
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set({ token })
        .send(payload)
        .timeout(30000)
        .end((err, res) => {
          if (res && res.text) {
            const responseData = JSON.parse(res.text);
            if (responseData && responseData.success && responseData.success === true) {
              browserHistory.push('/home/admin/promo');
              resolve({ requestedResult: true, data: responseData.data });
            }
            if (responseData && responseData.success && responseData.success === false) {
              resolve({ requestedResult: false, message: 'Notification Sending Failed' });
            }
          } else {
            reject(err);
          }
        });
    });
  },
  getPromoList() {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });

    return new Promise((resolve, reject) => {
      request.get(APIURL.GET_PROMO_LIST)
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, res) => {
          if (res && res.text) {
            const responseData = JSON.parse(res.text);
            if (responseData && responseData.success && responseData.success === true) {
              resolve({ requestedResult: true, data: responseData.data });
            }
            if (responseData && responseData.success && responseData.success === false) {
              resolve({ requestedResult: false, message: 'Notification Sending Failed' });
            }
          } else {
            reject(err);
          }
        });
    });
  },

  changePromoStatus(payload) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });

    return new Promise((resolve, reject) => {
      request.post(APIURL.UPDATE_PROMO_STATUS)
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .send(payload)
        .timeout(30000)
        .end((err, res) => {
          if (res && res.text) {
            const responseData = JSON.parse(res.text);
            if (responseData && responseData.success && responseData.success === true) {
              resolve({ requestedResult: true, data: responseData.data });
            }
            if (responseData && responseData.success && responseData.success === false) {
              resolve({ requestedResult: false, message: 'Notification Sending Failed' });
            }
          } else {
            reject(err);
          }
        });
    });
  },
};

export default PromoSource;
