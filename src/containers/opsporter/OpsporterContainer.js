import React, { Component } from 'react';
import LeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import OpsporterTable from '../../components/opsporter/opsporterTable';
import * as actions from '../../actions/opsporterActions';
import GlobalStyle from '../../utils/Styles';
import { nextBookings, previousBookings, startRecord, endRecord, totalRecords } from '../../utils/Pagination';

class OpsporterContainer extends Component {
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
    };
    this.searchedRecords = [];
    this.startingNextCount = 0;
  }


  componentDidMount() {
    this.props.actions.getOpsporter();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      shownRecords: nextProps.opsporterList,
      storedRecords: nextProps.opsporterList,
    });
    setTimeout(() => {
      this.setState({
        shownRecords: this.state.shownRecords.slice(0, this.state.currentRowCount),
      });
    }, 10);
    this.tempBooking = nextProps.opsporterList;
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
    return (
      <div id="vehicleContainer">
        {/* <Paper style={styles.paperStyle} zDepth={1}>
                    <BookingCharts />
                </Paper> */}
        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <Grid fluid className="container-no-padding">
            <Row between="xs">
              <Col xs={6} style={GlobalStyle.containerHeader}>
                <h2 className="paper-title ">Opsporter Overview</h2>
              </Col>
              <Col xs={6}>
                <div style={{ float: 'right' }}>
                  <TextField
                    className="search-text-field"
                    hintText="Opsporter Name"
                    floatingLabelText="Search"
                    onChange={this.onSearchChanged}
                  />
                  <Link to="/home/admin/opsporter/add">
                    <FlatButton label="New Opsporter" className="add-button-on-header float-right" />
                  </Link>
                </div>

              </Col>
            </Row>
          </Grid>
          <Divider className="paper-divider m-top-bottom-07em bold-hr" />
          <OpsporterTable rows={this.state.shownRecords} />
          <Divider className="paper-divider m-top-bottom-07em bottom-hr" />
          <div className="flex-container-pagination Pagination">
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
          <div style={{ clear: 'both' }} />
        </Paper>

      </div>

    );
  }
}


function mapStateToProps(state) {
  return {
    opsporterList: state.opsporterReducer.opsporterList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OpsporterContainer);
