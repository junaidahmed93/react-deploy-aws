import React from 'react';
import { Link, browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HotelPartnerForm from '../../../components/hotelpartner/hotelPartnerForm';
import * as actions from '../../../actions/AddHotelPartnerActions';
import GlobalStyle from '../../../utils/Styles';
import { formsValidation } from '../../../utils/Helpers';

class AddHotelPartnerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.hotelAdminData = {};
    this.state = {
      errorText: '',
      errorClass: '',
      showErrorTemplate: false,
      buttonDisabled: true,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.savedUser) {
      browserHistory.push('/home/admin/hotel-partner');
    }
  }

  setValue = (key, value) => {
    this.hotelAdminData[key] = value;
  };

  submit = () => {
    const fieldResult = formsValidation(this.hotelAdminData, 'AddHotel');
    if (fieldResult.warning === false) {
      this.props.actions.addHotelPartner(this.hotelAdminData);
    } else {
      this.setState({
        showErrorTemplate: true,
        errorText: fieldResult.template,
        errorClass: 'alert alert-danger',
      });
    }
  }

  render() {
    const { errorText, errorClass } = this.state;
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
          <HotelPartnerForm setValue={this.setValue} />
          <Divider className="paper-divider m-top-bottom-07em bold-hr" />
        </Paper>
        <Grid fluid style={GlobalStyle.containerHeader}>
          <Row>
            <Col xsOffset={9} md={3}>
              <FlatButton label="Add" onClick={this.submit} className="add-button float-right" />
              <Link to="/home/admin/hotel-partner">
                <FlatButton label="Back" className="add-button float-right" />
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
          <div className={errorClass} dangerouslySetInnerHTML={{ __html: errorText }} />
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    savedUser: state.AddHotelPartnerReducer.savedUser,
  };
}

function mapDispatchToProps(dispatch) {
  dispatch(actions.AddhotelPartnerSuccessAfter());
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddHotelPartnerContainer);
