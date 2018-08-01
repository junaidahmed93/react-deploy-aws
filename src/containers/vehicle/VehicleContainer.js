import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import LeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/VehicleActions';
import * as driporterActions from '../../actions/DriporterActions';
import { store } from '../../store';
import VehicleTable from '../../components/vehicle/vehicleTable';
import GlobalStyle from '../../utils/Styles';
import { nextBookings, previousBookings, startRecord, endRecord, totalRecords } from '../../utils/Pagination';

class VehicleContainer extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onAssignDriporter = this.onAssignDriporter.bind(this);
    this.confirmAssignDriporter = this.confirmAssignDriporter.bind(this);
    this.onClickDialoge = this.onClickDialoge.bind(this);
    this.onChangeAssignField = this.onChangeAssignField.bind(this);
    this.onSearchChanged = this.onSearchChanged.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.previousButton = this.previousButton.bind(this);
    this.state = {
      driporterList: [],
      shownRecords: [],
      storedRecords: [],
      currentRowCount: 10,
      startSearch: false,
      selectedDriporter: '',
      showDialoge: false,
      driporterSelectionError: '',
      driporterSelected: false,
      showDriporterSelectionBox: false,
    };
    this.searchedRecords = [];
    this.startingNextCount = 0;
    this.vehicleToBeAssigned = 0;
    this.vehicleAssigningToDriporter = 0;
  }
  componentDidMount() {
    this.props.actions.getVehicle();
    this.props.driporterActions.getDriporter();
    window.scrollTo(0, 0);
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      shownRecords: nextProps.vehicleList,
      storedRecords: nextProps.vehicleList,
    });
    setTimeout(() => {
      this.setState({
        shownRecords: this.state.shownRecords.slice(0, this.state.currentRowCount),
      });
    }, 10);
    this.tempBooking = nextProps.vehicleList;

    if (nextProps && nextProps.assigned) {
      this.props.actions.assignVehicleFail();
      this.props.actions.getVehicle();
    }
  }

  onClickDialoge() {
    this.setState({ showDriporterSelectionBox: false });
  }


  onAssignDriporter(rowNumber) {
    this.state.shownRecords.map((v, i) => {
      if (i === rowNumber) {
        this.vehicleToBeAssigned = v.id;
      }
      return '';
    });
    const driporterList = store.getState().DriporterReducer.driporterList;
    this.setState({ showDriporterSelectionBox: true, driporterList });
  }

  handleClick() {
    // this.setState({ showDialoge: true });
  }

  confirmAssignDriporter() {
    if (this.state.driporterSelected) {
      const vehAssignDri = {
        vehicleId: this.vehicleToBeAssigned,
        porterId: this.vehicleAssigningToDriporter,
      };
      this.props.actions.assignVehicle(vehAssignDri);
      this.setState({
        showDriporterSelectionBox: false, driporterSelected: false, driporterSelectionError: '', selectedDriporter: '',
      });
    } else {
      this.setState({ driporterSelectionError: 'Please select driporter' });
    }
  }

  onChangeAssignField(object, index, value) {
    this.vehicleAssigningToDriporter = value;
    this.setState({ selectedDriporter: value, driporterSelected: true });
  }

  onSearchChanged(object, value) {
    this.searchedRecords = [];
    if (value === '') {
      this.setState({ shownRecords: this.state.storedRecords.slice(0, 10), startSearch: false });
      this.searchedRecords = [];
    } else {
      this.state.storedRecords.forEach((item) => {
        if (item.numberPlate.toLowerCase().search(value.toLowerCase()) !== -1) {
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
    const driporterSelectionButton = [
      <FlatButton
        label="Cancel"
        primary
        onClick={() => { this.setState({ showDriporterSelectionBox: false, driporterSelectionError: '' }); }}
      />,
      <FlatButton
        label="Assign"
        primary
        onClick={this.confirmAssignDriporter}
      />,
    ];
    return (
      <div id="vehicleContainer">
        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <Grid fluid className="container-no-padding">
            <Row between="xs">
              <Col xs={6} style={GlobalStyle.containerHeader}>
                <h2 className="paper-title">Vehicle</h2>
              </Col>
              <Col xs={6}>
                <div style={{ float: 'right' }}>
                  <TextField
                    className="search-text-field"
                    hintText="Plate Number"
                    floatingLabelText="Search"
                    onChange={this.onSearchChanged}
                  />
                  <Link to="/home/admin/vehicle/add">
                    <FlatButton label="Add Vehicle" className="add-button-on-header float-right" />
                  </Link>
                </div>
              </Col>
            </Row>
          </Grid>
          <Divider className="paper-divider m-top-bottom-07em bold-hr" />
          <VehicleTable
            rows={this.state.shownRecords}
            assignDriporter={this.onAssignDriporter}
          />
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
        <Dialog
          title="Select a driporter"
          actions={driporterSelectionButton}
          modal={false}
          open={this.state.showDriporterSelectionBox}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          {/* <h3>Available in coming sprint</h3> */}
          <SelectField
            maxHeight={250}
            errorText={this.state.driporterSelectionError}
            floatingLabelText="Select Driporter"
            value={this.state.selectedDriporter}
            onChange={this.onChangeAssignField}
          >
            {this.state.driporterList.map(v => <MenuItem value={v.id} primaryText={v.name} key={v.id} />)}

          </SelectField>
        </Dialog>
      </div>

    );
  }
}


function mapStateToProps(state) {
  return {
    vehicleList: state.VehicleReducer.vehicleList,
    assigned: state.VehicleReducer.assigned,
  };
}

function mapDispatchToProps(dispatch) {
  dispatch(actions.assignVehicleFail());
  return {
    actions: bindActionCreators(actions, dispatch),
    driporterActions: bindActionCreators(driporterActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleContainer);
