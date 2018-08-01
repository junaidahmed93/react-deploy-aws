import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import Idle from 'react-idle';
import * as actions from '../actions/loginActions';
import * as LogoutActions from '../actions/LogoutActions';
import * as NotificationActions from '../actions/NotificationActions';
import * as CommonActions from '../actions/CommonActions';
import * as LoaderActions from '../actions/loaderActions';
import Header from '../components/Header';
import LoaderIndicator from '../components/loader';
import { store } from '../store';
// import bugsnagClient from '../index';

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.profile = this.profile.bind(this);
    this.state = { error: false, batch: [] };
    this.batchInterval = '';
  }

  componentDidMount() {
    this.props.CommonActions.getAllCountries();
    this.props.CommonActions.getAirports();
    this.props.CommonActions.getServiceAreas();
    this.props.CommonActions.getBookingCancelReasons();
    this.props.CommonActions.getPromoTypes();
    this.props.LoaderActions.loaderStop();
    // this.props.CommonActions.getBatch();
    this.batchInterval = setInterval(() => {
      // this.props.CommonActions.getBatch();
    }, 10000);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps && JSON.stringify(nextProps.user) === '{}') {
      browserHistory.push('/');
    }

    if (nextProps && nextProps.batch && nextProps.batch.data) {
      this.setState({ batch: nextProps.batch.data });
    }
  }

  componentDidCatch(error) {
    this.setState({ error });
    // bugsnagClient.notify(new Error(error));
  }

  componentWillUnmount() {
    clearInterval(this.batchInterval);
    store.dispatch(CommonActions.getBatchFail());
  }

  logout() {
    this.props.LogoutActions.logOutUser();
  }

  profile() {
    if (store.getState().loginReducer.user.role.roleType === 'hotelCheckInAdmin') {
      browserHistory.push('/home/hotel/profile');
    }
    if (store.getState().loginReducer.user.role.roleType === 'admin') {
      browserHistory.push('/home/admin/profile');
    }
  }

  handleRequestClose() {
    this.props.NotificationActions.removeNotification();
  }
  render() {
    if (this.state.error) {
      return (<h2>Error: Something wrong happened. Refresh page or Please report to support </h2>);
    }

    return (
      <div>
        <Idle
          timeout={5000000}
          onChange={({ idle }) => console.log({ idle })}
          render={({ idle }) => {
            if (idle) {
              this.props.LogoutActions.logOutUser();
              return (<h1>Session lost</h1>);
            }
            return null;
          }

          }
        />
        <Header logout={this.logout} profile={this.profile} loggedInUser={this.props.user} />
        {this.props.children}
        <LoaderIndicator />
        {/* {
          this.props.isLoading > 0 ? <Snackbar
            open
            message={this.props.message}
            autoHideDuration={3000}
            onRequestClose={() => { this.handleRequestClose(this.props); }}
          /> : null
        } */}
      </div>

    );
  }
}


function mapStateToProps(state) {
  return {
    user: state.loginReducer.user,
    error: state.loginReducer.error,
    message: state.NotificationReducer.message,
    isLoading: state.NotificationReducer.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    NotificationActions: bindActionCreators(NotificationActions, dispatch),
    CommonActions: bindActionCreators(CommonActions, dispatch),
    LogoutActions: bindActionCreators(LogoutActions, dispatch),
    LoaderActions: bindActionCreators(LoaderActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
