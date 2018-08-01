import CONSTANTS from '../constants/actionConstants';
import * as loaderActions from './loaderActions';
import CommonSource from '../sources/CommonSource';
import MessageBox from '../components/MessageBox';

export function getImageSuccess(images) {
  const action = {
    type: CONSTANTS.GET_COMMON_IMAGES_SUCCESS,
    images,
  };
  return action;
}
export function getImageFail() {
  const action = {
    type: CONSTANTS.GET_COMMON_IMAGES_FAIL,
  };
  return action;
}


export function getCommonImages(booking) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    CommonSource.getCommonImages(booking)
      .then((images) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getImageSuccess(images));
      })
      .catch(() => {
        dispatch(loaderActions.loaderStop());
        dispatch(getImageFail());
        MessageBox('Unable to load images', 'error');
      });
  };
}
