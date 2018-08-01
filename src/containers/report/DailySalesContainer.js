import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import momentTZ from 'moment-timezone';
import { bindActionCreators } from 'redux';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import LeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import * as ReportActions from '../../actions/ReportActions';
import * as BookingActions from '../../actions/bookingActions';
import RangePicker from '../../components/reports/RangePicker';
import DateField from '../../components/shared/report-form/DateField';
import InputSelect from '../../components/shared/forms/InputSelect';
import InputEditSelect from '../../components/shared/forms/InputEditSelect';
import DisabledInputSelect from '../../components/shared/forms/DisabledInputSelect';
import DailySalesTable from '../../components/reports/DailySalesTable';
import PrintDailySales from '../../components/reports/PrintDailySales';
import Sales from '../../components/reports/Sales';
import GlobalStyle from '../../utils/Styles';
import { store } from '../../store';
import { nextBookings, previousBookings, startRecord, endRecord, totalRecords } from '../../utils/SalesPagination';
// import { DatePicker } from 'antd';
// const { RangePicker } = DatePicker;
class DailySalesContainer extends Component {
  constructor() {
    super();
    this.state = {
      currentRowCount: 10,
      startSearch: false,
      cityValue: '',
      value: '',
      errorText: '',
      storedRecords: [],
      shownRecords: [],
      selectedDateRange: [],
      startingDate: '',
      endingDate: '',
      clearDatePicker: false,
      openPopover: false,
      selectedCity: 'Dubai',
      selectedNoBag: 'No Selection',
      selectedCharge: 'No Selection',
      cityList: ['Dubai', 'Bahrain'],
      bagCountList: ['No Selection', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      serviceArea: ['Dubai', 'Bahrain'],
      totalChargeList: ['No Selection', 30, 50, 100, 150],
      staffTypeCategory: ['Opsporter', 'Driporter'],
      reportCategories: ['Daily Sales'],
      riskTypeCategory: ['All', 'Pick Up pending', 'Drop off pending', 'Collection pending'],
    };
    this.searchedRecords = [];
    this.startingNextCount = 0;
  }
  componentDidMount() {
    this.startingNextCount = 0;
    // this.dailySales();
    const dailySales = {
      pageNumber: 0,
      pageSize: 500,
      serviceAreaId: '3',
      numBags: '',
      invoiceTotal: '',
      date_from: '',
      date_to: '',
    };
    this.props.ReportActions.refreshAfterEachRecord();
    this.props.ReportActions.dailySalesReport(dailySales);
  }

  dailySales = () => {
    const {
      cityValue, startingDate, endingDate, selectedNoBag, selectedCharge,
    } = this.state;
    this.setState({ clearDatePicker: false });
    const dailySales = {
      pageNumber: 0,
      pageSize: 500,
      serviceAreaId: cityValue,
      date_from: startingDate,
      date_to: endingDate,
      numBags: selectedNoBag === 'No Selection' ? '' : selectedNoBag,
      invoiceTotal: selectedCharge === 'No Selection' ? '' : selectedCharge,
    };

    this.props.ReportActions.refreshAfterEachRecord();
    this.props.ReportActions.dailySalesReport(dailySales);
  }

  clearDailySales = () => {
    const { selectedDateRange, clearDatePicker } = this.state;
    this.setState({
      selectedDateRange: [], selectedNoBag: 'No Selection', selectedCharge: 'No Selection', clearDatePicker: true,
    });


    const dailySales = {
      pageNumber: 0,
      pageSize: 500,
      serviceAreaId: 3,
      numBags: '',
      invoiceTotal: '',
      date_from: '',
      date_to: '',
    };
    this.props.ReportActions.refreshAfterEachRecord();
    this.props.ReportActions.dailySalesReport(dailySales);
  }

  onCityChange = (id, value) => {
    if (value === 'Dubai') {
      this.setState({ cityValue: 3, selectedCity: 'Dubai' });
    }
    if (value === 'Bahrain') {
      this.setState({ cityValue: 4, selectedCity: 'Bahrain' });
    }
  }

  onNoBagChange = (id, value) => {
    this.setState({ selectedNoBag: value });
  }

  onTotalChargeChange = (id, value) => {
    this.setState({ selectedCharge: value });
  }

  componentWillMount() {
    clearInterval(this.interval);
  }

  componentWillReceiveProps(nextProps) {
    const { showRiskType, showDailySales } = this.state;
    if (nextProps && nextProps.dailySales && nextProps.dailySalesSuccess === true) {
      this.setState({
        showJobRiskFirst: false,
        showDailySales: true,
        storedRecords: nextProps.dailySales,
        shownRecords: nextProps.dailySales.slice(0, 10),
      });
    }
  }

  onChange = (date, dateString) => {
    this.setState({ selectedDateRange: date });
  }

  onSearchChanged = (object, value) => {
    this.searchedRecords = [];
    if (value === '') {
      this.setState({ shownRecords: this.state.storedRecords.slice(0, 10), startSearch: false });
      this.searchedRecords = [];
    } else {
      this.state.storedRecords.forEach((item) => {
        if (item.userName.toLowerCase().search(value.toLowerCase()) !== -1) {
          this.searchedRecords.push(item);
        }
      });
      this.startingNextCount = 0;
      this.setState({ shownRecords: this.searchedRecords, startSearch: true });
    }
  }

  nextButton = () => {
    const nextRecords = nextBookings(this.state, this.startingNextCount);
    if (nextRecords) {
      this.startingNextCount = nextRecords;
      this.setState({ shownRecords: this.state.storedRecords.slice(nextRecords, nextRecords + 10) });
    }
  }

  previousButton = () => {
    const previousRecords = previousBookings(this.state, this.startingNextCount);
    if (!(previousRecords < 0)) {
      this.startingNextCount = previousRecords;
      this.setState({ shownRecords: this.state.storedRecords.slice(previousRecords, previousRecords + 10) });
    }
  }

  printReport = () => {
    const divElements = document.getElementById('printTable').innerHTML;
    const newWin = window.open('');
    newWin.document.body.innerHTML =
      `<html><head><title></title></head><body>${
      divElements}</body>`;
    newWin.window.print();
    newWin.close();
  }

  pickerStartChange = (from) => {
    this.setState({ startingDate: from });
  }

  pickerEndChange = (to) => {
    this.setState({ endingDate: to });
  }

  exportTableToCSV = (filename) => {
    const csv = [];
    const rows = this.state.storedRecords;
    for (let i = 0; i < rows.length; i++) {
      let row = [],
        cols = rows[i];

      for (const key in cols) {
        if (cols.hasOwnProperty(key)) {
          // console.log(`${key} -> ${cols[key]}`, typeof cols[key]);
          if (typeof cols[key] === 'object') {
            for (const nestKey in cols[key]) {
            
            }
          }
          else {
            if (key === 'referenceId') {
              row[0] = cols[key];
            }
            if (key === 'flightNumber') {
              row[1] = cols[key];
            }
            if (key === 'userName') {
              row[2] = cols[key];
            }
            if (key === 'numberOfBags') {
              row[3] = cols[key];
            }
            if (key === 'totalCharges') {
              row[4] = cols[key];
            }

          }

        }
      }

      // for (var j = 0; j < cols.length; j++)
      //   row.push(cols[j].innerText);
      if (i === 0) {
        csv.push(['Ref ID', 'Flight Number', 'Customer', 'No of Bag', 'Charge Amount'])
      }

      csv.push(row.join(','));
    }

    // Download CSV file
    this.downloadCSV(csv.join('\n'), filename);
  }

  downloadCSV = (csv, filename) => {
    let csvFile;
    let downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: 'text/csv' });

    // Download link
    downloadLink = document.createElement('a');

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = 'none';

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
  }

  showPopover = (event) => {
    this.setState({
      openPopover: true,
      anchorEl: event.currentTarget,
    });
  }

  onPopoverClose = () => {
    this.setState({
      openPopover: false,
    });
  }

  exportCSV = () => {
    const currentTime = new Date().toString().substring(4,10).replace(" ", "-");;
    const reportName = `Daily-Sales-` + currentTime;
    this.exportTableToCSV(`${reportName}.csv`);
    this.setState({
      openPopover: false,
    });
  }

  sortSales = (columnName) => {
    const { storedRecords } = this.state;
    if (columnName === 'ID-ascend' || columnName === 'ID-descend') {
      storedRecords.sort((a, b) => {
        if (columnName === 'ID-ascend') {
          return a.referenceId.substr(3) - b.referenceId.substr(3);
        }

        return b.referenceId.substr(3) - a.referenceId.substr(3);
      });
    }
    if (columnName === 'noOfBag-ascend' || columnName === 'noOfBag-descend') {
      storedRecords.sort((a, b) => {
        if (columnName === 'noOfBag-ascend') {
          return a.numberOfBags - b.numberOfBags;
        }
        return b.numberOfBags - a.numberOfBags;
      });
    }
    if (columnName === 'chargeAmount-ascend' || columnName === 'chargeAmount-descend') {
      storedRecords.sort((a, b) => {
        if (columnName === 'chargeAmount-ascend') {
          return a.totalCharges - b.totalCharges;
        }

        return b.totalCharges - a.totalCharges;
      });
    }
    this.setState({ storedRecords, shownRecords: storedRecords.slice(0, 10) });
  }
  render() {
    const {
      showDailySales, storedRecords, clearDatePicker, shownRecords, cityList, selectedCity, bagCountList, selectedNoBag, totalChargeList, selectedCharge,
    } = this.state;

    const pagination = (<div className="flex-container-pagination Pagination report-pagination">
      <div className="pagination-child pagination-child-count">
        <span style={GlobalStyle.tablePageCount}>
          {startRecord(this.state, this.startingNextCount)} - {endRecord(this.state, this.startingNextCount)} of {totalRecords(this.state)}
        </span>
      </div>
      <div className="pagination-child">
        <div className="pagination-left-button"><LeftArrow style={GlobalStyle.paginationButtons} onClick={this.previousButton} /></div>
      </div>
      <div className="pagination-child">
        <div className="pagination-right-button"><RightArrow style={GlobalStyle.paginationButtons} onClick={this.nextButton} /></div>
      </div>
    </div>);


    return (
      <div id="vehicleContainer">
        {/* <Paper style={styles.paperStyle} zDepth={1}>
                    <BookingCharts />
                </Paper> */}
        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <Grid fluid className="container-no-padding">
            <Row between="xs">
              <Col xs={6} style={GlobalStyle.containerHeader}>
                <h2 className="paper-title">Daily Sales Overview</h2>
              </Col>
              <Col xs={6}>
                <div style={{ float: 'right' }}>
                  {/* <TextField
                    className="search-text-field"
                    hintText="Report"
                    floatingLabelText="Search"
                    onChange={this.onSearchChanged}
                  /> */}

                </div>

              </Col>
            </Row>
          </Grid>
          <Divider className="paper-divider m-top-bottom-07em bold-hr" />
          <Grid fluid>
            <Row>
              <Col md={2}>
                <InputEditSelect
                  id="dailSalesCity"
                  values={cityList}
                  prefilled={selectedCity}
                  setValue={this.onCityChange}
                  label="City"
                />
              </Col>
              <Col md={2}>
                <InputEditSelect
                  id="dailySalesNoBag"
                  values={bagCountList}
                  prefilled={selectedNoBag}
                  setValue={this.onNoBagChange}
                  label="No of Bag"
                />
              </Col>
              <Col md={2}>
                <InputEditSelect
                  id="dailySalesTotalCharge"
                  values={totalChargeList}
                  prefilled={selectedCharge}
                  setValue={this.onTotalChargeChange}
                  label="Charged Amount"
                />
              </Col>
              <Col md={4}>
                <div style={{ marginTop: '20px' }}>
                  <RangePicker pickerStartChange={this.pickerStartChange} pickerEndChange={this.pickerEndChange} clearDatePicker={clearDatePicker} />
                  {/* <RangePicker style={{ border: 'none' }} size='large' onChange={this.pickerChange} value={selectedDateRange} /> */}
                </div>
              </Col>

              <Col md={2}>
                <FlatButton label="Apply" onClick={this.dailySales} className="report-button float-right daily-sales-filter" />
                <FlatButton label="Clear" onClick={this.clearDailySales} className="report-button float-right" />
              </Col>

              <Divider className="paper-divider m-top-bottom-07em bold-hr" />
            </Row>
          </Grid>
          <Divider className="paper-divider m-top-bottom-07em bold-hr" />

          {showDailySales ?
            <div>
              <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>

                <div style={{ display: 'none' }}>
                  <PrintDailySales bookings={storedRecords} {...this.state} />
                </div>
                <DailySalesTable bookings={shownRecords} totalBooking={storedRecords} sortSales={this.sortSales} />
              </Paper>
              {pagination}
            </div>
            : null}

          <div style={{ clear: 'both' }} />
          {shownRecords.length > 0 ?
            <Grid>
              <Row>
                <Col md={10} />
                <Col md={1}>
                  <FlatButton label="Export" onClick={this.showPopover} className="report-button float-right" />
                  
                  <Popover
                    style={{marginTop: '42px'}}
                    open={this.state.openPopover}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                    onRequestClose={this.onPopoverClose}
                  >
                    <Menu>
                      <MenuItem primaryText="CSV" onClick={this.exportCSV}/>
                      {/* <MenuItem primaryText="Excel" /> */}
                    </Menu>
                  </Popover>
                </Col>
                <Col md={1}>
                  <FlatButton label="Print" onClick={() => { this.printReport(); }} className="report-button" />
                  
                </Col>
              </Row>
            </Grid>
            : null}

            <br/>
            <br/>
        </Paper>

      </div >
    );
  }
}


function mapStateToProps(state) {
  return {
    bookings: state.bookingReducer.bookings,
    dailySales: state.ReportReducer.dailySales,
    dailySalesSuccess: state.ReportReducer.dailySalesSuccess,
  };
}

function mapDispatchToProps(dispatch) {
  dispatch(ReportActions.getDailySalesSuccessAfter());
  return {
    ReportActions: bindActionCreators(ReportActions, dispatch),
    BookingActions: bindActionCreators(BookingActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DailySalesContainer);
