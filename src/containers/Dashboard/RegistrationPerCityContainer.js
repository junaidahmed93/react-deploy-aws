import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Converters from '../../utils/Converters';
import RegistrationPerCity from '../../components/dashboard/RegistrationPerCity';
import * as actions from '../../actions/DashboardActions';

class RegistrationPerCityContainer extends Component {
  constructor(props) {
    super(props);
    this.placeholderDate = new Date().getTime() - (60000 * 60 * 24 * 7);
  }

  componentDidMount() {
    const timeInMiliseconds = Converters.pickerDateToUTCmili(this.placeholderDate);
    const chartData = {
      fromDate: timeInMiliseconds,
      regionId: '3,4',
    };
    this.props.actions.getRegistrationPerCity(chartData);
  }

    graphDetail = (selectedDay, selectedCity) => {
      const timeInMiliseconds = Converters.pickerDateToUTCmili(selectedDay);
      const chartData = {
        fromDate: timeInMiliseconds,
        regionId: selectedCity,
      };
      this.props.actions.getRegistrationPerCity(chartData);
    }

    resetFilters = () => {
      const timeInMiliseconds = Converters.pickerDateToUTCmili(this.placeholderDate);
      const chartData = {
        fromDate: timeInMiliseconds,
        regionId: '3,4',
      };
      this.props.actions.getRegistrationPerCity(chartData);
    }


    render() {
      return (
        <RegistrationPerCity registrationsPerCityWeeklyReport={this.props.registrationsPerCityWeeklyReport} graphDetail={this.graphDetail} resetFilters={this.resetFilters} />
      );
    }
}

function mapStateToProps(state) {
  return {
    registrationsPerCityWeeklyReport: state.DashboardReducer.registrationsPerCityWeeklyReport,
  };
}

function mapDispatchToProps(dispatch) {
  dispatch(actions.getRegistrationPerCitySuccessAfter());
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPerCityContainer);

