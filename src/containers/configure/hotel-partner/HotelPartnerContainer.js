import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import LeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import HotelPartnerTable from '../../../components/hotelpartner/hotelPartnerTable';
import * as actions from '../../../actions/GetHotelPartnerActions';
import GlobalStyle from '../../../utils/Styles';
import { nextBookings, previousBookings, startRecord, endRecord, totalRecords } from '../../../utils/Pagination';

class AddHotelPartnerContainer extends Component {
  constructor(props) {
    super(props);
    this.previousButton = this.previousButton.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.onSearchChanged = this.onSearchChanged.bind(this);
    this.state = {
      showCheckboxes: false,
      currentRowCount: 10,
      shownRecords: [],
      startSearch: false,
    };
    this.searchedRecords = [];
    this.startingNextCount = 0;
  }

  componentDidMount() {
    this.props.actions.getHotelPartnerUsers();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      shownRecords: nextProps.partnerList,
      storedRecords: nextProps.partnerList,
    });
    setTimeout(() => {
      this.setState({
        shownRecords: this.state.shownRecords.slice(0, this.state.currentRowCount),
      });
    }, 10);
  }

  onSearchChanged(object, value) {
    this.searchedRecords = [];
    if (value === '') {
      this.setState({ shownRecords: this.state.storedRecords.slice(0, 10), startSearch: false });
      this.searchedRecords = [];
    } else {
      this.state.storedRecords.forEach((item) => {
        if (item.hotelName.toLowerCase().search(value.toLowerCase()) !== -1) {
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
    const { shownRecords } = this.state;
    return (
      <div id="vehicleContainer" >
        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <Grid fluid className="container-no-padding">
            <Row between="xs">
              <Col xs={6} style={GlobalStyle.containerHeader}>
                <h2 className="paper-title">Hotels Overview</h2>
              </Col>
              <Col xs={6}>
                <div style={{ float: 'right' }}>
                  <TextField
                    className="search-text-field"
                    hintText="Hotel Name"
                    floatingLabelText="Search"
                    onChange={this.onSearchChanged}
                  />
                  <Link to="/home/admin/hotel-partner/add">
                    <FlatButton label="Add Hotel" className="add-button-on-header float-right" />
                  </Link>
                </div>
              </Col>
            </Row>
          </Grid>
          <Divider className="paper-divider m-top-bottom-07em bold-hr" />
          <HotelPartnerTable rows={shownRecords} />
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
    partnerList: state.GetHotelPartnerReducer.partnerList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddHotelPartnerContainer);
