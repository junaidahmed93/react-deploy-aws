import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/EditHotelPartnerActions';
import HotelPartnerEditForm from '../../../components/hotelpartner/HotelPartnerEditForm';
import { store } from '../../../store';
import GlobalStyle from '../../../utils/Styles';
import { formsValidation } from '../../../utils/Helpers';

class EditHotelPartnerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onEdit = this.onEdit.bind(this);
    this.updateData = {};
    this.state = {
      errorText: '',
      errorClass: '',
      showErrorTemplate: false,
      editMode: true,
      buttonDisabled: true,
      hotelPartnerUser: {
        userDto: {
        },
        hotelDto: {
        },
      },
    };
    this.fieldError = [];
    this.emptyFields = [];
    this.updatedPartnerUser = {};
  }


  componentDidMount() {
    let editableBooking;
    const partnersList = store.getState().GetHotelPartnerReducer.partnerList;
    const paramId = Number(this.props.routeParams.id);
    partnersList.forEach((element) => {
      if (element.dataId === paramId) {
        editableBooking = element;
      }
    });
    this.setState({ hotelPartnerUser: editableBooking });
  }

  onEdit() {
    this.setState({ editMode: false });
  }
  onClickDialoge() {
    this.setState({ showErrorTemplate: false, hotelPartnerUser: this.updatedPartnerUser });
  }

  setValue = (key, value) => {
    this.updateData[key] = value;
  };

  submit = () => {
    this.updatedPartnerUser = Object.assign({}, this.state.hotelPartnerUser, this.updateData);
    const fieldResult = formsValidation(this.updatedPartnerUser, 'EditHotel');
    if (fieldResult.warning === false) {
      this.props.actions.editHotelPartner(this.updatedPartnerUser);
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
      errorText, errorClass, showErrorTemplate, hotelPartnerUser, editMode, buttonDisable,
    } = this.state;
    const actionsButton = [
      <FlatButton
        label="Ok"
        primary
        keyboardFocused
        onClick={() => { this.onClickDialoge(); }}
      />,
    ];
    return (
      <div id="vehicleContainer">
        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <HotelPartnerEditForm partnerList={hotelPartnerUser} setValue={this.setValue} editMode={editMode} />
        </Paper>
        <Grid fluid style={GlobalStyle.containerHeader}>
          <Row>
            <Col xsOffset={9} md={3}>
              {editMode ?
                <FlatButton label="Edit" onClick={this.onEdit} className="add-button float-right" />
                : <FlatButton label="Update" onClick={this.submit} disabled={buttonDisable} className="add-button float-right" />
              }
              <Link to="/home/admin/hotel-partner">
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

export default connect(mapStateToProps, mapDispatchToProps)(EditHotelPartnerContainer);
