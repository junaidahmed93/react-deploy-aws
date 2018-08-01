import CONSTANTS from '../constants/actionConstants';

const initialState = {
  error: '',
  vehicleSaved: false,
};
const AddVehicleReducer = (state = initialState, action) => {
  switch (action) {
    case CONSTANTS.ADD_VEHICLE_SUCCESS:
      return Object.assign({}, state, { vehicleSaved: true });
    case CONSTANTS.ADD_VEHICLE_FAIL:
      return Object.assign({}, state, { vehicleSaved: false });
    default:
      return state;
  }
};

export default AddVehicleReducer;
