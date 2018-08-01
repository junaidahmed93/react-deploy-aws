import React, { Component } from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import { store, persistor } from './store';
import LoginContainer from './containers/LoginContainer';
import MainContainer from './containers/MainContainer';
import AdminContainer from './containers/AdminContainer';
import HotelContainer from './containers/hotel-checkin/HotelContainer';
// import RemoteContainer from "./containers/remote-checkin/RemoteContainer";
import AddUser from './containers/configure/user-panel/AddUser';
import AddRemoteUserContainer from './containers/remote-checkin/AddRemoteUserContainer';
import EditUserContainer from './containers/configure/user-panel/EditUserContainer';

import BatchPendingContainer from './containers/booking/BatchPendingContainer';

import ImageViewerContainer from './containers/images/ImageViewerContainer';

import BookingContainer from './containers/booking/BookingContainer';
import CompletedBookingContainer from './containers/booking/CompletedBookingContainer';
import NewBookingContainer from './containers/booking/NewBookingContainer';
import EditBookingContainer from './containers/booking/EditBookingContainer';
import DashboaradContainer from './containers/Dashboard/DashboaradContainer';
import UserPanelContainer from './containers/configure/user-panel/UserPanelContainer';
import VehicleContainer from './containers/vehicle/VehicleContainer';
import AddVehicleContainer from './containers/vehicle/AddVehicleContainer';
import EditVehicleContainer from './containers/vehicle/EditVehicleContainer';
import DriporterContainer from './containers/driporter/DriporterContainer';
import EditDriporterContainer from './containers/driporter/EditDriporterContainer';
import NewDriporterContainer from './containers/driporter/NewDriporterContainer';
import DriporterJobContainer from './containers/driporter/DriporterJobContainer';
import OpsporterContainer from './containers/opsporter/OpsporterContainer';
import NewOpsporterContainer from './containers/opsporter/NewOpsporterContainer';
import EditOpsporterContainer from './containers/opsporter/EditOpsporterContainer';
import OpsporterJobContainer from './containers/opsporter/OpsporterJobContainer';
import HotelPartnerContainer from './containers/configure/hotel-partner/HotelPartnerContainer';
import AddHotelPartnerContainer from './containers/configure/hotel-partner/AddHotelPartnerContainer';
import EditHotelPartnerContainer from './containers/configure/hotel-partner/EditHotelPartnerContainer';
import BookingListContainer from './containers/hotel-checkin/hotel-booking/BookingListContainer';
import BookingAddContainer from './containers/hotel-checkin/hotel-booking/BookingAddContainer';
import BookingEditContainer from './containers/hotel-checkin/hotel-booking/BookingEditContainer';
import BookingTrackContainer from './containers/hotel-checkin/hotel-booking/BookingTrackContainer';
import StaffOverviewContainer from './containers/hotel-checkin/staff/StaffOverviewContainer';
import AddStaffContainer from './containers/hotel-checkin/staff/AddStaffContainer';
import EditStaffContainer from './containers/hotel-checkin/staff/EditStaffContainer';

import CustomerContainer from './containers/customer/CustomerContainer';
import CustomerNotificationContainer from './containers/customer/CustomerNotificationContainer';

// import GrowthContainer from './containers/growth/GrowthContainer';
// import ReportContainer from './containers/report/ReportContainer';
import DailySalesContainer from './containers/report/DailySalesContainer';
import JobAtRiskContainer from './containers/report/JobAtRiskContainer';
import UpcomingsContainer from './containers/report/UpcomingsContainer';

import ProfileContainer from './containers/profile/ProfileContainer';
import NotFound from './containers/NotFound';
import PromoListContainer from './containers/promo/PromoListContainer';
import PromoAddContainer from './containers/promo/PromoAddContainer';
import PromoEditContainer from './containers/promo/PromoEditContainer';
// import HttpsRedirect from 'react-https-redirect';

class App extends Component {
  constructor(props) {
    super(props);
    this.requireAuth = this.requireAuth.bind(this);
  }

  requireAuth(nextState, replace) {
    if (!store.getState().loginReducer.isLoggedIn) {
      replace({
        pathname: '/',
      });
    }
    if (nextState.location.pathname === '/home' || nextState.location.pathname === '/home/' || nextState.location.pathname === '/home/hotel' || nextState.location.pathname === '/home/hotel/') {
      replace({
        pathname: '/home/admin/dashboard',
      });
    }
  }
  requireHotelAdmin(nextState, replace) {
    // if (store.getState().loginReducer.user.role.roleType === 'hotelCheckInAdmin') {
    //   replace({
    //     pathname: '/home/hotel/bookings'
    //   })
    // }

    if (store.getState().loginReducer.user.userId === 245) {
      replace({
        pathname: '/home/hotel/bookings',
      });
    }
  }
  mustAdmin(nextState, replace) {
    if (store.getState().loginReducer.user.role.roleType === 'hotelCheckInAdmin') {
      replace({
        pathname: '/home/hotel/bookings',
      });
    }
  }
  render() {
    return (
      <MuiThemeProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            {/* <HttpsRedirect> */}
            <Router history={browserHistory}>
              <Route path="/">
                <IndexRoute component={LoginContainer} />
                <Route path="/home" component={MainContainer} onEnter={this.requireAuth}>
                  <Route path="admin" component={AdminContainer} onEnter={this.mustAdmin}>
                    <Route path="profile" component={ProfileContainer} />
                    <Route path="add-user" component={AddUser} />
                    <Route path="user-panel" component={UserPanelContainer} />
                    <Route path="user-panel/:id" component={EditUserContainer} />
                    <Route path="dashboard" component={DashboaradContainer} />

                    <Route path="batch/pending" component={BatchPendingContainer} />

                    <Route path="bookings" component={BookingContainer} />
                    <Route path="bookings/completed" component={CompletedBookingContainer} />
                    <Route path="bookings/:id" component={EditBookingContainer} />
                    <Route path="new-booking" component={NewBookingContainer} />
                    <Route path="vehicle" component={VehicleContainer} />

                    <Route path="vehicle/add" component={AddVehicleContainer} />
                    <Route path="vehicle/:id" component={EditVehicleContainer} />

                    <Route path="images/:id" component={ImageViewerContainer} />

                    <Route path="opsporter" component={OpsporterContainer} />
                    <Route path="opsporter/add" component={NewOpsporterContainer} />
                    <Route path="opsporter/:id" component={EditOpsporterContainer} />
                    <Route path="opsporter-job/:id" component={OpsporterJobContainer} />

                    <Route path="driporter" component={DriporterContainer} />
                    <Route path="driporter/add" component={NewDriporterContainer} />
                    <Route path="driporter/:id" component={EditDriporterContainer} />
                    <Route path="driporter-job/:id" component={DriporterJobContainer} />

                    <Route path="promo" component={PromoListContainer} />
                    <Route path="promo/add" component={PromoAddContainer} />
                    <Route path="promo/:id" component={PromoEditContainer} />

                    <Route path="hotel-partner" component={HotelPartnerContainer} />
                    <Route path="hotel-partner/add" component={AddHotelPartnerContainer} />
                    <Route path="hotel-partner/:id" component={EditHotelPartnerContainer} />

                    <Route path="customer" component={CustomerContainer} />
                    <Route path="customer-notification" component={CustomerNotificationContainer} />

                    <Route path="growth" component={CustomerContainer} />
                    <Route path="report/daily-sales" component={DailySalesContainer} />
                    <Route path="report/risk-job" component={JobAtRiskContainer} />
                    <Route path="report/upcoming" component={UpcomingsContainer} />
                  </Route>
                  {/* <Route path="remote" component={ReportContainer}>
                    <Route path="add-remote-user" component={AddRemoteUserContainer} />
                  </Route> */}
                  <Route path="hotel" component={HotelContainer} >
                    <Route path="profile" component={ProfileContainer} />
                    <Route path="bookings" component={BookingListContainer} />
                    <Route path="bookings/add" component={BookingAddContainer} />
                    <Route path="bookings/:id" component={BookingEditContainer} />
                    <Route path="track" component={BookingTrackContainer} />
                    <Route path="staff" component={StaffOverviewContainer} onEnter={this.requireHotelAdmin} />
                    <Route path="staff/add" component={AddStaffContainer} />
                    <Route path="staff/:id" component={EditStaffContainer} />
                  </Route>
                </Route>
                <Route path="*" component={NotFound} />
              </Route>
            </Router>
            {/* </HttpsRedirect> */}
          </Provider>
        </PersistGate>
      </MuiThemeProvider>
    );
  }
}

export default App;
