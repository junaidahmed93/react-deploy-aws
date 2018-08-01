
import request from 'superagent';
import { browserHistory } from 'react-router';
import APIURL from '../constants/apiUrlConstants';
import Converters from '../utils/Converters';
import locations from '../constants/locationsContants';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';
import { AuthIntercept } from './LogoutSource';

const bookingDataMapping = (booking) => {
  const flightTimeStamp = Converters.flightDateAndTimeWithUTC(booking.flightDate, booking.flightTime);
  const pickupTimeStamp = Converters.LocalToUTC(booking.pickupTime);
  const dropoffTimeStamp = Converters.LocalToUTC(booking.dropoffTime);

  const newBooking = {
    userDto: {
      name: booking.guestName,
      email: booking.emailAddress,
      phoneNumber: booking.contactNumber,
      roleName: 'guest',
      country: booking.country,
      registerType: 'normal',
    },
    bookingDto: {
      flightNumber: booking.flightNumber,
      flightDepartureTime: flightTimeStamp,
      departureLocationName: `${booking.dropoffAirport}↵${booking.dropoffTerminal}`,
      departureLongitude: locations[Converters.airPortNameToRegionId(booking.dropoffAirport)].longitude,
      departureLatitude: locations[Converters.airPortNameToRegionId(booking.dropoffAirport)].latitude,
      pickupLocationName: booking.pickupAddress,
      requestedPickupLongitude: (booking.pickupLong).toString(),
      requestedPickupLatitude: (booking.pickupLat).toString(),
      requestedPickupTime: pickupTimeStamp,
      numberOfBags: booking.luggages,
      dropOffTime: dropoffTimeStamp,
      numberOfCompanions: booking.numberOfCompanions,
      description: booking.description,
      commentsForDriporter: booking.commentsForDriporter,
      //    "numberOfCompanions":"3",
      //    "description":"i have fragile luggage" ,
      //    "commentsForDriporter":"donnt ring the door bell",
      completeAddress: loadState().hoteladdress,
      serviceAreaId: Converters.airPortNameToRegionId(booking.dropoffAirport),
    },
  };

  return newBooking;
};
const HotelNewBookingSource = {
  addNewBooking(booking) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token, deviceId: '123', OSVersion: 'win10' });
    const payload = bookingDataMapping(booking);
    return new Promise((resolve, reject) => {
      request.post(APIURL.NEW_BOOKING)
        .send(payload)
        .use(AuthIntercept).accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)

        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              browserHistory.push('/home/hotel/bookings');
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

export default HotelNewBookingSource;
