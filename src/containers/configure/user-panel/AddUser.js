import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import { Link, browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import UserForm from '../../../components/userpanel/userForm';
import * as actions from '../../../actions/addUserActions';
import GlobalStyle from '../../../utils/Styles';
import { formsValidation } from '../../../utils/Helpers';

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.adminUserData = {};
    this.keys = {
      emiratesId: 'Emirates Id',
      userRole: 'User Role',
      fullName: 'Full Name',
      // 'lastName': 'Last Name',
      // 'password': 'Password',
      address: 'Address',
      city: 'City',
      country: 'Country',
      nationlaity: 'Nationality',
      dateOfBirth: 'Date of Birth',
      contactNumber: 'Contact Number',
      emailAddress: 'Email Address',
      emergencyName: 'Emergency Contact Name',
      relation: 'Relation',
      emergencyNumber: 'Emergency Contact Number',
    };
    this.state = {
      error: [],
      errorText: '',
      errorClass: '',
      showErrorTemplate: false,
    };
  }

  componentWillReceiveProps() {
    browserHistory.push('/home/admin/user-panel');
  }

  setValue = (key, value) => {
    this.adminUserData[key] = value;
  };

  submit = () => {
    const fieldResult = formsValidation(this.adminUserData, 'AddAdmin');
    if (fieldResult.warning === false) {
      this.props.actions.userAdd(this.adminUserData);
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
          <UserForm setValue={this.setValue} />
        </Paper>
        <Grid fluid style={GlobalStyle.containerHeader}>
          <Row>
            <Col xsOffset={9} md={3}>
              <FlatButton label="Add" onClick={this.submit} className="add-button float-right" />
              <Link to="/home/admin/user-panel">
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
    savedUser: state.addUserReducer.savedUser,
  };
}

function mapDispatchToProps(dispatch) {
  dispatch(actions.addUserSuccessAfter());
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
