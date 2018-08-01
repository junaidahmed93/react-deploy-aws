import React from 'react';
import Divider from 'material-ui/Divider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import DriporterEditFile from './DriporterEditFile';
import { ProfileIcon, DocumentIcon } from '../CustomIcons';
import GlobalStyle from '../../utils/Styles';
import { getCountries, getAirports, getServicesAreas, getServiceAreaFromId } from '../../utils/Helpers';
import Converters from '../../utils/Converters';
import InputEditBox from '../shared/forms/InputEditBox';
import InputEditSelect from '../shared/forms/InputEditSelect';

export default class DriporterEditForm extends React.Component {
  constructor(props) {
    super(props);
    const countryList = getCountries();
    this.selectAirportId = getAirports();
    this.selectNationality = countryList[1];
    this.selectServiceArea = getServicesAreas();
    this.selectMaritalStatus = ['Single', 'Married'];
    this.state = {
      booking: {},
    };
  }

  render() {
    const { opsporter } = this.props;
    let serviceArea;
    if (opsporter) {
      serviceArea = getServiceAreaFromId(opsporter.serviceAreaId);
    }

    return (
      <div>
        <form className="form-validation">
          <h2 style={GlobalStyle.formHeadings} >Edit Dri Porter</h2>
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
                    disabled={this.props.editMode}
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
                    disabled
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
                    disabled={this.props.editMode}
                  />
                </Row>
                <Row className="form-row-spacing">
                  <InputEditBox
                    id="homeAddress"
                    setValue={this.props.setValue}
                    label="Home Address"
                    type="text"
                    buttonRestriction={this.props.buttonRestriction}
                    prefilled={this.props.opsporter.homeAddrress}
                    extraPadding="10px"
                    disabled={this.props.editMode}
                  />
                </Row>
                <Row className="form-row-spacing">
                  <InputEditSelect
                    id="serviceAreaId"
                    prefilled={serviceArea}
                    values={this.selectServiceArea}
                    setValue={this.props.setValue}
                    label="Service Area"
                    extraPadding="10px"
                    disabled={this.props.editMode}
                  />
                </Row>
              </Col>
              <Col md={4}>
                <Row className="form-row-spacing">
                  <InputEditBox
                    id="phoneNumber"
                    setValue={this.props.setValue}
                    label="Contact Number"
                    type="text"
                    buttonRestriction={this.props.buttonRestriction}
                    prefilled={this.props.opsporter.phoneNumber}
                    disabled={this.props.editMode}
                  />
                </Row>
                <Row className="form-row-spacing">
                  <InputEditSelect
                    id="maritalStatus"
                    values={this.selectMaritalStatus}
                    setValue={this.props.setValue}
                    label="Marital Status"
                    buttonRestriction={this.props.buttonRestriction}
                    prefilled={this.props.opsporter.maritalStatus}
                    disabled={this.props.editMode}
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
                    disabled={this.props.editMode}
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
                    disabled={this.props.editMode}
                  />
                </Row>
              </Col>
              <Col md={4}>
                <DriporterEditFile
                  id="profilePicture"
                  setValue={this.props.setValue}
                  customStyle="vertical"
                  prefilled={this.props.opsporter.displayImage}
                  baseURL={this.props.opsporter.displayImage}
                  disabled={this.props.editMode}
                >
                  <ProfileIcon />
                  <strong>Profile Picture</strong>
                  {/* <span>(Front View)</span> */}
                </DriporterEditFile>
              </Col>
            </Row>
          </Grid>
          <br />
          <h2 style={{ ...GlobalStyle.formHeadings }}>Document Details</h2>
          <Divider className="paper-divider" />
          <Grid fluid>
            <Row className="form-row-spacing">
              <Col md={4}>
                <InputEditBox
                  id="emiratesId"
                  setValue={this.props.setValue}
                  label="National Identity No"
                  type="text"
                  buttonRestriction={this.props.buttonRestriction}
                  prefilled={this.props.opsporter.emiratesId}
                  disabled={this.props.editMode}
                />

              </Col>
              <Col md={4}>
                <InputEditBox
                  id="passportNumber"
                  setValue={this.props.setValue}
                  label="Passport / GCC Number"
                  type="number"
                  buttonRestriction={this.props.buttonRestriction}
                  prefilled={this.props.opsporter.passportNumber}
                  disabled={this.props.editMode}
                />
              </Col>
              <Col md={4}>
                <InputEditBox
                  id="passportValidity"
                  setValue={this.props.setValue}
                  label="Passport Validity"
                  type="date"
                  buttonRestriction={this.props.buttonRestriction}
                  prefilled={Converters.dateConverter(this.props.opsporter.passportValidity)}
                  disabled={this.props.editMode}
                />
              </Col>
            </Row>
            <Row className="form-row-spacing">
              <Col md={4}>
                <InputEditBox
                  id="visaNumber"
                  setValue={this.props.setValue}
                  label="Visa Number"
                  type="text"
                  buttonRestriction={this.props.buttonRestriction}
                  prefilled={this.props.opsporter.visaNumber}
                  disabled={this.props.editMode}
                />
              </Col>
              <Col md={4}>
                <InputEditBox
                  id="visaValidity"
                  setValue={this.props.setValue}
                  label="Visa Validty"
                  type="date"
                  buttonRestriction={this.props.buttonRestriction}
                  prefilled={Converters.dateConverter(this.props.opsporter.visaValidity)}
                  disabled={this.props.editMode}
                />
              </Col>
              {/* <Col md={4}>
                                <InputEditBox
                                    id="emiratesId"
                                    setValue={this.props.setValue}
                                    label="National Identity No"
                                    type="text"
                                    buttonRestriction={this.props.buttonRestriction}
                                    prefilled={this.props.opsporter.emiratesId}
                                />
                            </Col> */}
            </Row>
          </Grid>
          <h2 style={{ ...GlobalStyle.formHeadings, ...GlobalStyle.formHeadingExtraSpacing }}>Emergency Contact</h2>
          <Divider className="paper-divider" />
          <Grid fluid>
            <Row className="form-row-spacing">
              <Col md={4}>
                <InputEditBox
                  id="emergencyContactName"
                  setValue={this.props.setValue}
                  label="Emergency Contact Name"
                  type="text"
                  buttonRestriction={this.props.buttonRestriction}
                  prefilled={this.props.opsporter.emergencyName}
                  disabled={this.props.editMode}
                />
              </Col>
              <Col md={4}>
                <InputEditBox
                  id="emergencyContactNumber"
                  setValue={this.props.setValue}
                  label="Emergency Contact Number"
                  type="number"
                  buttonRestriction={this.props.buttonRestriction}
                  prefilled={this.props.opsporter.emergencyNumber}
                  disabled={this.props.editMode}
                />
              </Col>
              <Col md={4}>
                <InputEditBox
                  id="relation"
                  setValue={this.props.setValue}
                  label="Relation"
                  type="text"
                  buttonRestriction={this.props.buttonRestriction}
                  prefilled={this.props.opsporter.emergencyRelation}
                  disabled={this.props.editMode}
                />
              </Col>
            </Row>
          </Grid>
          <h2 style={{ ...GlobalStyle.formHeadings, ...GlobalStyle.formHeadingExtraSpacing }}>Upload Attachments</h2>
          <Divider className="paper-divider" />
          <Grid fluid className="m-top-bottom-1em">
            <Row >
              <Col md={4}>
                <DriporterEditFile
                  id="passportImage"
                  setValue={this.props.setValue}
                  customStyle="horizontal"
                  prefilled={this.props.opsporter.passport}
                  baseURL={this.props.opsporter.passportImageBaseUrl}
                  disabled={this.props.editMode}
                >
                  <DocumentIcon />
                  <strong>Passport</strong>
                </DriporterEditFile>
              </Col>
              <Col md={4}>
                <DriporterEditFile
                  id="visaImage"
                  setValue={this.props.setValue}
                  customStyle="horizontal"
                  prefilled={this.props.opsporter.visa}
                  baseURL={this.props.opsporter.visaImageBaseUrl}
                  disabled={this.props.editMode}
                >
                  <DocumentIcon />
                  <strong>Visa</strong>
                </DriporterEditFile>
              </Col>
              {/* <Col md={3}>
                                <DriporterEditFile id="drivingLicense"
                                    setValue={this.props.setValue}
                                    customStyle="horizontal"
                                    prefilled={this.props.opsporter.driving_licence}
                                    baseURL={this.props.opsporter.drivingLicenseBaseUrl}
                                >
                                    <DocumentIcon />
                                    <strong>Driving License</strong>
                                </DriporterEditFile>
                            </Col> */}
              <Col md={4}>
                <DriporterEditFile
                  id="workPermit"
                  setValue={this.props.setValue}
                  customStyle="horizontal"
                  prefilled={this.props.opsporter.emirates_id}
                  baseURL={this.props.opsporter.emirates_id}
                  disabled={this.props.editMode}
                >
                  <DocumentIcon />
                  <strong>Driving License</strong>
                </DriporterEditFile>
              </Col>
            </Row>
          </Grid>
        </form>
      </div >
    );
  }
}
