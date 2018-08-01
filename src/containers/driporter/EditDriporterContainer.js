import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Converters from '../../utils/Converters';
import * as actions from '../../actions/DriporterActions';
import * as CommonActions from '../../actions/CommonActions';
import DriporterEditForm from '../../components/driporter/DriporterEditForm';
import { formsValidation } from '../../utils/Helpers';
import GlobalStyle from '../../utils/Styles';

class EditDriporterContainer extends React.Component {
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
      buttonDisabled: true,
      editMode: true,
    };
    this.fieldValidations = [];
  }


  componentDidMount() {
    const { routeParams } = this.props;
    this.props.actions.driporterProfile(routeParams.id);
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
    if (nextProps && nextProps.driProfile) {
      this.setState({ opsporter: nextProps.driProfile });
    }
  }

  onEdit() {
    this.setState({ editMode: false });
  }

  setValue = (key, value) => {
    this.opsporterData[key] = value;
  };

  submit = () => {
    if (this.opsporterData.serviceAreaId) { // This will contain service name
      this.opsporterData.serviceAreaId = Converters.serviceAreaNameToId(this.opsporterData.serviceAreaId);
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


    // let updatedOpsporter = Object.assign({}, this.state.opsporter, this.opsporterData);
    const fieldResult = formsValidation(updatedOpsporter, 'EditDriporter');
    if (fieldResult.warning === false) {
      this.props.actions.updateDriporter(updatedOpsporter);
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
    this.props.CommonActions.staffDeActivation(this.state.opsporter.id, 'driporter');
  }
  activate() {
    this.props.CommonActions.staffActivation(this.state.opsporter.id, 'driporter');
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
        {/* <Paper zDepth={0}>
          <Link to="/">
            Home
          </Link>
          >
          <Link to="/home/admin/driporter">
            Driporter
          </Link>
          > Edit Driporter

        </Paper> */}
        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <DriporterEditForm opsporter={this.state.opsporter} setValue={this.setValue} buttonHide={this.buttonHide} editMode={this.state.editMode} />
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
    driProfile: state.DriporterReducer.driporterProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    CommonActions: bindActionCreators(CommonActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDriporterContainer);
