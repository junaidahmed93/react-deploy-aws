import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import { bindActionCreators } from 'redux';
import LeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import * as ReportActions from '../../actions/ReportActions';
import * as BookingActions from '../../actions/bookingActions';
import CollectionPending from '../../components/reports/CollectionPending';
import DropoffPending from '../../components/reports/DropoffPending';
import PickupPending from '../../components/reports/PickupPending';
import AssignmentPending from '../../components/reports/AssignmentPending';
import DisabledInputSelect from '../../components/shared/forms/DisabledInputSelect';
import JobRiskTable from '../../components/reports/JobRiskTable';
import GlobalStyle from '../../utils/Styles';
import { nextBookings, previousBookings, startRecord, endRecord, totalRecords } from '../../utils/Pagination';


class JobAtRiskContainer extends Component {
  constructor() {
    super();
    this.state = {
      jobRiskReport: {},
      shownRecords: [],
      storedRecords: [],
      value: '',
      riskTypeValue: '',
      pendingType: '',
      errorText: '',
      showRiskJob: false,
      showRiskType: false,
      showJobRiskFirst: false,
      prefil: 'All',
      serviceArea: ['Dubai', 'Bahrain'],
      staffTypeCategory: ['Opsporter', 'Driporter'],
      reportCategories: ['Job at Risk'],
      riskTypeCategory: ['All', 'Not Assigned', 'Pick Up pending', 'Drop off pending', 'Collection pending'],
    };
    this.startingNextCount = 0;
    this.jobRiskReport = {};
    this.allJobRisk = [];
  }
  componentDidMount() {
    this.props.ReportActions.jobatRisk();
    this.startingNextCount = 0;
    this.setState({
      showRiskType: true,
    });
  }

  onCategoryChange = (id, value) => {
    if (value === 'Job at Risk') {
      this.props.ReportActions.jobatRisk();
      this.startingNextCount = 0;
      this.setState({
        pendingType: '',
        showRiskJob: false,
      });
    }
  }

  onRiskTypeChange = (id, value) => {
    if (value === 'All') {
      this.setState({
        pendingType: 'All',
        prefil: 'All',
        showRiskJob: false,
        showJobRiskFirst: true,
        storedRecords: this.allJobRisk,
        shownRecords: this.allJobRisk.slice(0, 10),
      });
    }

    if (value === 'Not Assigned') {
      this.setState({
        pendingType: 'Not Assigned',
        prefil: 'Not Assigned',
        storedRecords: this.jobRiskReport.bookingNotAssignYet,
        shownRecords: this.jobRiskReport.bookingNotAssignYet.slice(0, 10),
        showRiskJob: true,
        showJobRiskFirst: false,
      });
    }
    if (value === 'Pick Up pending') {
      this.setState({
        pendingType: 'Pick Up pending',
        prefil: 'Pick Up pending',
        storedRecords: this.jobRiskReport.pendingPickUp,
        shownRecords: this.jobRiskReport.pendingPickUp.slice(0, 10),
        showRiskJob: true,
        showJobRiskFirst: false,
      });
    }
    if (value === 'Drop off pending') {
      this.setState({
        pendingType: 'Drop off pending',
        prefil: 'Drop off pending',
        storedRecords: this.jobRiskReport.pendingDropoff,
        shownRecords: this.jobRiskReport.pendingDropoff.slice(0, 10),
        showRiskJob: true,
        showJobRiskFirst: false,
      });
    }
    if (value === 'Collection pending') {
      this.setState({
        pendingType: 'Collection pending',
        prefil: 'Collection pending',
        storedRecords: this.jobRiskReport.pendingCollection,
        shownRecords: this.jobRiskReport.pendingCollection.slice(0, 10),
        showRiskJob: true,
        showJobRiskFirst: false,
      });
    }
  }


  getJobAtRisk = () => {
    this.props.ReportActions.jobatRisk();
  }


  componentWillMount() {
    clearInterval(this.interval);
  }

  componentWillReceiveProps(nextProps) {
    const { showRiskType } = this.state;

    // Job at risk report
    if (nextProps && nextProps.riskJobreports && showRiskType) {
      const jobRiskReport = nextProps.riskJobreports;
      this.jobRiskReport = nextProps.riskJobreports;
      // this.setState({ jobRiskReport: nextProps.riskJobreports })
      this.allJobRisk = [];
      jobRiskReport.pendingPickUp.forEach((data) => {
        const a = Object.assign({}, data, { pendingReason: 'Pick Up pending' });
        this.allJobRisk.push(a);
      });
      jobRiskReport.pendingDropoff.forEach((data) => {
        const a = Object.assign({}, data, { pendingReason: 'Drop off pending' });
        this.allJobRisk.push(a);
      });
      jobRiskReport.pendingCollection.forEach((data) => {
        const a = Object.assign({}, data, { pendingReason: 'Collection pending' });
        this.allJobRisk.push(a);
      });

      jobRiskReport.bookingNotAssignYet.forEach((data) => {
        const a = Object.assign({}, data, { pendingReason: 'Not Assigned Yet' });
        this.allJobRisk.push(a);
      });

      this.setState({
        showJobRiskFirst: true,
        prefil: 'All',
        storedRecords: this.allJobRisk,
        shownRecords: this.allJobRisk.slice(0, 10),

      });
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

  getReportSubCategory = () => {
    const {
      riskTypeCategory, showRiskType,
    } = this.state;
    if (showRiskType) {
      return [
        <Col md={9}>
          <Row>
            <Col md={3}>
              <DisabledInputSelect
                id="riskType"
                prefilled={this.state.prefil}
                values={riskTypeCategory}
                setValue={this.onRiskTypeChange}
                label="Risk Type"
              />
            </Col>
            <Col md={3} />
            <Col md={3}>
              {/* <InputSelect
                id="serviceAreaCity"
                values={serviceArea}
                setValue={this.onCityChange}
                label="City"
              /> */}
            </Col>
            <Col md={3}>
              {/* <FlatButton label="Report" onClick={this.getJobAtRisk} disabled={riskButtonDisbale} className="report-button float-right" /> */}
            </Col>
          </Row>
        </Col>,
      ];
    }
  }

  render() {
    const {
      showJobRiskFirst, pendingType, shownRecords, reportCategories, showRiskJob,
    } = this.state;

    const pagination = (<div className="flex-container-pagination Pagination">
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
                <h2 className="paper-title">Job at risk</h2>
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
              <Col md={3}>
                <DisabledInputSelect
                  id="categories"
                  prefilled="Job at Risk"
                  values={reportCategories}
                  setValue={this.onCategoryChange}
                  label="Categories"
                  extraPadding="10px"
                />
              </Col>
              {this.getReportSubCategory()}
              <Divider className="paper-divider m-top-bottom-07em bold-hr" />
            </Row>
          </Grid>
          {/* <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}> */}
          {showJobRiskFirst ?
            <div>
              <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
                <JobRiskTable bookings={shownRecords} />
              </Paper>
              {pagination}
            </div>
            : null}
          {showRiskJob ?
            <div>
              <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
                {/* {showJobRiskFirst ? <JobRiskTable bookings={shownRecords} /> : null} */}
                {pendingType === 'Pick Up pending' ? <PickupPending bookings={shownRecords} pendingType={pendingType} /> : null}
                {pendingType === 'Drop off pending' ? <DropoffPending bookings={shownRecords} pendingType={pendingType} /> : null}
                {pendingType === 'Collection pending' ? <CollectionPending bookings={shownRecords} pendingType={pendingType} /> : null}
                {pendingType === 'Not Assigned' ? <AssignmentPending bookings={shownRecords} pendingType={pendingType} /> : null}

              </Paper>
              {pagination}
            </div>
            : null}


          <br />
          <br />
          <br />
        </Paper>

      </div >
    );
  }
}


function mapStateToProps(state) {
  return {
    riskJobreports: state.ReportReducer.riskJobreports,
  }
}

function mapDispatchToProps(dispatch) {
  dispatch(ReportActions.getDailySalesSuccessAfter());
  return {
    ReportActions: bindActionCreators(ReportActions, dispatch),
    BookingActions: bindActionCreators(BookingActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobAtRiskContainer);
