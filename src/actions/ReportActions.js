import CONSTANTS from '../constants/actionConstants';
import * as loaderActions from './loaderActions';
import ReportSource from '../sources/ReportSource';
import * as NotificationActions from './NotificationActions';
import MessageBox from '../components/MessageBox';

export function getJobAtRiskSuccess(report) {
  const action = {
    type: CONSTANTS.GET_JOB_AT_RISK_SUCCESS,
    report,
  };
  return action;
}
export function getJobAtRiskFail() {
  const action = {
    type: CONSTANTS.GET_JOB_AT_RISK_FAIL,
  };
  return action;
}

export function getDailySalesSuccess(sales) {
  const action = {
    type: CONSTANTS.GET_DAILY_SALES_SUCCESS,
    sales,
  };
  return action;
}
export function getDailySalesFail() {
  const action = {
    type: CONSTANTS.GET_DAILY_SALES_FAIL,
  };
  return action;
}
export function getDailySalesSuccessAfter() {
  const action = {
    type: CONSTANTS.GET_DAILY_SALES_SUCCESS_AFTER,
  };
  return action;
}


export function getBagReportSuccess(bagReport) {
  const action = {
    type: CONSTANTS.GET_BAG_REPORT_SUCCESS,
    bagReport,
  };
  return action;
}
export function getBagReportFail() {
  const action = {
    type: CONSTANTS.GET_BAG_REPORT_FAIL,
  };
  return action;
}
export function getBagReportSuccessAfter() {
  const action = {
    type: CONSTANTS.GET_BAG_REPORT_SUCCESS_AFTER,
  };
  return action;
}


export function refreshAfterEachRecord() {
  return (dispatch) => {
    dispatch(getDailySalesSuccessAfter());
  };
}

export function jobatRisk(id) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return ReportSource.jobatRisk(id)
      .then((reports) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getJobAtRiskSuccess(reports.data));
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getJobAtRiskFail());
        MessageBox(err.message, 'error');
      });
  };
}

export function dailySalesReport(dailySales) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return ReportSource.dailySalesReport(dailySales)
      .then((reports) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getDailySalesSuccess(reports.data));
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getDailySalesFail());
        MessageBox(err.message, 'error');
      });
  };
}

export function bagsReport(bagReportObj) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return ReportSource.bagsReport(bagReportObj)
      .then((reports) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getBagReportSuccess(reports.data));
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getBagReportFail());
        MessageBox(err.message, 'error');
      });
  };
}

