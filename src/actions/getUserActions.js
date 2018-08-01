import request from 'superagent';
import CONSTANTS from '../constants/actionConstants';
import APIURL from '../constants/apiUrlConstants';
import * as loaderActions from './loaderActions';
import MessageBox from '../components/MessageBox';
import { loadState } from '../utils/StorageUtils';
import { AuthIntercept } from '../sources/LogoutSource';

export function getUserSuccess(userList) {
  const action = {
    type: CONSTANTS.GET_USER_SUCCESS,
    userList,
  };
  return action;
}
export function getUserFail() {
  const action = {
    type: CONSTANTS.GET_USER_FAIL,
  };
  return action;
}

const requestGetUsers = () => {
  const token = loadState().token;
  const header = {
    'Content-Type': 'application/json',
    DeviceId: '12',
    OSVersion: 'Win10',
    token,
  };
  return new Promise((resolve, reject) => {
    request.get(APIURL.GET_USER)
      .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
      .set(header)
      .timeout(30000)
      .end((err, res) => {
        if (res && res.text) {
          resolve(JSON.parse(res.text));
        } else {
          reject(err);
        }
      });
  });
};


export function getUsers() {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return requestGetUsers()
      .then((user) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getUserSuccess(user.data.adminList || user.data));
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getUserFail());
        MessageBox(err.message, 'error');
      });
  };
}

//  const userDataMapping = (user) => {
//     let filteredUser =
//         {
//             "name": user.firstName + ' ' + user.lastName,
//             "password": user.password,
//             "email": user.emailAddress,
//             "phoneNumber": user.contactNumber,
//             "country": user.country,
//             "deviceToken": "46783463hjg",
//             "roleName": user.userRole,
//             "registerType": "normal",
//             "emiratesId": user.emiratesId,
//             "city": user.city,
//             "nationality": user.nationlaity,
//             "emergencyName": user.fullName,
//             "emergencyNumber": user.emergencyNumber,
//             "emergencyRelation": user.relation,
//             "dateOfBirth": user.dateOfBirth
//         }
//     return filteredUser;
// }

