
import request from 'superagent';
import { browserHistory } from 'react-router';
import APIURL from '../constants/apiUrlConstants';
import Converters from '../utils/Converters';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';
import { AuthIntercept } from './LogoutSource';

const editProfileDataMapping = (profile) => {
  const pro = {
    name: profile.name,
    email: profile.email,
    phoneNumber: profile.phoneNumber,
    country: profile.nationality,
    deviceToken: '46783463hjg',
    roleName: 'admin',
    registerType: 'normal',
    emiratesId: profile.emiratesId,
    city: profile.city,
    nationality: profile.nationality,
    emergencyName: profile.emergencyName,
    emergencyNumber: profile.emergencyNumber,
    emergencyRelation: profile.emergencyRelation,
    dateOfBirth: Converters.dateConverter(profile.dateOfBirth),

    roles: [
      { id: profile.roles[0].id, roleType: profile.roles[0].roleType },
    ],

    imagesDtoList: {
      imagesList: [
        {
          // "fileName": "profile.jpg",
          fileName: 'profile.jpg',
          type: 'display',
          images: profile.profilePictureBaseUrl,

        },
      ],
    },

  };


  return pro;
};

const ProfileSource = {
  getProfileDetails(id) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });
    const url = APIURL.OPSPORTER_PROFILE.replace('{id}', id);
    return new Promise((resolve, reject) => {
      request.get(url)
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              const imagesName = responseData.data.displayImageUrl;
              const imageURL = APIURL.IMAGES.replace('{fileName}', imagesName);
              const imgHeader = Object.assign({}, { token });
              request.get(imageURL)
                .use(AuthIntercept).accept('image/jpeg')
                .set(imgHeader)
                .responseType('blob')
                .timeout(30000)
                .end((errInGetImg, responseGetImages) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(responseGetImages.body);
                  reader.onloadend = () => {
                    const base64data = reader.result;
                    // resolve(base64data)
                    const finalResponse = Object.assign({}, responseData.data, { profileImgae: base64data });
                    resolve({ requestedResult: true, data: finalResponse });
                  };
                });
            }
            if (responseData && responseData.success === false) {
              const handleError = ErrorMapping.serverDefinedError(responseData);
              resolve({ requestedResult: false, message: handleError });
            }
          } else {
            const handleError = ErrorMapping.unhandleError(err);
            reject({ requestedResult: false, message: handleError });
          }
        });
    });
  },
  updateProfile(profile) {
    const token = loadState().token;
    const header = Object.assign({}, { token, deviceId: '123' });
    const payload = Object.assign({}, editProfileDataMapping(profile), { id: profile.id });
    const parseOb = JSON.stringify(payload);

    return new Promise((resolve, reject) => {
      request.put(APIURL.UPDATE_USER)
      // .send(data)
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .field('userDetails', parseOb)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              browserHistory.push('/home/admin/dashboard');
              resolve({ requestedResult: true, data: responseData.data });
            }
            if (responseData && responseData.success === false) {
              const handleError = ErrorMapping.serverDefinedError(responseData);
              reject({ requestedResult: false, message: handleError });
            }
          } else {
            const handleError = ErrorMapping.unhandleError(err);
            reject({ requestedResult: false, message: handleError });
          }
        });
    });
  },
};

export default ProfileSource;
