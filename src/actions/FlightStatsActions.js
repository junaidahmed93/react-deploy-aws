import CONSTANTS from '../constants/actionConstants';
import MessageBox from '../components/MessageBox';
import FlightStatsSource from '../sources/FlightStatsSource';
import * as LoaderActions from './loaderActions';

export function flightStatsSuccess(flightDetails) {
  const action = {
    type: CONSTANTS.FLIGHT_STATS_SUCCESS,
    flightDetails,
  };
  return action;
}

export function flightStatsFail() {
  const action = {
    type: CONSTANTS.FLIGHT_STATS_FAIL,
  };
  return action;
}

export function flightStatsSuccessAfter() {
  const action = {
    type: CONSTANTS.FLIGHT_STATS_SUCCESS_AFTER,
  };
  return action;
}

export function getFlightStats(flightInput) {
  return (dispatch) => {
    dispatch(LoaderActions.loaderStart());
    dispatch(flightStatsSuccessAfter());
    return FlightStatsSource.getFlightStats(flightInput)
      .then((res) => {
        dispatch(LoaderActions.loaderStop());
        if (res.requestedResult === true) {
          dispatch(flightStatsSuccess(res.data));
        }
        if (res.requestedResult === false) {
          dispatch(flightStatsFail());
          MessageBox('No Scheduled flight', 'info');
        }
      })
      .catch((err) => {
        dispatch(LoaderActions.loaderStop());
        dispatch(flightStatsFail());
        MessageBox(err.message, 'error');
      });
  };
}
