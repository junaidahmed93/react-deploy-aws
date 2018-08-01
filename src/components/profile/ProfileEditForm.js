import React from 'react';
import Divider from 'material-ui/Divider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { ProfileIcon } from '../CustomIcons';
import GlobalStyle from '../../utils/Styles';
import OpsporterEditFile from '../opsporter/OpsporterEditFile';
import Converters from '../../utils/Converters';
import InputEditBox from '../shared/forms/InputEditBox';
import { getCountries } from '../../utils/Helpers';
import imageUrl from '../../assets/images/profile.png';

export default class ProfileEditForm extends React.Component {
  constructor(props) {
    super(props);
    const countryList = getCountries();
    this.selectNationality = countryList[1];
  }

  render() {
    const { profile } = this.props;

    return (
      <div>
        <form className="form-validation">
          <h2 style={GlobalStyle.formHeadings} >My Profile</h2>
          <Divider className="paper-divider" />
          <Grid fluid>
            <Row >
              <Col md={4}>
                <OpsporterEditFile
                  id="profilePicture"
                  setValue={this.props.setValue}
                  customStyle="vertical"
                  prefilled={profile.profileImgae ? profile.profileImgae : imageUrl}
                // baseURL={this.props.opsporter.displayImage}
                >
                  <ProfileIcon />
                  <strong>Profile Picture</strong>
                  {/* <span>(Front View)</span> */}
                </OpsporterEditFile>
              </Col>
              <Col md={4} >
                <Row className="form-row-spacing" >
                  <InputEditBox
                    id="name"
                    setValue={this.props.setValue}
                    label="Full Name"
                    type="text"
                    prefilled={profile.name}
                    extraPadding="10px"
                  />
                </Row>
                <Row className="form-row-spacing">
                  <InputEditBox
                    id="email"
                    setValue={this.props.setValue}
                    label="Email Address"
                    type="email"
                    prefilled={profile.email}
                    extraPadding="10px"
                  />
                </Row>
                <Row className="form-row-spacing">
                  <InputEditBox
                    id="city"
                    setValue={this.props.setValue}
                    label="City"
                    type="text"
                    prefilled={profile.city}
                    extraPadding="10px"
                  />
                </Row>
                <Row className="form-row-spacing">
                  <InputEditBox
                    id="phoneNumber"
                    hintText="+971234578900"
                    setValue={this.props.setValue}
                    label="Phone Number"
                    type="text"
                    prefilled={profile.phoneNumber}
                    extraPadding="10px"
                  />
                </Row>
              </Col>
              <Col md={4}>
                <Row className="form-row-spacing">
                  <InputEditBox
                    id="emiratesId"
                    setValue={this.props.setValue}
                    label="National Identity No"
                    type="text"
                    prefilled={profile.emiratesId}
                  />
                </Row>
                <Row className="form-row-spacing">
                  <InputEditBox
                    id="emergencyNumber"
                    hintText="+971234578900"
                    setValue={this.props.setValue}
                    label="Marital Status"
                    type="text"
                    prefilled={profile.emergencyNumber}
                  />
                </Row>
                <Row className="form-row-spacing">
                  <InputEditBox
                    id="dateOfBirth"
                    setValue={this.props.setValue}
                    label="Date of birth"
                    type="date"
                    prefilled={Converters.dateConverter(profile.dateOfBirth)}
                  />

                </Row>
                <Row className="form-row-spacing">
                  {/* <InputEditSelect
                                        id="nationality"
                                        values={this.selectNationality}
                                        setValue={this.props.setValue}
                                        label="Nationality"
                                        prefilled={profile.nationality}
                                    /> */}
                </Row>
              </Col>

            </Row>
          </Grid>
        </form>
      </div >
    );
  }
}
