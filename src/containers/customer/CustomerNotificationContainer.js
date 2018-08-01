import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import LeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import { getCountries } from '../../utils/Helpers';
import { store } from '../../store';
import GlobalStyle from '../../utils/Styles';
import Converters from '../../utils/Converters';
import * as actions from '../../actions/CustomerActions';
import { nextBookings, previousBookings, startRecord, endRecord, totalRecords } from '../../utils/Pagination';

const styles = {
  customWidth: {
    width: '100%',
  },
};

class CustomerNotificationContainer extends Component {
  constructor(props) {
    super(props);
    this.onSearchChanged = this.onSearchChanged.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.previousButton = this.previousButton.bind(this);
    this.state = {
      shownRecords: [],
      storedRecords: [],
      allNotificationList: [],
      currentRowCount: 10,
      startSearch: false,
      showNotificationList: false,
      show: true,
      notification: '',
      errorText: '',
      title: '',
      errorTextTitle: '',
      CountryValue: 'Select Country',
    };
    const countryList = getCountries();
    this.selectedAll = false;
    this.searchedRecords = [];
    this.startingNextCount = 0;
    this.selectedCustomer = [];
    this.cities = countryList[0];
    this.cities.unshift('Select Country')
  }


  componentDidMount() {
    this.props.actions.getAllNotifications();
    const allCustomer = store.getState().CustomerReducer.customers;
    if (allCustomer === undefined) {
      this.props.actions.getAllCustomer();
    } else if (allCustomer.length === 0) {
      this.props.actions.getAllCustomer();
    } else {
      this.setState({
        shownRecords: allCustomer,
        storedRecords: allCustomer,
      });
      setTimeout(() => {
        this.setState({
          shownRecords: this.state.shownRecords.slice(0, this.state.currentRowCount),
        });
      }, 10);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.notificationSent && nextProps.notificationSent === true) {
      this.props.actions.getAllNotifications();
      this.selectedCustomer = [];
      this.setState({ notification: '', title: '', shownRecords: this.state.shownRecords.slice(0, this.state.currentRowCount) });

      this.props.actions.resetStatus();
    }
    if (nextProps && nextProps.notificationList) {
      this.setState({ allNotificationList: nextProps.notificationList });
    }

    if (nextProps && nextProps.customers) {
      this.setState({
        shownRecords: nextProps.customers,
        storedRecords: nextProps.customers,
      });
      setTimeout(() => {
        this.setState({
          shownRecords: this.state.shownRecords.slice(0, this.state.currentRowCount),
        });
      }, 10);
    }
  }

  onSearchChanged(object, value) {
    this.searchedRecords = [];
    if (value === '') {
      this.setState({ shownRecords: this.state.storedRecords.slice(0, 10), startSearch: false });
      this.searchedRecords = [];
    } else {
      this.state.storedRecords.forEach((item) => {
        if (item.name.toLowerCase().search(value.toLowerCase()) !== -1) {
          this.searchedRecords.push(item);
        }
      });
      this.startingNextCount = 0;
      this.setState({ shownRecords: this.searchedRecords, startSearch: true });
    }
  }

  selectedRow = (selectedNo) => {
    if (selectedNo === 'all') {
      this.selectedAll = true;
      this.selectedCustomer = this.state.storedRecords.slice();
    } else if (selectedNo === 'none') {
      this.selectedAll = false;
      this.selectedCustomer = [];
    } else {
      this.selectedAll = false;
      this.state.shownRecords.forEach((v, i) => {
        for (let j = 0; j < selectedNo.length; j++) {
          if (i === selectedNo[j]) {
            if (this.selectedCustomer.find(o => o.id === v.id)) {
            } else {
              this.selectedCustomer.push(v);
            }
          }
        }
      });
    }

    this.setState({ show: false });
  }

  handleCellClick = (cellClicked) => {
    this.state.shownRecords.forEach((v, i) => {
      if (cellClicked === i) {
        for (let k = 0; k < this.selectedCustomer.length; k++) {
          if (this.selectedCustomer[k].id === v.id) {
            this.selectedCustomer.splice(k, 1);
          }
        }
      }
    });
    this.setState({ show: false });
    setTimeout(() => {
      this.setState({ show: false });
    }, 1);
  }

  handleChange = (event, value) => {
    this.setState({ notification: value });
  }
  handleTitleChange = (event, value) => {
    this.setState({ title: value });
  }

  sendNotification = () => {
    const { notification, title } = this.state;
    if (this.selectedCustomer && this.selectedCustomer.length) {
      this.setState({ errorText: '' });
      if (title !== '') {
        if (title.charAt(0) !== ' ') {
          this.setState({ errorTextTitle: '' });
          if (notification !== '') {
            if (notification.charAt(0) !== ' ') {
              this.setState({ errorText: '' });
              const customerIds = [];
              for (let i = 0; i < this.selectedCustomer.length; i++) {
                customerIds.push(this.selectedCustomer[i].id);
              }
              const notificationDto = {
                customerIds,
                title,
                notification,
                sendToAll: this.selectedAll,
              };
              this.props.actions.sendNotifications(notificationDto);
            } else {
              this.setState({ errorText: 'Additional spaces are not allowed' });
            }
          } else {
            this.setState({ errorText: 'No message entered' });
          }
        } else {
          this.setState({ errorTextTitle: 'Additional spaces are not allowed' });
        }
      } else {
        this.setState({ errorTextTitle: 'Title Required' });
      }
    } else {
      this.setState({ errorText: 'No customer selected' });
    }
  }

  applyFilter = () => {
    const { CountryValue, storedRecords } = this.state;
    // this.checkAppliedFilters();
    // clearInterval(this.interval);
    this.searchedRecords = [];
    storedRecords.forEach((item) => {
      if (item.country === CountryValue ){
        this.searchedRecords.push(item);
      }
    });

    this.startingNextCount = 0;
    this.setState({
      startSearch: false,
      searchedValue: '',
      filterSelected: true,
      storedRecords: this.searchedRecords,
      storedFiltered: this.searchedRecords,
      shownRecords: this.searchedRecords.slice(0, 10),
      filterApplied: true,
      // storedRecords: nextProps.bookings,
    });
  }

  clearFilter = () => {
    const allCustomer = store.getState().CustomerReducer.customers || [];
    this.setState({
      shownRecords: allCustomer.slice(0, this.state.currentRowCount),
      storedRecords: allCustomer,
      CountryValue: 'Select Country'
    });
  }

  onCountryChange = (object, index, value) => {
    this.setState({ CountryValue: value });
  }

  useNotification = (id) => {
    const {
      allNotificationList,
    } = this.state;
    allNotificationList.forEach((data) => {
      if (data.id === id) {
        this.setState({ notification: data.message, title: data.title, showNotificationList: false });
      }
    });
  }

  nextButton() {
    const nextRecords = nextBookings(this.state, this.startingNextCount);
    if (nextRecords) {
      this.startingNextCount = nextRecords;
      this.setState({ shownRecords: this.state.storedRecords.slice(nextRecords, nextRecords + 10) });
    }
  }

  previousButton() {
    const previousRecords = previousBookings(this.state, this.startingNextCount);
    if (!(previousRecords < 0)) {
      this.startingNextCount = previousRecords;
      this.setState({ shownRecords: this.state.storedRecords.slice(previousRecords, previousRecords + 10) });
    }
  }

  render() {
    const { allNotificationList, CountryValue, shownRecords } = this.state;
    const actionsButton = [
      <FlatButton
        label="Cancel"
        primary
        keyboardFocused
        onClick={() => { this.setState({ showNotificationList: false }); }}
      />,

    ];
    const rows = this.state.shownRecords.map(data => (
      <TableRow style={GlobalStyle.tableRowSpacing} key={data.id} selected={this.selectedCustomer.find(o => o.id === data.id)} className="table-row-style">
        {/* <TableRowColumn data-uid={data.id}>{data.dropoffDate}</TableRowColumn>
                    <TableRowColumn data-uid={data.id}>02:20Pm</TableRowColumn> */}
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.id}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.name}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.email}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.country}</TableRowColumn>
      </TableRow>

    ));
    return (
      <div id="vehicleContainer">
        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <Grid fluid className="container-no-padding">
            <Row between="xs">
              <Col xs={6} style={GlobalStyle.containerHeader}>
                <h2 className="paper-title">Customer Notification</h2>
              </Col>
              <Col xs={6}>
                <div style={{ float: 'right' }}>
                  <TextField
                    className="search-text-field"
                    hintText="Customer Name"
                    floatingLabelText="Search"
                    onChange={this.onSearchChanged}
                  />
                  {/* <Link to="/home/admin/new-booking">
                                        <FlatButton label="New Booking" className="add-button-on-header float-right" />
                                    </Link> */}
                </div>

              </Col>
            </Row>
          </Grid>
          <Divider className="paper-divider m-top-bottom-07em bold-hr" />
          <Grid fluid className="container-no-padding">
            <Row>
              <Col md={3} className="filterSelect">
                <SelectField
                  maxHeight={250}
                  style={{ width: '90%', marginTop: '-15px 0 0 10px !important' }}
                  floatingLabelText="Country"
                  value={this.state.CountryValue}
                  onBlur={this.onBlur}
                  onChange={this.onCountryChange}
                >
                  {this.cities.map(v => <MenuItem value={v} primaryText={v} key={v} />)}
                </SelectField>
              </Col>

              <Col md={3} className="filterSelect">
              </Col>
              <Col md={3} />
              <Col md={3}>
                <Link >
                  <FlatButton onClick={this.applyFilter} label="Apply" disabled={CountryValue === 'Select Country'} className="add-button-on-header float-right apply-button" />
                </Link>
                <Link >
                  <FlatButton onClick={this.clearFilter} label="Clear" className="add-button-on-header float-right apply-button" />
                </Link>
              </Col>
            </Row>


          </Grid>
          <Divider className="paper-divider m-top-bottom-07em bold-hr" />
          <Grid fluid>
            <Row>
              <Col md={6} >
                <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
                  <Table fixedHeader={false} style={{ tableLayout: 'auto' }} bodyStyle={{ overflow: 'visible' }} selectable onCellClick={this.handleCellClick} multiSelectable={shownRecords.length > 0 ? true : false} onRowSelection={this.selectedRow}>
                    <TableHeader style={GlobalStyle.tableHeaderSpacing} displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
                      <TableRow style={GlobalStyle.tableHeaderSpacing} className="table-header-style">
                        <TableHeaderColumn style={GlobalStyle.tableRowCell}>Id</TableHeaderColumn>
                        <TableHeaderColumn style={GlobalStyle.tableRowCell}>Name</TableHeaderColumn>
                        <TableHeaderColumn style={GlobalStyle.tableRowCell}>Email</TableHeaderColumn>
                        <TableHeaderColumn style={GlobalStyle.tableRowCell}>Country</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={this.state.showCheckboxes} deselectOnClickaway={false}>
                      {rows}
                    </TableBody>
                  </Table>
                  <div className="flex-container-pagination-notification Pagination">
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
                  </div>
                </Paper>
              </Col>
              <Col md={6}>
                <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
                  <TextField
                    floatingLabelText="Title"
                    // hintText='Enter Message Here'
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                    style={styles.customWidth}
                    errorText={this.state.errorTextTitle}
                  />
                  <TextField
                    floatingLabelText="Enter Message"
                    // hintText='Enter Message Here'
                    value={this.state.notification}
                    onChange={this.handleChange}
                    style={styles.customWidth}
                    multiLine
                    rows={8}
                    rowsMax={8}
                    errorText={this.state.errorText}
                  />
                  <FlatButton label="Notification List" onClick={() => this.setState({ showNotificationList: true })} className="add-button-on-header float-right-notification" style={{ left: '10px' }} />
                  <FlatButton label="Send" onClick={this.sendNotification} className="add-button-on-header float-right-notification" />
                  <br />
                </Paper>
              </Col>
            </Row>
          </Grid>

          <div style={{ clear: 'both' }} />
          <br />
        </Paper>

        <Dialog
          title="All Notification List"
          actions={actionsButton}
          modal={false}
          open={this.state.showNotificationList}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          {allNotificationList.map(data => (
            <Card style={{ margin: '20px' }}>
              <CardHeader
                title={data.title}
                subtitle={Converters.notificationDateParse(data.createdDatetime)}
                actAsExpander
                showExpandableButton
              />
              <CardActions>
                <FlatButton className="notification-card-button" onClick={() => { this.useNotification(data.id); }} label="Use" />
              </CardActions>
              <CardText expandable>
                {data.message}
              </CardText>
            </Card>
          ))}
        </Dialog>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    customers: state.CustomerReducer.customers,
    notificationSent: state.CustomerReducer.notificationSent,
    notificationList: state.CustomerReducer.notificationList,
    notificationListSuccess: state.CustomerReducer.notificationListSuccess,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerNotificationContainer);
