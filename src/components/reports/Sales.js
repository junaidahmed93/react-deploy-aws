import React from 'react';
// import { Table, Button } from 'antd';
// import { Pagination } from 'antd';
import Paper from 'material-ui/Paper';

const style = {
  // height: 400,
  width: '98%',
  textAlign: 'center',
  display: 'inline-block',
  margin: '0.5rem 1rem',
  padding: '5px',
  // border: '1px solid orange'
};

const shortSheets = {
  width: '30%',
  textAlign: 'center',
  display: 'inline-block',
  margin: '1rem 1rem',
};

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 1,
    address: 'Ahmed',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 2,
    address: 'Danial',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 3,
    address: 'Zul',
  }, {
    key: '4',
    name: 'Jim Red',
    age: 4,
    address: 'Jawad',
  },
  {
    key: '5',
    name: 'John Brown',
    age: 5,
    address: 'Carl',
  }, {
    key: '6',
    name: 'Jim Green',
    age: 6,
    address: 'Gohar',
  }, {
    key: '7',
    name: 'Joe Black',
    age: 7,
    address: 'Bin',
  }, {
    key: '8',
    name: 'Jim Red',
    age: 8,
    address: 'Ebad',
  },
  {
    key: '9',
    name: 'John Brown',
    age: 9,
    address: 'Waq',
  }, {
    key: '10',
    name: 'Jim Green',
    age: 10,
    address: 'Yug',
  }, {
    key: '11',
    name: 'Joe Black',
    age: 11,
    address: 'Pak',
  }, {
    key: '12',
    name: 'Jim Red',
    age: 12,
    address: 'Qun',
  },
  {
    key: '13',
    name: 'John Brown',
    age: 13,
    address: 'Rse',
  }, {
    key: '14',
    name: 'Jim Green',
    age: 14,
    address: 'Sun',
  }, {
    key: '15',
    name: 'Joe Black',
    age: 15,
    address: 'Tun',
  }, {
    key: '16',
    name: 'Jim Red',
    age: 16,
    address: 'Vj',
  },

];


export default class Sales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredInfo: null,
      sortedInfo: null,
    };
    this.filteredRecord = 0;
  }

    handleChange = (pagination, filters, sorter) => {
      this.setState({
        filteredInfo: filters,
        sortedInfo: sorter,
      });
    }

    handleOnRow = (record, index) => {
    }

    clearFilters = () => {
      this.setState({ filteredInfo: null });
    }

    clearAll = () => {
      this.setState({
        filteredInfo: null,
        sortedInfo: null,
      });
    }

    setAgeSort = () => {
      this.setState({
        sortedInfo: {
          order: 'descend',
          columnKey: 'age',
        },
      });
    }


    compareByAlph = (a, b) => {
      if (a > b) { return -1; } if (a < b) { return 1; } return 0;
    }

    render() {
      const { bookings } = this.props;
      let { sortedInfo, filteredInfo } = this.state;
      sortedInfo = sortedInfo || {};
      filteredInfo = filteredInfo || {};
      const columns = [{
        title: 'Ref ID',
        dataIndex: 'referenceId',
        key: 'referenceId',

        // filters: [
        //     { text: 'Joe', value: 'Joe' },
        //     { text: 'Jim', value: 'Jim' },
        // ],
        // filteredValue: filteredInfo.name || null,
        // onFilter: (value, record) => record.bookingId.includes(value),
        // sorter: (a, b) => a.bookingId.length - b.bookingId.length,
        // sortOrder: sortedInfo.columnKey === 'bookingId' && sortedInfo.order,
      },
      {
        title: 'Flight Number',
        dataIndex: 'flightNumber',
        key: 'flightNumber',
      },
      {
        title: 'Customer',
        dataIndex: 'userName',
        key: 'userName',
        filters: [
          { text: 'Jawad', value: 'Jawad' },
          { text: 'New York', value: 'New York' },
        ],
        // filteredValue: filteredInfo.userName || null,
        onFilter: (value, record) => {
          const a = record.userName.includes(value);
          if (a) {
            this.filteredRecord = this.filteredRecord + 1;
          }
          return a;
        },
        // sorter: (a, b) => this.compareByAlph(a.address, b.address),
        sorter: (a, b) => a.userName.localeCompare(b.userName),
        sortOrder: sortedInfo.columnKey === 'userName' && sortedInfo.order,
      },
      {
        title: 'No Of Bag',
        dataIndex: 'numberOfBags',
        key: 'numberOfBags',
        filters: [
          { text: '1', value: 'Joe1' },
        ],
        filteredValue: filteredInfo.numberOfBags || null,
        onFilter: (value, record) => {
          record.includes(value);
        },
        sorter: (a, b) => a.numberOfBags - b.numberOfBags,
        sortOrder: sortedInfo.columnKey === 'numberOfBags' && sortedInfo.order,
      },
      {
        title: 'Total Charge',
        dataIndex: 'totalCharges',
        key: 'totalCharges',
      }];
      return (
        <div>
          <div className="table-operations">
            <Paper style={shortSheets} zDepth={1}>
                        Total Bookings: {bookings.length}
            </Paper>

            <Paper style={shortSheets} zDepth={1}>
                        Total Sales: {this.filteredRecord}
            </Paper>

            <Paper style={shortSheets} zDepth={1}>
                        Total Sales:
            </Paper>
            {/* <Button onClick={this.setAgeSort}>Sort age</Button>
                    <Button onClick={this.clearFilters}>Clear filters</Button>
                    <Button onClick={this.clearAll}>Clear filters and sorters</Button> */}
          </div>
         
        </div>
      );
    }
}
