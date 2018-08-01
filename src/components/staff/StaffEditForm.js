import React from 'react';
import Divider from 'material-ui/Divider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import StaffEditFile from './StaffEditFile';
import { ProfileIcon } from '../CustomIcons';
import GlobalStyle from '../../utils/Styles';
import { getCountries, getAirports } from '../../utils/Helpers';
import Converters from '../../utils/Converters';
import InputEditBox from '../shared/forms/InputEditBox';
import InputEditSelect from '../shared/forms/InputEditSelect';

export default class StaffEditForm extends React.Component {
  constructor(props) {
    super(props);
    const countryList = getCountries();
    this.selectAirportId = getAirports();
    this.selectNationality = countryList[1];
    this.selectMaritalStatus = ['Single', 'Married'];
    this.state = {
      booking: {},
    };
  }

  render() {
    return (
      <div>
        <form className="form-validation">
          <h2 style={GlobalStyle.formHeadings} >Edit Staff</h2>
          <Divider className="paper-divider" />
          <Grid fluid>
            <Row >
              <Col md={4} >
                <Row className="form-row-spacing" >
                  <InputEditBox
                    id="name"
                    setValue={this.props.setValue}
                    label="Full Name"
                    type="text"
                    buttonRestriction={this.props.buttonRestriction}
                    prefilled={this.props.opsporter.name}
                    extraPadding="10px"
                  />
                </Row>
                <Row className="form-row-spacing">
                  <InputEditBox
                    id="email"
                    setValue={this.props.setValue}
                    label="Email Address"
                    type="email"
                    buttonRestriction={this.props.buttonRestriction}
                    prefilled={this.props.opsporter.email}
                    extraPadding="10px"
                  />
                </Row>
                {/* <Row className="form-row-spacing">
                                    <InputEditBox
                                        id="maritalStatus"
                                        setValue={this.props.setValue}
                                        label="Marital Status"
                                        type="text"
                                        buttonRestriction={this.props.buttonRestriction}
                                        extraPadding={'10px'}
                                    />

                                </Row> */}
                <Row className="form-row-spacing">
                  <InputEditBox
                    id="city"
                    setValue={this.props.setValue}
                    label="City"
                    type="text"
                    buttonRestriction={this.props.buttonRestriction}
                    prefilled={this.props.opsporter.city}
                    extraPadding="10px"
                  />
                </Row>
                <Row className="form-row-spacing">
                  <InputEditBox
                    id="homeAddrress"
                    setValue={this.props.setValue}
                    label="Home Address"
                    type="text"
                    buttonRestriction={this.props.buttonRestriction}
                    prefilled={this.props.opsporter.homeAddrress}
                    extraPadding="10px"
                  />
                </Row>

              </Col>
              <Col md={4}>
                <Row className="form-row-spacing">
                  <InputEditBox
                    id="phoneNumber"
                    hintText="+971234578900"
                    setValue={this.props.setValue}
                    label="Contact Number"
                    type="text"
                    buttonRestriction={this.props.buttonRestriction}
                    prefilled={this.props.opsporter.phoneNumber}
                  />
                </Row>
                <Row className="form-row-spacing">
                  <InputEditBox
                    id="emiratesId"
                    setValue={this.props.setValue}
                    label="National Identity No"
                    type="text"
                    buttonRestriction={this.props.buttonRestriction}
                    prefilled={this.props.opsporter.emiratesId}
                  />
                </Row>
                <Row className="form-row-spacing">
                  <InputEditSelect
                    id="nationality"
                    values={this.selectNationality}
                    setValue={this.props.setValue}
                    label="Nationality"
                    buttonRestriction={this.props.buttonRestriction}
                    prefilled={this.props.opsporter.nationality}
                  />
                </Row>
                <Row className="form-row-spacing">
                  <InputEditBox
                    id="dateOfBirth"
                    setValue={this.props.setValue}
                    label="Date of birth"
                    type="date"
                    buttonRestriction={this.props.buttonRestriction}
                    prefilled={Converters.dateConverter(this.props.opsporter.dateOfBirth)}
                  />
                </Row>
              </Col>
              <Col md={4}>
                <StaffEditFile
                  id="profilePicture"
                  setValue={this.props.setValue}
                  customStyle="vertical"
                  prefilled={this.props.opsporter.displayImage}
                  baseURL={this.props.opsporter.displayImage}
                >
                  <ProfileIcon />
                  <strong>Profile Picture</strong>
                  {/* <span>(Front View)</span> */}
                </StaffEditFile>
              </Col>
            </Row>
          </Grid>
          <br />
          <h2 style={{ ...GlobalStyle.formHeadings, ...GlobalStyle.formHeadingExtraSpacing }}>Emergency Contact</h2>
          <Divider className="paper-divider" />
          <Grid fluid>
            <Row className="form-row-spacing">
              <Col md={4}>
                <InputEditBox
                  id="emergencyName"
                  setValue={this.props.setValue}
                  label="Emergency Contact Name"
                  type="text"
                  buttonRestriction={this.props.buttonRestriction}
                  prefilled={this.props.opsporter.emergencyName}
                />
              </Col>
              <Col md={4}>
                <InputEditBox
                  id="emergencyNumber"
                  hintText="+971234578900"
                  setValue={this.props.setValue}
                  label="Emergency Contact Number"
                  type="text"
                  buttonRestriction={this.props.buttonRestriction}
                  prefilled={this.props.opsporter.emergencyNumber}
                />
              </Col>
              <Col md={4}>
                <InputEditBox
                  id="emergencyRelation"
                  setValue={this.props.setValue}
                  label="Relation"
                  type="text"
                  buttonRestriction={this.props.buttonRestriction}
                  prefilled={this.props.opsporter.emergencyRelation}
                />
              </Col>
            </Row>
          </Grid>

        </form>
      </div >
    );
  }
}
