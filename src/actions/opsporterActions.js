import CONSTANTS from '../constants/actionConstants';
import * as loaderActions from './loaderActions';
import OpsporterSource from '../sources/OpsporterSource';
import MessageBox from '../components/MessageBox';

export function addOpsporterSuccess(opsprter) {
  const action = {
    type: CONSTANTS.ADD_OPSPORTER_SUCCESS,
    opsprter,
  };
  return action;
}
export function addOpsporterFail() {
  const action = {
    type: CONSTANTS.ADD_OPSPORTER_FAIL,
  };
  return action;
}

export function getOpsorterSuccess(opsprter) {
  const action = {
    type: CONSTANTS.GET_OPSPORTER_SUCCESS,
    opsprter,
  };
  return action;
}
export function getOpsporterFail() {
  const action = {
    type: CONSTANTS.GET_OPSPORTER_FAIL,
  };
  return action;
}

export function getOpsporterProfileSuccess(opsporter) {
  const action = {
    type: CONSTANTS.GET_OPSPORTER_PROFILE_SUCCESS,
    opsporter,
  };
  return action;
}

export function getOpsporterProfileFail() {
  const action = {
    type: CONSTANTS.GET_OPSPORTER_PROFILE_FAIL,
  };
  return action;
}

export function opsorterUpdateSuccess() {
  const action = {
    type: CONSTANTS.UPDATE_OPSPORTER_SUCCESS,
  };
  return action;
}

export function opsporterUpdateFail() {
  const action = {
    type: CONSTANTS.UPDATE_OPSPORTER_FAIL,
  };
  return action;
}

export function opsporterProfile(id) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return OpsporterSource.opsporterProfile(id)
      .then((opsporter) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getOpsporterProfileSuccess(opsporter.data));
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getOpsporterProfileFail());
        MessageBox(err.message, 'error');
      });
  };
}
export function addOpsporter(ops) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return OpsporterSource.addOpsporter(ops)
      .then((res) => {
        dispatch(loaderActions.loaderStop());
        dispatch(addOpsporterSuccess(res));
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(addOpsporterFail());
        MessageBox(err.message, 'error');
      });
  };
}

export function getOpsporter() {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return OpsporterSource.getAllOpsporter()
      .then((opsporter) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getOpsorterSuccess(opsporter.data.opsporters));
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getOpsporterFail());
        MessageBox(err.message, 'error');
      });
  };
}

export function updateOpsporter(opsporter) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return OpsporterSource.updateOpsporter(opsporter)
      .then(() => {
        dispatch(loaderActions.loaderStop());
        dispatch(opsorterUpdateSuccess());
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(opsporterUpdateFail());
        MessageBox(err.message, 'error');
      });
  };
}

