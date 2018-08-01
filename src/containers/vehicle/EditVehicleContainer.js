import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Converters from '../../utils/Converters';
import * as actions from '../../actions/VehicleActions';
import VehicleEditForm from '../../components/vehicle/vehicleEditForm';
import { formsValidation } from '../../utils/Helpers';
import GlobalStyle from '../../utils/Styles';

class EditVehicleContainer extends React.Component {
  constructor(props) {
    super(props);
    this.vehicleProfileData = {};
    this.deactivate = this.deactivate.bind(this);
    this.activate = this.activate.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.state = {
      errorText: '',
      errorClass: '',
      showErrorTemplate: false,
      vehicleProfile: {},
      buttonDisabled: true,
      editMode: true,
    };
    this.fieldValidations = [];
  }


  componentDidMount() {
    const { routeParams } = this.props;
    this.props.actions.vehicleProfile(routeParams.id);
    // let editableBooking;
    // let vehicleProfiles = store.getState().vehicleProfileReducer.vehicleProfileList;
    // let paramId = Number(this.props.routeParams.id);
    // vehicleProfiles.forEach((element) => {
    //     if (element.id === paramId) {
    //         editableBooking = element;
    //     }
    // })
    // this.setState({ vehicleProfile: editableBooking });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.vehicleProfile) {
      this.setState({ vehicleProfile: nextProps.vehicleProfile });
    }
  }

  componentWillUnmount() {
    this.props.actions.clearVehicleProfile();
  }

  onEdit() {
    this.setState({ editMode: false });
  }

  setValue = (key, value) => {
    this.vehicleProfileData[key] = value;
  };

  submit = () => {
    if (this.vehicleProfileData.serviceAreaId) { // This will contain service name
      this.vehicleProfileData.serviceAreaId = Converters.serviceAreaNameToId(this.vehicleProfileData.serviceAreaId);
    }
    const updateVehicle = Object.assign({}, this.state.vehicleProfile, this.vehicleProfileData);
    if (this.vehicleProfileData.backSideImageUrlBaseUrl) {
      updateVehicle.backSideImageUrl = this.vehicleProfileData.backSideImageUrlBaseUrl;
    }
    if (this.vehicleProfileData.carImageUrlBaseUrl) {
      updateVehicle.carImageUrl = this.vehicleProfileData.carImageUrlBaseUrl;
    }
    if (this.vehicleProfileData.engineSideImageUrlBaseUrl) {
      updateVehicle.engineSideImageUrl = this.vehicleProfileData.engineSideImageUrlBaseUrl;
    }
    if (this.vehicleProfileData.leftSideImageUrlBaseUrl) {
      updateVehicle.leftSideImageUrl = this.vehicleProfileData.leftSideImageUrlBaseUrl;
    }
    if (this.vehicleProfileData.rightSideImageUrlBaseUrl) {
      updateVehicle.rightSideImageUrl = this.vehicleProfileData.rightSideImageUrlBaseUrl;
    }

    // let updateVehicle = Object.assign({}, this.state.vehicleProfile, this.vehicleProfileData);
    const fieldResult = formsValidation(updateVehicle, 'EditVehicle');
    if (fieldResult.warning === false) {
      this.props.actions.updateVehicle(updateVehicle);
    } else {
      this.setState({
        showErrorTemplate: true,
        errorText: fieldResult.template,
        errorClass: 'alert alert-danger',
        vehicleProfile: updateVehicle,
      });
    }
  }

  deactivate() {
    this.props.CommonActions.staffDeActivation(this.state.vehicleProfile.id, 'driporter');
  }
  activate() {
    this.props.CommonActions.staffActivation(this.state.vehicleProfile.id, 'driporter');
  }


  render() {
    const actionsButton = [
      <FlatButton
        label="Ok"
        primary
        keyboardFocused
        onClick={() => { this.setState({ showErrorTemplate: false }); }}
      />,
    ];
    return (
      <div id="vehicleContainer">
        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <VehicleEditForm vehicleProfile={this.state.vehicleProfile} setValue={this.setValue} buttonHide={this.buttonHide} editMode={this.state.editMode} />
        </Paper>
        <Grid fluid style={GlobalStyle.containerHeader}>
          <Row>
            <Col xsOffset={9} md={3}>
              <div>
                {this.state.editMode ?
                  <FlatButton label="Edit" onClick={this.onEdit} className="add-button float-right" />
                  : <FlatButton label="Update" onClick={this.submit} disabled={this.state.buttonDisable} className="add-button float-right" />
                }
              </div>
              <Link to="/home/admin/driporter">
                <FlatButton label="Cancel" className="add-button float-right" />
              </Link>
            </Col>
          </Row>
        </Grid>

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
    vehicleProfile: state.VehicleReducer.vehicleProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditVehicleContainer);
