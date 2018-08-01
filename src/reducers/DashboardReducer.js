import CONSTANTS from '../constants/actionConstants';

const initialState = {
  driporterLocations: [],
  bookingsPerCity: [],
  registrationsPerCityWeeklyReport: [],
  bookingsPerCitySuccess: false,
  driporterLocationsSuccess: false,
  registrationsPerCityWeeklyReportSuccess: false,
};
const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_DRIPORTER_LOCATION_SUCCESS:
      return {
        ...state, driporterLocations: action.driporterLocations, driporterLocationsSuccess: true,
      };

    case CONSTANTS.GET_DRIPORTER_LOCATION_FAIL:
      return {
        ...state, driporterLocationsSuccess: false,
      };
    case CONSTANTS.GET_BOOKINGS_PER_CITY_SUCCESS:
      return {
        ...state, bookingsPerCity: action.bookingsPerCity, bookingsPerCitySuccess: true,
      };
    case CONSTANTS.GET_BOOKINGS_PER_CITY_FAIL:
      return {
        ...state, bookingsPerCity: [], bookingsPerCitySuccess: false,
      };
    case CONSTANTS.GET_BOOKINGS_PER_CITY_SUCCESS_AFTER:
      return {
        ...state, bookingsPerCity: [], bookingsPerCitySuccess: false,
      };
    case CONSTANTS.GET_REGISTRATION_PER_CITY_SUCCESS:
      return {
        ...state, registrationsPerCityWeeklyReport: action.registrationsPerCityWeeklyReport, registrationsPerCityWeeklyReportSuccess: true,
      };

    case CONSTANTS.GET_REGISTRATION_PER_CITY_FAIL:
      return {
        ...state, registrationsPerCityWeeklyReport: [], registrationsPerCityWeeklyReportSuccess: false,
      };

    case CONSTANTS.GET_REGISTRATION_PER_CITY_SUCCESS_AFTER:
      return {
        ...state, registrationsPerCityWeeklyReport: [], registrationsPerCityWeeklyReportSuccess: false,
      };
    default:
      return state;
  }
};
export default DashboardReducer;
