import React, { Component } from 'react';
import { XAxis, YAxis, Tooltip, LineChart, Line, Legend } from 'recharts';
// import { DatePicker } from 'antd';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';
import _ from 'lodash';
import moment from 'moment';
import momentTZ from 'moment-timezone';
import FlatButton from 'material-ui/FlatButton';
// import { Input, Select, InputNumber, AutoComplete, Cascader, Button, Icon } from 'antd';
import dateRange from 'material-ui/svg-icons/action/date-range';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import InputSelect from '../shared/forms/InputSelect';
import Converters from '../../utils/Converters';

// const ButtonGroup = Button.Group;
// const InputGroup = Input.Group;
// const Option = Select.Option;
// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const renderLegend = () => (
  <span>Date</span>
);

class BookingPerCity extends Component {
  constructor() {
    super();
    this.selectCountry = ['Dubai'];
    this.state = {
      startDate: moment(),
      graphData: [],
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
    if (nextProps && nextProps.bookingsPerCity && !(_.isEmpty(nextProps.bookingsPerCity))) {
      const bookingData = nextProps.bookingsPerCity;
      const localGraphpData = [];
      Object.keys(bookingData).forEach((date) => {
        let obj = {};

        const extractedDay = new Date(Number(date)).toString().substring(8, 10);

        obj = Object.assign({}, { day: extractedDay, orginalDate: date });
        if (bookingData[date]) {
          Object.keys(bookingData[date]).forEach((city) => {
            const cityName = bookingData[date];
            obj = Object.assign(obj, { [city]: bookingData[date][city] });
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
    if (nextProps && nextProps.bookingsPerCity && (_.isEmpty(nextProps.bookingsPerCity))) {
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
    const { graphData, selectedDay } = this.state;
    return (
      <div>
        <h3>Bookings Per City</h3>
        <Divider className="paper-divider m-top-bottom-07em bold-hr" />
        <Grid>
          <Row>
            <Col md={5} style={{ position: 'relative' }}>
              <DayPickerInput
                onDayChange={this.onDayChange}
                placeholder={`${formatDate(selectedDay)}`}
                value={`${formatDate(selectedDay)}`}
              />

            </Col>
            <Col md={4}>
             
            </Col>
            <Col md={3}>
             
            </Col>
          </Row>
        </Grid>
        <Divider className="paper-divider m-top-bottom-07em bold-hr" />
        {/* {graphData && graphData.length > 0 ? */}

        <LineChart
          width={350}
          height={350}
          data={graphData}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="day" label={{ value: '', position: 'insideBottom' }} />
          <YAxis label={{ value: 'Complete Bookings', angle: -90, position: 'insideBottomLeft' }} allowDecimals={false} />
          <Tooltip />

          <Legend content={renderLegend} />
          <Legend />
          <Line type="monotone" dataKey="Dubai" stroke="red" />
          <Line type="monotone" dataKey="Bahrain" stroke="blue" />
          <Line type="monotone" dataKey="Karachi" stroke="green" />
        </LineChart >

      </div>

    );
  }
}

export default BookingPerCity;
