import React from 'react';
import Divider from 'material-ui/Divider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import GlobalStyle from '../../utils/Styles';
import Converters from '../../utils/Converters';
import InputEditBox from '../shared/forms/InputEditBox';
import InputEditSelect from '../shared/forms/InputEditSelect';
import { getCountries } from '../../utils/Helpers';

export default class UserEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.selectRoleType = ['admin'];
    const countryList = getCountries();
    this.selectCountry = countryList[0];
    this.selectNationality = countryList[1];
  }
  render() {
    const { adminUserList, editMode } = this.props;
    return (
      <form className="form-validation">
        <h2 style={GlobalStyle.formHeadings}>Edit admin user</h2>
        <Divider className="paper-divider" />
        <Grid fluid>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputEditBox
                id="emiratesId"
                setValue={this.props.setValue}
                label="National Identity No"
                type="text"
                prefilled={adminUserList.emiratesId}
                disabled={editMode}
              />
            </Col>
            <Col md={4}>
              <InputEditSelect
                id="userRole"
                setValue={this.props.setValue}
                label="User Role"
                type="text"
                values={this.selectRoleType}
                prefilled={adminUserList && adminUserList.roles ? adminUserList.roles[0].roleType : ''}
                disabled={editMode}
              />

            </Col>
            <Col md={4}>
              <InputEditBox
                id="phoneNumber"
                hintText="+971234578900"
                setValue={this.props.setValue}
                label="Contact Number"
                type="text"
                prefilled={adminUserList.phoneNumber}
                disabled={editMode}
              />
            </Col>

          </Row>

          <Row className="form-row-spacing">
            <Col md={4}>
              <InputEditBox
                id="name"
                setValue={this.props.setValue}
                label="Full Name"
                type="text"
                prefilled={adminUserList.name}
                disabled={editMode}
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="email"
                setValue={this.props.setValue}
                label="Email Address"
                type="email"
                prefilled={adminUserList.email}
                disabled
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="dateOfBirth"
                setValue={this.props.setValue}
                label="Date of Birth"
                type="date"
                prefilled={Converters.dateConverter(adminUserList.dateOfBirth)}
                disabled={editMode}
              />
            </Col>
          </Row>
          {/* <Row className="form-row-spacing">
                        <Col md={12}>
                            <InputEditBox
                                id="address"
                                setValue={this.props.setValue}
                                label="Address"
                                type="text"
                                prefilled={adminUserList.address}
                                disabled={editMode}
                            />
                        </Col>
                    </Row> */}

          <Row className="form-row-spacing">
            <Col md={4}>
              <InputEditBox
                id="city"
                setValue={this.props.setValue}
                label="City"
                type="text"
                prefilled={adminUserList.city}
                disabled={editMode}
              />
            </Col>
            <Col md={4}>
              <InputEditSelect
                id="country"
                values={this.selectCountry}
                setValue={this.props.setValue}
                label="Country"
                prefilled={adminUserList.country}
                disabled={editMode}
              />

              {/* <InputEditBox
                                id="country"
                                setValue={this.props.setValue}
                                label="Country"
                                type="text"
                                prefilled={adminUserList.country}
                                disabled={editMode}
                            /> */}
            </Col>
            <Col md={4}>
              <InputEditSelect
                id="nationality"
                values={this.selectNationality}
                setValue={this.props.setValue}
                label="Nationality"
                prefilled={adminUserList.nationality}
                disabled={editMode}
              />

              {/* <InputEditBox
                                id="nationality"
                                setValue={this.props.setValue}
                                label="Nationality"
                                type="text"
                                prefilled={adminUserList.nationality}
                                disabled={editMode}
                            /> */}
            </Col>
          </Row>


        </Grid >
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
                prefilled={adminUserList.emergencyName}
                disabled={editMode}
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="emergencyRelation"
                setValue={this.props.setValue}
                label="Relation"
                type="text"
                prefilled={adminUserList.emergencyRelation}
                disabled={editMode}
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="emergencyNumber"
                hintText="+971234578900"
                setValue={this.props.setValue}
                label="Emergency Contact Number"
                type="text"
                prefilled={adminUserList.emergencyNumber}
                disabled={editMode}
              />
            </Col>
          </Row>
        </Grid>
      </form >
    );
  }
}
