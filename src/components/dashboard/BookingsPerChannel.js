import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { DatePicker } from 'antd';
import moment from 'moment';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';
import InputSelect from '../shared/forms/InputSelect';
// import { Input, Select, Button, AutoComplete, Cascader } from 'antd';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate } from 'react-day-picker/moment';

// const ButtonGroup = Button.Group;
// const InputGroup = Input.Group;
// const Option = Select.Option;
// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const renderLegend = () => (
  <span>Date</span>
);

const data = [
  {
    name: '30', ios: 4000, hotel: 2400, admin: 2000,
  },
  {
    name: '31', ios: 3000, hotel: 1398, admin: 2000,
  },
  {
    name: '1', ios: 2000, hotel: 9800, admin: 2000,
  },
  {
    name: '2', ios: 2780, hotel: 3908, admin: 2000,
  },
  {
    name: '3', ios: 1890, hotel: 4800, admin: 2000,
  },
  {
    name: '4', ios: 2390, hotel: 3800, admin: 2000,
  },
  {
    name: '5', ios: 3490, hotel: 4300, admin: 2000,
  },
];

class BookingPerChannel extends Component {
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
      this.setState({ selectedCity: regionID });
    }

    onDayChange = (day) => {
      this.setState({ selectedDay: new Date(day).getTime() });
    }


    render() {
      const { citySelectionRequired, graphData, selectedDay } = this.state;
      return (
        <div>
          <h3>Bookings Per Channel</h3>
          <Divider className="paper-divider m-top-bottom-07em bold-hr" />
          <Grid>
            <Row>
              <Col md={5}>
                <DayPickerInput onDayChange={this.onDayChange} placeholder={`${formatDate(selectedDay)}`} value={`${formatDate(selectedDay)}`} />
              </Col>
              <Col md={4}>
               
              </Col>
              <Col md={3}>
                
              </Col>
            </Row>
          </Grid>
          <Divider className="paper-divider m-top-bottom-07em bold-hr" />
          <BarChart
            width={300}
            height={300}
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ios" fill="#8884d8" />
            <Bar dataKey="hotel" fill="#82ca9d" />
            <Bar dataKey="admin" fill="red" />
          </BarChart>
        </div>

      );
    }
}

export default BookingPerChannel;
