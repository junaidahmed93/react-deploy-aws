import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import LeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import SelectField from 'material-ui/SelectField';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import BookingCharts from '../../components/booking/BookingCharts';
import GlobalStyle from '../../utils/Styles';
import * as actions from '../../actions/bookingActions';
import BookingTable from '../../components/booking/bookingTable';
import { nextBookings, previousBookings, startRecord, endRecord, totalRecords, totalFilteredRecords } from '../../utils/Pagination';

class BookingContainer extends Component {
  constructor(props) {
    super(props);
    this.onSearchChanged = this.onSearchChanged.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.previousButton = this.previousButton.bind(this);
    this.state = {
      shownRecords: [],
      storedRecords: [],
      currentRowCount: 10,
      startSearch: false,
      filterApplied: false,
      open: false,
      showSearchbar: false,
      showFilterBar: false,
      showTagBar: false,
      value: 1,
      searchedValue: '',
      filteredValues: ['1', '2', '3', '4', '5'],
      cityValue: 'All',
      statusValue: 'All',
      filterSelected: true,
    };
    this.completedBookings = [];
    this.searchedRecords = [];
    this.startingNextCount = 0;
    this.currentPageNumber = -1;
    this.interval = () => { };
    this.cities = ['All', 'Dubai', 'Bahrain'];
    this.statuses = ['All', 'Pending', 'Payment-Pending', 'Payment-Done', 'Enroute-Airport', 'Arrived-Airport', 'Enroute-Customer', 'arrived-customer', 'Driporter_Handshake_Opsporter', 'Customer_Handshake_Opsporter'];
  }

  componentDidMount() {
    this.props.actions.getAllBookings('showLoader');
    this.refreshBooking();
  }

  componentWillReceiveProps(nextProps) {
    const { filterApplied } = this.state;
    setTimeout(() => {
      let endCount;
      let startCount;
      if (this.currentPageNumber > 0) {
        startCount = this.currentPageNumber;
        endCount = startCount + 10;
      } else {
        startCount = 0;
        endCount = this.state.currentRowCount;
      }
      this.completedBookings = [];
      nextProps.bookings.forEach((v) => {
        if (!(v.status === 'completed' || v.status === 'cancelled')) {
          this.completedBookings.push(v);
        }
      });

      this.setState({ storedRecords: nextProps.bookings });
      if (filterApplied) {
        this.checkAppliedFilters();
        this.startingNextCount = 0;
        this.setState({
          startSearch: false,
          searchedValue: '',
          filterSelected: true,
          storedFiltered: this.searchedRecords,
          shownRecords: this.searchedRecords.slice(0, 10),
          filterApplied: true,
        });
      } else {
        this.setState({
          shownRecords: this.completedBookings.slice(startCount, endCount),
          storedRecords: this.completedBookings,
        });
      }
    }, 1);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onSearchChanged = (object, value) => {
    this.searchedRecords = [];
    this.setState({ searchedValue: value });
    if (value === '') {
      this.refreshBooking();
      this.setState({ shownRecords: this.state.storedRecords.slice(0, 10), startSearch: false });
      this.searchedRecords = [];
    } else {
      clearInterval(this.interval);
      this.state.storedRecords.forEach((item) => {
        if (item.referenceId.toLowerCase().search(value.toLowerCase()) !== -1) {
          this.searchedRecords.push(item);
        }
      });
      this.startingNextCount = 0;
      this.setState({ shownRecords: this.searchedRecords, startSearch: true });
    }
  }

  onCityChange = (object, index, value) => {
    this.setState({ cityValue: value });
  }
  onStatusChange = (object, index, value) => {
    this.setState({ statusValue: value });
  }

  clearFilter = () => {
    this.startingNextCount = 0;
    this.searchedRecords = [];
    this.setState({
      startSearch: false,
      searchedValue: '',
      storedFiltered: [],
      shownRecords: [],
      filterApplied: false,
      showFilterBar: false,
      cityValue: 'All',
      statusValue: 'All',
      // storedRecords: nextProps.bookings,
    });
    this.props.actions.getAllBookings('showLoader');
  }

  checkAppliedFilters = () => {
    const { cityValue, statusValue, storedRecords } = this.state;
    if (cityValue === 'All' && statusValue === 'All') {
      // Both All selected
      this.searchedRecords = [];
      storedRecords.forEach((item) => {
        if (item.serviceAreaDto.serviceAreaName === cityValue || cityValue === 'All') {
          this.searchedRecords.push(item);
        }
        console.log('Both All');
      });
    }

    if (cityValue === 'All' && !(statusValue === 'All')) {
      // City All selected and status other than all
      console.log('status', statusValue);
      this.searchedRecords = [];
      storedRecords.forEach((item) => {
        if (item.id == 97) {
          console.log('this item', item);
          console.log('item.status.toLowerCase()', item.status.toLowerCase());
          console.log('statusValue.toLowerCase()', statusValue.toLowerCase());
          console.log(item.status.toLowerCase() === statusValue.toLowerCase());
        }
        if (item.status.toLowerCase() === statusValue.toLowerCase()) {
          this.searchedRecords.push(item);
        }
        console.log('City all status any other than all');
      });
    }

    if (!(cityValue === 'All') && statusValue === 'All') {
      // Status All Selected and City other than all
      this.searchedRecords = [];
      storedRecords.forEach((item) => {
        if (item.serviceAreaDto.serviceAreaName === cityValue) {
          this.searchedRecords.push(item);
        }
        console.log('Status All cuty any  ');
      });
    }

    if (!(cityValue === 'All') && !(statusValue === 'All')) {
      this.searchedRecords = [];
      storedRecords.forEach((item) => {
        if (item.status.toLowerCase() === statusValue.toLowerCase() && item.serviceAreaDto.serviceAreaName === cityValue) {
          this.searchedRecords.push(item);
        }
      });
      console.log('Both Different');
    }
  }


  applyFilter = () => {
    this.checkAppliedFilters();

    this.startingNextCount = 0;
    this.setState({
      startSearch: false,
      searchedValue: '',
      filterSelected: true,
      storedFiltered: this.searchedRecords,
      shownRecords: this.searchedRecords.slice(0, 10),
      filterApplied: true,
      // storedRecords: nextProps.bookings,
    });
  }

  handleChange = (event, index, value) => this.setState({ value });

  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };


  handlerTag = () => {
    this.setState({
      showSearchbar: false, showFilterBar: false, showTagBar: true, open: false,
    });
  }

  refreshBooking() {
    this.interval = setInterval(() => {
      this.currentPageNumber = this.startingNextCount;
      this.props.actions.getAllBookings();
    }, 30000);
  }

  nextButton() {
    console.log('clicked next');
    const nextRecords = nextBookings(this.state, this.startingNextCount);
    let allStored = this.state.storedRecords;
    if (this.state.filterApplied && this.state.storedFiltered && this.state.storedFiltered.length > 0) {
      allStored = this.state.storedFiltered;
    }
    if (nextRecords) {
      this.startingNextCount = nextRecords;
      this.setState({ shownRecords: allStored.slice(nextRecords, nextRecords + 10) });
    }
  }

  previousButton() {
    const previousRecords = previousBookings(this.state, this.startingNextCount);
    let allStored = this.state.storedRecords;
    if (this.state.filterApplied && this.state.storedFiltered && this.state.storedFiltered.length > 0) {
      allStored = this.state.storedFiltered;
    }
    if (!(previousRecords < 0)) {
      this.startingNextCount = previousRecords;
      this.setState({ shownRecords: allStored.slice(previousRecords, previousRecords + 10) });
    }
  }

  handleChange = (event, index, values) => this.setState({ values });

  render() {
    const { filterApplied, searchedValue } = this.state;
    return (
      <div id="vehicleContainer">
        {/* <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <BookingCharts />
        </Paper> */}
        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <Grid fluid className="container-no-padding">
            <Row between="xs">
              <Col xs={4} style={GlobalStyle.containerHeader}>
                <h2 className="paper-title">Bookings Overview</h2>
              </Col>
              <Col xs={8} >
                <div style={{ float: 'right' }}>
                  <Link to="/home/admin/new-booking">
                    <FlatButton label="New Booking" className="add-button-on-header float-right" />
                  </Link>

                  <div style={{ display: 'inline-block' }}>
                    <TextField
                      value={searchedValue}
                      className="search-text-field"
                      hintText="Ref ID"
                      floatingLabelText="Search"
                      onChange={this.onSearchChanged}
                    />
                  </div>
                </div>


              </Col>
            </Row>
          </Grid>

          <Divider className="paper-divider m-top-bottom-07em bold-hr" />
          <Grid fluid className="container-no-padding">
            {this.state.filterSelected ? '' :
            <Row>
              <Col md={4} />
              <Col md={4}>
                  At least one filter need to be selected.
              </Col>
              <Col md={4} />

            </Row>}

            <Row>
              <Col md={3} className="filterSelect">
                <SelectField
                  maxHeight={250}
                  style={{ width: '90%', marginTop: '-15px 0 0 10px !important' }}
                  floatingLabelText="City"
                  value={this.state.cityValue}
                  onBlur={this.onBlur}
                  onChange={this.onCityChange}
                >
                  {this.cities.map(v => <MenuItem value={v} primaryText={v} key={v} />)}
                </SelectField>
              </Col>

              <Col md={3} className="filterSelect">
                <SelectField
                  maxHeight={250}
                  style={{ width: '90%' }}
                  floatingLabelText="Status"
                  value={this.state.statusValue}
                  onBlur={this.onBlur}
                  onChange={this.onStatusChange}
                >
                  {this.statuses.map((v) => {
                    if (v === 'arrived-customer') {
                      return <MenuItem value={v} primaryText="Driporter Arrived" key={v} />;
                    }
                    return <MenuItem value={v} primaryText={v.replace('-', ' ').replace(/_/g, ' ')} key={v} />;
                  })}
                </SelectField>
              </Col>
              <Col md={3} />
              <Col md={3}>
                <Link >
                  <FlatButton onClick={this.applyFilter} label="Apply" className="add-button-on-header float-right apply-button" />
                </Link>
                <Link >
                  <FlatButton onClick={this.clearFilter} label="Clear" className="add-button-on-header float-right apply-button" />
                </Link>
              </Col>
            </Row>


          </Grid>
          <Divider className="paper-divider m-top-bottom-07em bold-hr" />
          <BookingTable rows={this.state.shownRecords} />

          <div className="flex-container-pagination Pagination">
            <div className="pagination-child pagination-child-count">
              <span style={GlobalStyle.tablePageCount}>
                {startRecord(this.state, this.startingNextCount)} - {endRecord(this.state, this.startingNextCount)} of {filterApplied ? totalFilteredRecords(this.state) : totalRecords(this.state)}
              </span>
            </div>
            <div className="pagination-child">
              <div className="pagination-left-button"><LeftArrow style={GlobalStyle.paginationButtons} onClick={this.previousButton} /></div>
            </div>
            <div className="pagination-child">
              <div className="pagination-right-button"><RightArrow style={GlobalStyle.paginationButtons} onClick={this.nextButton} /></div>
            </div>
          </div>
          <div style={{ clear: 'both' }} />
        </Paper>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    bookings: state.bookingReducer.bookings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingContainer);
