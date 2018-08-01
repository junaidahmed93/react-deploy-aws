import CONSTANTS from '../constants/actionConstants';
// import initialState from "../store/initialState";
const initialState = {
  imagesSuccess: false,
  images: [],
  erroe: '',
};

const CommonImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_COMMON_IMAGES_SUCCESS:
      return Object.assign({}, state, {
        imagesSuccess: true,
        images: action.images.data,
        error: '',
      });
    case CONSTANTS.GET_COMMON_IMAGES_FAIL:
      return Object.assign({}, state, {
        imagesSuccess: false,
        images: [],
      });

    default:
      return state;
  }
};
export default CommonImageReducer;
