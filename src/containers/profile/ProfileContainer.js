import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import * as actions from '../../actions/ProfileActions';
import ProfileEditForm from '../../components/profile/ProfileEditForm';
import { store } from '../../store';
import GlobalStyle from '../../utils/Styles';


class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.profileData = {};

    this.state = {
      errorText: '',
      errorClass: '',
      showErrorTemplate: false,
      profile: {
        imagesDtoList: {
        },
      },
    };
    this.fieldValidations = [];
  }

  componentDidMount() {
    const id = store.getState().loginReducer.user.userId;
    this.props.actions.getProfileDetails(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.profileData) {
      this.setState({ profile: nextProps.profileData });
    }
  }

  setValue = (key, value) => {
    this.profileData[key] = value;
  };

  submit = () => {
    if (!this.profileData.profilePictureBaseUrl) {
      this.profileData.profilePictureBaseUrl = this.state.profile.profileImgae;
    }
    const updatedprofile = Object.assign({}, this.state.profile, this.profileData);

    this.props.actions.updateProfile(updatedprofile);

    // let fieldResult = formsValidation(updatedprofile, 'EditOpsporter')
    // if (fieldResult.warning === false) {
    //     this.props.actions.updateOpsporter(updatedprofile);
    // }
    // else {
    //     this.setState({
    //         showErrorTemplate: true,
    //         errorText: fieldResult.template,
    //         errorClass: 'alert alert-danger'
    //     })
    // }
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
          <ProfileEditForm
            profile={this.state.profile}
            setValue={this.setValue}
            buttonHide={this.buttonHide}
          />
        </Paper>
        <Grid fluid style={GlobalStyle.containerHeader}>
          <Row>
            <Col xsOffset={9} md={3}>
              <FlatButton label="Update" onClick={this.submit} disabled={this.state.buttonDisable} className="add-button float-right" />
              <Link to="/home/admin/dashboard">
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
          <div
            className={this.state.errorClass}
            dangerouslySetInnerHTML={{ __html: this.state.errorText }}
          />
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profileData: state.ProfileReducer.profileData,
  };
}

function mapDispatchToProps(dispatch) {
  dispatch(actions.getProfileSuccessAfter());
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
