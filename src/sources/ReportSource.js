
import request from 'superagent';
import momentTZ from 'moment-timezone';

import APIURL from '../constants/apiUrlConstants';
import { loadState } from '../utils/StorageUtils';
import { AuthIntercept } from './LogoutSource';

const BookingMapping = (allbooking) => {
  const booking = {
    bookingNotAssignYet: allbooking.bookingNotAssignedYet,
    pendingPickUp: allbooking.bookingNotPickedYetDto,
    pendingDropoff: allbooking.porterNotReachedAirPortYetDto,
    pendingCollection: allbooking.bookingNotPickByCustomerYetDto,
  };

  const updateTZBooking = {
    bookingNotAssignYet: [],
    pendingPickUp: [],
    pendingDropoff: [],
    pendingCollection: [],
  };

  booking.pendingPickUp.forEach((element) => {
    const flightTime = momentTZ.tz(element.flightDepartureTime, element.serviceAreaDto.timeZone).format();
    const pickupTime = momentTZ.tz(element.requestedPickupTime, element.serviceAreaDto.timeZone).format();
    const dropOffTime = momentTZ.tz(element.dropOffTime, element.serviceAreaDto.timeZone).format();
    const updatedWithTimeZone = Object.assign({}, element);
    updatedWithTimeZone.flightDepartureTime = flightTime;
    updatedWithTimeZone.requestedPickupTime = pickupTime;
    updatedWithTimeZone.dropOffTime = dropOffTime;
    updateTZBooking.pendingPickUp.push(updatedWithTimeZone);
  });
  booking.pendingDropoff.forEach((element) => {
    const flightTime = momentTZ.tz(element.flightDepartureTime, element.serviceAreaDto.timeZone).format();
    const pickupTime = momentTZ.tz(element.requestedPickupTime, element.serviceAreaDto.timeZone).format();
    const dropOffTime = momentTZ.tz(element.dropOffTime, element.serviceAreaDto.timeZone).format();
    const updatedWithTimeZone = Object.assign({}, element);
    updatedWithTimeZone.flightDepartureTime = flightTime;
    updatedWithTimeZone.requestedPickupTime = pickupTime;
    updatedWithTimeZone.dropOffTime = dropOffTime;
    updateTZBooking.pendingDropoff.push(updatedWithTimeZone);
  });
  booking.pendingCollection.forEach((element) => {
    const flightTime = momentTZ.tz(element.flightDepartureTime, element.serviceAreaDto.timeZone).format();
    const pickupTime = momentTZ.tz(element.requestedPickupTime, element.serviceAreaDto.timeZone).format();
    const dropOffTime = momentTZ.tz(element.dropOffTime, element.serviceAreaDto.timeZone).format();
    const updatedWithTimeZone = Object.assign({}, element);
    updatedWithTimeZone.flightDepartureTime = flightTime;
    updatedWithTimeZone.requestedPickupTime = pickupTime;
    updatedWithTimeZone.dropOffTime = dropOffTime;
    updateTZBooking.pendingCollection.push(updatedWithTimeZone);
  });
  booking.bookingNotAssignYet.forEach((element) => {
    const flightTime = momentTZ.tz(element.flightDepartureTime, element.serviceAreaDto.timeZone).format();
    const pickupTime = momentTZ.tz(element.requestedPickupTime, element.serviceAreaDto.timeZone).format();
    const dropOffTime = momentTZ.tz(element.dropOffTime, element.serviceAreaDto.timeZone).format();
    const updatedWithTimeZone = Object.assign({}, element);
    updatedWithTimeZone.flightDepartureTime = flightTime;
    updatedWithTimeZone.requestedPickupTime = pickupTime;
    updatedWithTimeZone.dropOffTime = dropOffTime;
    updateTZBooking.bookingNotAssignYet.push(updatedWithTimeZone);
  });
  return updateTZBooking;
};

const ReportSource = {
  jobatRisk() {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token, pageNumber: 0, pageSize: 500 });

    return new Promise((resolve, reject) => {
      request.get(APIURL.GET_JOB_AT_RISK)
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, res) => {
          if (res && res.text) {
            const responseData = JSON.parse(res.text);
            const booking = BookingMapping(responseData.data);
            if (responseData && responseData.success && responseData.success === true) {
              resolve({ requestedResult: true, data: booking });
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
  dailySalesReport(dailySalesObj) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token, pageNumber: dailySalesObj.pageNumber, pageSize: dailySalesObj.pageSize });

    return new Promise((resolve, reject) => {
      request.get(APIURL.DAILY_SALES_REPORT)
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .query({
          fromDate: dailySalesObj.date_from, toDate: dailySalesObj.date_to, serviceAreaId: dailySalesObj.serviceAreaId, numBags: dailySalesObj.numBags, invoiceTotal: dailySalesObj.invoiceTotal,
        })
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
  bagsReport(bagReportDto) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token, pageNumber: bagReportDto.pageNumber, pageSize: bagReportDto.pageSize });
    const URL = APIURL.DAILY_SALES_REPORT.replace('{userType}', bagReportDto.type);
    return new Promise((resolve, reject) => {
      request.get(APIURL.DAILY_SALES_REPORT)
        .use(AuthIntercept).accept(URL)
        .set(header)
        .query({ serviceAreaId: bagReportDto.serviceAreaId })
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

export default ReportSource;
