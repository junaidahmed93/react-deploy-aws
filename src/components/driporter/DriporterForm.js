import React from 'react';
import Divider from 'material-ui/Divider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { ProfileIcon, DocumentIcon } from '../CustomIcons';
import DriporterFile from './DriporterFile';
import GlobalStyle from '../../utils/Styles';
import InputBox from '../shared/forms/InputBox';
import InputSelect from '../shared/forms/InputSelect';
import InputDate from '../shared/forms/InputDate';
import { getCountries, getAirports, getServicesAreas } from '../../utils/Helpers';

export default class DriporterForm extends React.Component {
  constructor(props) {
    super(props);
    const countryList = getCountries();
    this.selectAirportId = getAirports();
    this.selectNationality = countryList[1];
    this.selectServiceArea = getServicesAreas();
    this.selectMaritalStatus = ['Single', 'Married'];
  }

  render() {
    return (
      <div>
        <form className="form-validation">
          <h2 style={GlobalStyle.formHeadings} >Create new Dri Porter</h2>
          <Divider className="paper-divider" />
          <Grid fluid>
            <Row >
              <Col md={4} >
                <Row className="form-row-spacing" >
                  <InputBox
                    id="name"
                    setValue={this.props.setValue}
                    label="Full Name"
                    type="text"
                    extraPadding="10px"
                  />
                </Row>
                <Row className="form-row-spacing">
                  <InputBox
                    id="email"
                    setValue={this.props.setValue}
                    label="Email Address"
                    type="email"
                    extraPadding="10px"
                  />
                </Row>
                {/* <Row className="form-row-spacing">
                                    <InputBox
                                        id="maritalStatus"
                                        setValue={this.props.setValue}
                                        label="Marital Status"
                                        type="text"
                                        buttonRestriction={this.props.buttonRestriction}
                                        extraPadding={'10px'}
                                    />

                                </Row> */}
                <Row className="form-row-spacing">
                  <InputBox
                    id="city"
                    setValue={this.props.setValue}
                    label="City"
                    type="text"
                    extraPadding="10px"
                  />
                </Row>
                <Row className="form-row-spacing">
                  <InputBox
                    id="homeAddress"
                    setValue={this.props.setValue}
                    label="Home Town Address"
                    type="text"
                    extraPadding="10px"
                  />
                </Row>
                <Row className="form-row-spacing">
                  <InputSelect
                    id="serviceAreaId"
                    values={this.selectServiceArea}
                    setValue={this.props.setValue}
                    label="Service Area"
                    extraPadding="10px"
                  />

                </Row>
              </Col>
              <Col md={4}>
                <Row className="form-row-spacing">
                  <InputBox
                    id="phoneNumber"
                    hintText="+971234578900"
                    setValue={this.props.setValue}
                    label="Contact Number"
                    type="text"
                  />
                </Row>
                <Row className="form-row-spacing">
                  <InputSelect
                    id="maritalStatus"
                    values={this.selectMaritalStatus}
                    setValue={this.props.setValue}
                    label="Marital Status"
                  />
                </Row>
                <Row className="form-row-spacing">
                  <InputSelect
                    // extraPadding={'10px'}
                    id="nationality"
                    values={this.selectNationality}
                    setValue={this.props.setValue}
                    label="Nationality"
                  />
                </Row>
                <Row className="form-row-spacing">
                  <InputDate
                    id="dateOfBirth"
                    setValue={this.props.setValue}
                    label="Date of Birth"
                    type="date"
                    fixedFloat
                  />
                </Row>

              </Col>
              <Col md={4}>
                <DriporterFile
                  id="profilePicture"
                  setValue={this.props.setValue}
                  customStyle="vertical"
                >
                  <ProfileIcon />
                  <strong>Profile Picture</strong>
                  {/* <span>(Front View)</span> */}
                </DriporterFile>
              </Col>
            </Row>
          </Grid>
          <br />
          <h2 style={{ ...GlobalStyle.formHeadings }}>Document Details</h2>
          <Divider className="paper-divider" />
          <Grid fluid>
            <Row className="form-row-spacing">
              <Col md={4}>
                <InputBox
                  id="emiratesId"
                  hintText="784-1984-1234567-1"
                  setValue={this.props.setValue}
                  label="National Identity No"
                  type="text"
                />

              </Col>
              <Col md={4}>
                <InputBox
                  id="passportNumber"
                  setValue={this.props.setValue}
                  label="Passport / GCC Number"
                  type="number"
                />
              </Col>
              <Col md={4}>
                <InputDate
                  id="passportValidity"
                  setValue={this.props.setValue}
                  label="Passport Validity"
                  type="date"
                  fixedFloat
                />
              </Col>
            </Row>
            <Row className="form-row-spacing">
              <Col md={4}>
                <InputBox
                  id="visaNumber"
                  setValue={this.props.setValue}
                  label="Visa Number"
                  type="number"
                />
              </Col>
              <Col md={4}>
                <InputDate
                  id="visaValidity"
                  setValue={this.props.setValue}
                  label="Visa Validty"
                  type="date"
                  fixedFloat
                />
              </Col>
              {/* <Col md={4}>
                                <InputBox
                                    id="emiratesId"
                                    setValue={this.props.setValue}
                                    label="National Identity No"
                                    type="text"
                                />
                            </Col> */}
            </Row>
          </Grid>
          <h2 style={{ ...GlobalStyle.formHeadings, ...GlobalStyle.formHeadingExtraSpacing }}>Emergency Contact</h2>
          <Divider className="paper-divider" />
          <Grid fluid>
            <Row className="form-row-spacing">
              <Col md={4}>
                <InputBox
                  id="emergencyName"
                  setValue={this.props.setValue}
                  label="Emergency Contact Name"
                  type="text"
                />
              </Col>
              <Col md={4}>
                <InputBox
                  id="emergencyNumber"
                  hintText="+971234578900"
                  setValue={this.props.setValue}
                  label="Emergency Contact Number"
                  type="text"
                />
              </Col>
              <Col md={4}>
                <InputBox
                  id="emergencyRelation"
                  setValue={this.props.setValue}
                  label="Relation"
                  type="text"
                />
              </Col>
            </Row>
          </Grid>
          <h2 style={{ ...GlobalStyle.formHeadings, ...GlobalStyle.formHeadingExtraSpacing }}>Upload Attachments</h2>
          <Divider className="paper-divider" />
          <Grid fluid className="m-top-bottom-1em">
            <Row >
              <Col md={4}>
                <DriporterFile
                  id="passportImage"
                  setValue={this.props.setValue}
                  customStyle="horizontal"
                >
                  <DocumentIcon />
                  <strong>Passport</strong>
                </DriporterFile>
              </Col>
              <Col md={4}>
                <DriporterFile
                  id="visaImage"
                  setValue={this.props.setValue}
                  customStyle="horizontal"
                >
                  <DocumentIcon />
                  <strong>Visa</strong>
                </DriporterFile>
              </Col>
              {/* <Col md={3}>
                                <OpsporterFile id="drivingLicense"
                                    setValue={this.props.setValue}
                                    customStyle="horizontal">
                                    <DocumentIcon />
                                    <strong>Driving License</strong>
                                </OpsporterFile>
                            </Col> */}
              <Col md={4}>
                <DriporterFile
                  id="workPermit"
                  setValue={this.props.setValue}
                  customStyle="horizontal"
                >
                  <DocumentIcon />
                  <strong>Driving License</strong>
                </DriporterFile>
              </Col>
            </Row>
          </Grid>
        </form>
      </div >
    );
  }
}
