import CONSTANTS from '../constants/actionConstants';
import * as loaderActions from './loaderActions';
import DriporterSource from '../sources/DriporterSource';
import MessageBox from '../components/MessageBox';

export function addDriporterSuccess(driprter) {
  const action = {
    type: CONSTANTS.ADD_DRIPORTER_SUCCESS,
    driprter,
  };
  return action;
}
export function addDriporterFail() {
  const action = {
    type: CONSTANTS.ADD_DRIPORTER_FAIL,
  };
  return action;
}

export function getDriporterSuccess(driporters) {
  const action = {
    type: CONSTANTS.GET_DRIPORTER_SUCCESS,
    driporters,
  };
  return action;
}
export function getDriporterFail() {
  const action = {
    type: CONSTANTS.GET_DRIPORTER_FAIL,
  };
  return action;
}

export function getdriporterProfileSuccess(driporter) {
  const action = {
    type: CONSTANTS.GET_DRIPORTER_PROFILE_SUCCESS,
    driporter,
  };
  return action;
}

export function getDriporterProfileFail() {
  const action = {
    type: CONSTANTS.GET_DRIPORTER_PROFILE_FAIL,
  };
  return action;
}

export function DriporterUpdateSuccess() {
  const action = {
    type: CONSTANTS.UPDATE_DRIPORTER_SUCCESS,
  };
  return action;
}

export function DriporterUpdateFail() {
  const action = {
    type: CONSTANTS.UPDATE_DRIPORTER_FAIL,
  };
  return action;
}

export function driporterProfile(id) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return DriporterSource.driporterProfile(id)
      .then((driporter) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getdriporterProfileSuccess(driporter.data));
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getDriporterProfileFail());
        MessageBox(err.message, 'error');
      });
  };
}
export function addDriporter(dri) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return DriporterSource.addDriporter(dri)
      .then((res) => {
        dispatch(loaderActions.loaderStop());
        dispatch(addDriporterSuccess(res));
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(addDriporterFail());
        MessageBox(err.message, 'error');
      });
  };
}

export function getDriporter() {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return DriporterSource.getAllDriporter()
      .then((driporter) => {
        dispatch(getDriporterSuccess(driporter.data.driPorterList));
        dispatch(loaderActions.loaderStop());
      })
      .catch((err) => {
        dispatch(getDriporterFail());
        dispatch(loaderActions.loaderStop());
        MessageBox(err.message, 'error');
      });
  };
}

export function updateDriporter(driporter) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return DriporterSource.updateDriporter(driporter)
      .then(() => {
        dispatch(DriporterUpdateSuccess());
        dispatch(loaderActions.loaderStop());
      })
      .catch((err) => {
        dispatch(DriporterUpdateFail());
        MessageBox(err.message, 'error');
        dispatch(loaderActions.loaderStop());
      });
  };
}

