import React from 'react';
import Divider from 'material-ui/Divider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import GlobalStyle from '../../utils/Styles';
import Converters from '../../utils/Converters';
import InputEditBox from '../shared/forms/InputEditBox';

export default class HotelPartnerEditForm extends React.Component {
  // constructor(props) {
  //     super(props);
  // }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { partnerList } = this.props;
    return (
      <form className="form-validation">
        <h2 style={GlobalStyle.formHeadings} >Edit hotel details</h2>
        <Divider className="paper-divider" />
        <Grid fluid>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputEditBox
                id="hotelName"
                setValue={this.props.setValue}
                label="Hotel Name"
                prefilled={partnerList.hotelName}
                type="text"
                disabled={this.props.editMode}
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="bookingLimit"
                setValue={this.props.setValue}
                label="Booking Limit"
                prefilled={partnerList.bookingLimit}
                type="number"
                disabled={this.props.editMode}
              />

            </Col>
            <Col md={4}>
              <InputEditBox
                id="address"
                setValue={this.props.setValue}
                label="Address"
                prefilled={partnerList.address}
                type="text"
                disabled={this.props.editMode}
              />
            </Col>
          </Row>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputEditBox
                id="latitude"
                setValue={this.props.setValue}
                label="Latitude"
                prefilled={partnerList.latitude}
                type="number"
                disabled={this.props.editMode}
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="longitude"
                setValue={this.props.setValue}
                label="Longitude"
                prefilled={partnerList.longitude}
                type="number"
                disabled={this.props.editMode}
              />
            </Col>
            <Col md={4} />
          </Row>
        </Grid>
        <br />
        <h2 style={GlobalStyle.formHeadings} >User Details</h2>
        <Divider className="paper-divider" />
        <Grid fluid>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputEditBox
                id="emiratesId"
                setValue={this.props.setValue}
                label="National Identity No"
                prefilled={partnerList.emiratesId}
                type="number"
                disabled={this.props.editMode}
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="name"
                setValue={this.props.setValue}
                label="Full Name"
                prefilled={partnerList.name}
                type="text"
                disabled={this.props.editMode}
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="dateOfBirth"
                setValue={this.props.setValue}
                label="Date of Birth"
                prefilled={Converters.dateConverter(partnerList.dateOfBirth)}
                type="date"
                disabled={this.props.editMode}
              />

            </Col>
          </Row>

          <Row className="form-row-spacing">
            <Col md={12}>
              <InputEditBox
                id="homeAddress"
                setValue={this.props.setValue}
                label="Address"
                prefilled={partnerList.homeAddress}
                type="text"
                disabled={this.props.editMode}
              />
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <InputEditBox
                id="city"
                setValue={this.props.setValue}
                label="City"
                prefilled={partnerList.city}
                type="text"
                disabled={this.props.editMode}
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="country"
                setValue={this.props.setValue}
                label="Country"
                prefilled={partnerList.country}
                type="text"
                disabled={this.props.editMode}
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="nationlaity"
                setValue={this.props.setValue}
                label="Nationality"
                prefilled={partnerList.nationality}
                type="text"
                disabled={this.props.editMode}
              />
            </Col>
          </Row>

          <Row className="form-row-spacing">
            <Col md={4}>
              <InputEditBox
                id="email"
                setValue={this.props.setValue}
                label="Email Address"
                prefilled={partnerList.email}
                type="email"
                disabled
              />
            </Col>
            {/* <Col md={4}>
                            <InputEditBox
                                id="password"
                                setValue={this.props.setValue}
                                label="Password"
                                prefilled={partnerList.name}
                                type="password" />
                        </Col> */}
            <Col md={4}>
              <InputEditBox
                id="phoneNumber"
                setValue={this.props.setValue}
                label="Contact Number"
                prefilled={partnerList.phoneNumber}
                type="text"
                disabled={this.props.editMode}
              />
            </Col>

          </Row>

        </Grid>
        <h2 style={{ ...GlobalStyle.formHeadings, ...GlobalStyle.formHeadingExtraSpacing }}>Emergency Contact</h2>
        <Divider className="paper-divider" />
        <Grid fluid>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputEditBox
                id="emergencyName"
                setValue={this.props.setValue}
                label="Emergency Contact Name"
                prefilled={partnerList.emergencyName}
                type="text"
                disabled={this.props.editMode}
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="relation"
                setValue={this.props.setValue}
                label="Relation"
                prefilled={partnerList.emergencyRelation}
                type="text"
                disabled={this.props.editMode}
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="emergencyNumber"
                setValue={this.props.setValue}
                label="Emergency Contact Number"
                prefilled={partnerList.emergencyNumber}
                type="number"
                disabled={this.props.editMode}
              />
            </Col>
          </Row>
        </Grid>
      </form >
    );
  }
}
