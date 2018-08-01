import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/opsporterActions';
import * as CommonActions from '../../actions/CommonActions';
import OpsporterEditForm from '../../components/opsporter/opsporterEditForm';
import { formsValidation } from '../../utils/Helpers';
import GlobalStyle from '../../utils/Styles';
import Converters from '../../utils/Converters';

class EditOpsporterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.opsporterData = {};
    this.deactivate = this.deactivate.bind(this);
    this.activate = this.activate.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.state = {
      errorText: '',
      errorClass: '',
      showErrorTemplate: false,
      opsporter: {},
      editMode: true,
    };
    this.fieldValidations = [];
  }

  componentDidMount() {
    const { routeParams } = this.props;
    this.props.actions.opsporterProfile(routeParams.id);
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
    if (nextProps && nextProps.opsProfile) {
      this.setState({ opsporter: nextProps.opsProfile });
    }
  }
  onEdit() {
    this.setState({ editMode: false });
  }

  setValue = (key, value) => {
    this.opsporterData[key] = value;
  };

  submit = () => {
    if (this.opsporterData.airPortId) { // This will contain airport name
      this.opsporterData.airPortId = Converters.airPortNameToRegionId(this.opsporterData.airPortId);
    }
    const updatedOpsporter = Object.assign({}, this.state.opsporter, this.opsporterData);
    if (this.opsporterData.passportImageBaseUrl) {
      updatedOpsporter.passport = this.opsporterData.passportImageBaseUrl;
    }
    if (this.opsporterData.profilePictureBaseUrl) {
      updatedOpsporter.displayImage = this.opsporterData.profilePictureBaseUrl;
    }
    if (this.opsporterData.visaImageBaseUrl) {
      updatedOpsporter.visa = this.opsporterData.visaImageBaseUrl;
    }
    if (this.opsporterData.workPermitBaseUrl) {
      updatedOpsporter.emirates_id = this.opsporterData.workPermitBaseUrl;
    }
    const fieldResult = formsValidation(updatedOpsporter, 'EditOpsporter');
    if (fieldResult.warning === false) {
      this.props.actions.updateOpsporter(updatedOpsporter);
    } else {
      this.setState({
        showErrorTemplate: true,
        errorText: fieldResult.template,
        errorClass: 'alert alert-danger',
        opsporter: updatedOpsporter,
      });
    }
  }


  deactivate() {
    this.props.CommonActions.staffDeActivation(this.state.opsporter.id, 'opsporter');
  }
  activate() {
    this.props.CommonActions.staffActivation(this.state.opsporter.id, 'opsporter');
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
          <OpsporterEditForm opsporter={this.state.opsporter} setValue={this.setValue} buttonHide={this.buttonHide} editMode={this.state.editMode} />
        </Paper>
        <Grid fluid style={GlobalStyle.containerHeader}>
          <Row>
            <Col xsOffset={8} md={4}>
              <div>
                {this.state.opsporter.active ?
                  <FlatButton label="Deactivate" onClick={this.deactivate} className="deactive-staff-button float-right" /> :
                  <FlatButton label="Activate" onClick={this.activate} className="active-staff-button float-right" />}

                {this.state.editMode ?
                  <FlatButton label="Edit" onClick={this.onEdit} className="add-button float-right" />
                  : <FlatButton label="Update" onClick={this.submit} disabled={this.state.buttonDisable} className="add-button float-right" />
                }

                <Link to="/home/admin/opsporter">
                  <FlatButton label="Cancel" className="add-button float-right" />
                </Link>
              </div>
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
    opsProfile: state.opsporterReducer.opsporterProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    CommonActions: bindActionCreators(CommonActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditOpsporterContainer);
