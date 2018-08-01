import CONSTANTS from '../constants/actionConstants';

const initialState = {
  riskJobreports: {},
  dailySales: [],
  bagReport: [],
  bagReportSuccess: false,
  dailySalesSuccess: false,
  riskJobFetched: false,
};
const ReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_JOB_AT_RISK_SUCCESS:
      return Object.assign({}, state, {
        riskJobFetched: true,
        riskJobreports: action.report,
      });
    case CONSTANTS.GET_JOB_AT_RISK_FAIL:
      return Object.assign({}, state, {
        riskJobFetched: false,
        riskJobreports: {},
      });
    case CONSTANTS.GET_DAILY_SALES_SUCCESS:
      return Object.assign({}, state, {
        dailySalesSuccess: true,
        dailySales: action.sales,
      });
    case CONSTANTS.GET_DAILY_SALES_FAIL:
      return Object.assign({}, state, {
        dailySalesSuccess: false,
        dailySales: [],
      });
    case CONSTANTS.GET_DAILY_SALES_SUCCESS_AFTER:
      return Object.assign({}, state, {
        dailySalesSuccess: false,
        dailySales: [],
      });
    case CONSTANTS.GET_BAG_REPORT_SUCCESS:
      return Object.assign({}, state, {
        bagReportSuccess: true,
        bagReport: action.bagReport,
      });
    case CONSTANTS.GET_BAG_REPORT_FAIL:
      return Object.assign({}, state, {
        bagReportSuccess: false,
        bagReport: [],
      });
    case CONSTANTS.GET_BAG_REPORT_SUCCESS_AFTER:
      return Object.assign({}, state, {
        bagReportSuccess: false,
        bagReport: [],
      });
    default:
      return state;
  }
};
export default ReportReducer;
