import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import StaffEditForm from '../../../components/staff/StaffEditForm';
import * as actions from '../../../actions/HotelStaffActions';
import { formsValidation } from '../../../utils/Helpers';
import GlobalStyle from '../../../utils/Styles';


class EditBookingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.opsporterData = {};
    this.keys = {
      fullName: 'Full Name',
      password: 'Password',
      contactNumber: 'Contact Number',
      emailAddress: 'Email Address',
      city: 'City',
      cuurentAddress: 'Current Address',
      nationality: 'Nationality',
      passportCountry: 'Passpord Country',
      passportExpiry: 'Passport Expiry',
      visaDetail: 'Visa Details',
      workPermitId: 'Work Permit ID',
      homeTownAddress: 'Home Town Address',
      emergencyContactName: 'Emergency Contact Person',
      emergencyContactNumber: 'Emergency Contact Number',
      relation: 'Relation',
      profilePicture: 'Profile Picture',
      passportImage: 'Passport',
      visaImage: 'Visa',
      drivingLicense: 'Driving License',
      workPermit: 'Work Permit',
    };
    this.state = {
      error: [],
      errorText: '',
      errorClass: '',
      openSnackBar: false,
      snackBarMsg: '',
      showErrorTemplate: false,
      opsporter: {},
      buttonDisabled: true,
    };
    this.fieldValidations = [];
  }

  componentDidMount() {
    const { routeParams } = this.props;
    this.props.actions.HotelStaffProfile(routeParams.id);
    // let editableBooking;
    // let opsporters = store.getState().opsporterReducer.opsporterList;
    // let paramId = Number(this.props.routeParams.id);
    // opsporters.forEach((element) => {
    //     if (element.id === paramId) {
    //         editableBooking = element;
    //     }
    // })
    // this.setState({ opsporter: editableBooking });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.staffProfile) {
      this.setState({ opsporter: nextProps.staffProfile });
    }
  }

  setValue = (key, value) => {
    this.opsporterData[key] = value;
  };

  submit = () => {
    if (this.opsporterData.profilePictureBaseUrl) {
      this.opsporterData.displayImage = this.opsporterData.profilePictureBaseUrl;
    }
    const updatedOpsporter = Object.assign({}, this.state.opsporter, this.opsporterData);
    const fieldResult = formsValidation(updatedOpsporter, 'EditHotelStaff');
    if (fieldResult.warning === false) {
      this.props.actions.updateHotelStaff(updatedOpsporter);
    } else {
      this.setState({
        showErrorTemplate: true,
        errorText: fieldResult.template,
        errorClass: 'alert alert-danger',
      });
    }
  }

  handleRequestClose = () => {
  }

  render() {
    const actionsButton = [
      <FlatButton
        label="Ok---"
        primary
        keyboardFocused
        onClick={() => { this.setState({ showErrorTemplate: false }); }}
      />,
    ];
    return (
      <div id="vehicleContainer">
        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <StaffEditForm opsporter={this.state.opsporter} setValue={this.setValue} buttonHide={this.buttonHide} />
        </Paper>
        <Grid fluid style={GlobalStyle.containerHeader}>
          <Row>
            <Col xsOffset={9} md={3}>
              <FlatButton label="Update" onClick={this.submit} disabled={this.state.buttonDisable} className="add-button float-right" />
              <Link to="/home/hotel/staff">
                <FlatButton label="Cancel" className="add-button float-right" />
              </Link>
            </Col>
          </Row>
        </Grid>
        <Snackbar
          open={this.state.openSnackBar}
          message={this.state.snackBarMsg}
          // action="undo"
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />

        <Dialog
          title="Required"
          actions={actionsButton}
          modal={false}
          open={this.state.showErrorTemplate}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <div className={this.state.errorClass} dangerouslySetInnerHTML={{ __html: this.state.errorText }} />
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    staffProfile: state.HotelStaffReducer.staffProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBookingContainer);
