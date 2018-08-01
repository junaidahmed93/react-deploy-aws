import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StaffForm from '../../../components/staff/StaffForm';
import * as actions from '../../../actions/HotelStaffActions';
import { formsValidation } from '../../../utils/Helpers';
import GlobalStyle from '../../../utils/Styles';

class NewBookingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.newOpsporter = {};
    this.state = {
      errorText: '',
      errorClass: '',
      showErrorTemplate: false,
    };
  }

  setValue = (key, value) => {
    this.newOpsporter[key] = value;
  };

  submit = () => {
    const fieldResult = formsValidation(this.newOpsporter, 'AddHotelStaff');
    if (fieldResult.warning === false) {
      this.props.actions.addHotelStaff(this.newOpsporter);
    } else {
      this.setState({
        showErrorTemplate: true,
        errorText: fieldResult.template,
        errorClass: 'alert alert-danger',
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
          <StaffForm setValue={this.setValue} />
        </Paper>

        <Grid fluid style={GlobalStyle.containerHeader}>
          <Row>
            <Col xsOffset={9} md={3}>
              <FlatButton label="Add" onClick={this.submit} className="add-button float-right" />
              <Link to="/home/hotel/staff">
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
    addOpsporterSucees: state.opsporterReducer.addOpsporterSucees,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBookingContainer);
