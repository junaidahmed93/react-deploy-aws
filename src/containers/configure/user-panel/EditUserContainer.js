import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserEditForm from '../../../components/userpanel/UserEditForm';
import * as actions from '../../../actions/addUserActions';
import { store } from '../../../store';
import GlobalStyle from '../../../utils/Styles';
import { formsValidation } from '../../../utils/Helpers';

class EditUserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = {};
    this.onEdit = this.onEdit.bind(this);
    this.state = {
      errorText: '',
      errorClass: '',
      showErrorTemplate: false,
      editMode: true,
      adminUser: {},
    };
    this.updatedUser = {};
  }


  componentDidMount() {
    let editableBooking;
    const userList = store.getState().getUserReducer.userList;
    const paramId = Number(this.props.routeParams.id);
    userList.forEach((element) => {
      if (element.id === paramId) {
        editableBooking = element;
      }
    });
    this.setState({ adminUser: editableBooking });
  }

  onEdit() {
    this.setState({ editMode: false });
  }

  setValue = (key, value) => {
    this.updateData[key] = value;
  };

  submit = () => {
    this.updatedUser = Object.assign({}, this.state.adminUser, this.updateData);
    const fieldResult = formsValidation(this.updatedUser, 'EditAdmin');
    if (fieldResult.warning === false) {
      this.props.actions.editAdminUser(this.updatedUser);
    } else {
      this.setState({
        showErrorTemplate: true,
        errorText: fieldResult.template,
        errorClass: 'alert alert-danger',
      });
    }
  }


  render() {
    const {
      errorText, errorClass, showErrorTemplate, adminUser, editMode, buttonDisable,
    } = this.state;
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
          <UserEditForm adminUserList={adminUser} setValue={this.setValue} editMode={editMode} />
        </Paper>
        <Grid fluid style={GlobalStyle.containerHeader}>
          <Row>
            <Col xsOffset={9} md={3}>
              {editMode ?
                <FlatButton label="Edit" onClick={this.onEdit} className="add-button float-right" />
                : <FlatButton label="Update" onClick={this.submit} disabled={buttonDisable} className="add-button float-right" />
              }
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
          open={showErrorTemplate}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <div className={errorClass} dangerouslySetInnerHTML={{ __html: errorText }} />
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    EditParnterUser: state.EditHotelPartnerReducer.EditParnterUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserContainer);
