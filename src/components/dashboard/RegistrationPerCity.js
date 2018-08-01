import React, { Component } from 'react';
import { XAxis, YAxis, Tooltip, LineChart, Line, Legend } from 'recharts';
// import { DatePicker } from 'antd';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';
import moment from 'moment';
import _ from 'lodash';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import InputSelect from '../shared/forms/InputSelect';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
// import { Input, Select, Button, AutoComplete, Cascader } from 'antd';

// const ButtonGroup = Button.Group;
// const InputGroup = Input.Group;
// const Option = Select.Option;
// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const renderLegend = () => (
  <span>Date</span>
);

class RegistrationPerCity extends Component {
  constructor() {
    super();
    this.selectCountry = ['Dubai'];
    this.state = {
      startDate: moment(),
      graphData: [{ day: 'Jul 02', Dubai: 2 }],
      selectedCity: '3,4',
      selectedDay: new Date().getTime() - (60000 * 60 * 24 * 7),
    };
    this.placeholderDate = new Date().getTime() - (60000 * 60 * 24 * 7);
  }

    applyFilter = () => {
      const { selectedDay, selectedCity } = this.state;
      this.props.graphDetail(selectedDay, selectedCity);
    }

    clearFilter = () => {
      this.setState({ selectedDay: new Date().getTime() - (60000 * 60 * 24 * 7) });
      this.props.resetFilters();
    }


    handleChange = (value) => {
      let regionID = [1, 2, 3, 4];
      if (value === 'Dubai') {
        regionID = 3;
      }
      if (value === 'Bahrain') {
        regionID = 4;
      }
      if (value === 'All') {
        regionID = '3,4';
      }
      this.setState({ selectedCity: regionID });
    }

    onDayChange = (day) => {
      this.setState({ selectedDay: new Date(day).getTime() });
    }

    componentWillReceiveProps(nextProps) {
      const { selectedCity, selectedDay } = this.state;
      if (nextProps && nextProps.registrationsPerCityWeeklyReport && !(_.isEmpty(nextProps.registrationsPerCityWeeklyReport))) {
        const bookingData = nextProps.registrationsPerCityWeeklyReport;
        const localGraphpData = [];
        Object.keys(bookingData).forEach((date) => {
          let obj = {};

          const extractedDay = new Date(Number(date)).toString().substring(8, 10);

          obj = Object.assign({}, { day: extractedDay, orginalDate: date });
          if (bookingData[date]) {
            Object.keys(bookingData[date]).forEach((city) => {
              if (city == 'UAE' || city == 'United Arab Emirates' || city == 'Emirati' || city == 'Dubai') {
                obj = Object.assign(obj, { Dubai: bookingData[date][city], Bahrain: 0 });
              } else if (city == 'BAH' || city == 'Bahrain') {
                obj = Object.assign(obj, { Bahrain: bookingData[date][city], Dubai: 0 });
              } else {
                obj = Object.assign(obj, { Dubai: 0, Bahrain: 0 });
              }
              // const cityName = bookingData[date];
              // obj = Object.assign(obj, { [city]: bookingData[date][city] });
            });
            localGraphpData.push(obj);
          } else {
            obj = Object.assign(obj, { Dubai: 0, Bahrain: 0 });
            localGraphpData.push(obj);
          }
        });
        localGraphpData.sort((a, b) => a.orginalDate - b.orginalDate);
        this.setState({ graphData: localGraphpData });
      }
      if (nextProps && nextProps.registrationsPerCityWeeklyReport && (_.isEmpty(nextProps.registrationsPerCityWeeklyReport))) {
        const startingDate = new Date(selectedDay).getDate();
        const endingDate = new Date();
        const localGraph = [];
        let selectedDate = selectedDay - (24 * 60 * 60 * 1000);
        for (let i = 0; i < 8; i++) {
          // alert()
          selectedDate += (24 * 60 * 60 * 1000);
          const day = new Date(selectedDate).getDate();
          localGraph.push({ day, Dubai: 0 });
        }
        this.setState({ graphData: localGraph });
      }
    }

    render() {
      const { graphData, selectedDay, selectedCity } = this.state;
      return (
        <div>
          <h3>Registration Per City</h3>
          <Divider className="paper-divider m-top-bottom-07em bold-hr" />
          <Grid>
            <Row>
              <Col md={5} style={{ position: 'relative' }}>
                <DayPickerInput onDayChange={this.onDayChange} 
                placeholder={`${formatDate(selectedDay)}`} 
                value={`${formatDate(selectedDay)}`} 
                dayPickerProps={{
                  selectedDays: selectedDay,
                  disabledDays: {
                    before: new Date(2018, 0, 1),
                    after: new Date(new Date().getTime()),
                  },
                }}
                />
              </Col>
              <Col md={4}>
               
              </Col>
              <Col md={3}>
               
              </Col>
            </Row>
          </Grid>
          <Divider className="paper-divider m-top-bottom-07em bold-hr" />
          <LineChart
            width={350}
            height={350}
            data={graphData}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="day" label={{ value: '', position: 'insideBottom' }} />
            <YAxis label={{ value: 'Total Registrations', angle: -90, position: 'insideBottomLeft' }} domain={[1,10]}/>
            <Tooltip />

            <Legend content={renderLegend} />
            <Legend />
            {selectedCity === 3 ? <Line type="monotone" dataKey="Dubai" stroke="red" /> : null}
            {selectedCity === 4 ? <Line type="monotone" dataKey="Bahrain" stroke="blue" /> : null}
            {selectedCity == '3,4' ?
                        [
                          <Line type="monotone" dataKey="Dubai" stroke="red" key={1} />,
                          <Line type="monotone" dataKey="Bahrain" stroke="blue" key={2} />,
                        ]
                        : null}


          </LineChart >
          {/* <span>Registrations</span> */}
        </div>
      );
    }
}

export default RegistrationPerCity;
