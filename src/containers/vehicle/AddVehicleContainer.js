import React from 'react';
import { Link, browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import VehicleForm from '../../components/vehicle/vehicleForm';
import * as actions from '../../actions/VehicleActions';
import { formsValidation } from '../../utils/Helpers';
import GlobalStyle from '../../utils/Styles';

class AddVehicleContainer extends React.Component {
  constructor(props) {
    super(props);
    this.vehicleData = {};
    this.state = {
      errorText: '',
      errorClass: '',
      showErrorTemplate: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.addOpsporterSucees) {
      browserHistory.push('/home/admin/vehicle');
    }
  }

  setValue = (key, value) => {
    this.vehicleData[key] = value;
  };

  submit = () => {
    const fieldResult = formsValidation(this.vehicleData, 'AddVehicle');
    if (fieldResult.warning === false) {
      this.props.actions.addVehicle(this.vehicleData);
    } else {
      this.setState({
        showErrorTemplate: true,
        errorText: fieldResult.template,
      });
    }
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
          <VehicleForm setValue={this.setValue} />
        </Paper>
        <Grid fluid style={GlobalStyle.containerHeader}>
          <Row>
            <Col xsOffset={9} md={3}>
              <FlatButton label="Add" onClick={this.submit} className="add-button float-right" />
              <Link to="/home/admin/vehicle">
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
    vehicleSaved: state.AddVehicleReducer.vehicleSaved,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVehicleContainer);
