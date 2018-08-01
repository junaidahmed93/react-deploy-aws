import React from 'react';
import { MapsDirectionsCar } from 'material-ui/svg-icons/index';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';
import VehicleFile from './vehicleFile';
import InputFutureDate from '../shared/forms/InputFutureDate';
import GlobalStyle from '../../utils/Styles';
import InputBox from '../shared/forms/InputBox';
import InputSelect from '../shared/forms/InputSelect';

export default class VehicleForm extends React.Component {
  constructor(props) {
    super(props);
    this.selectValues = ['Petrol', 'Diesel'];
    this.selectType = ['New', 'Used'];
    this.numberValues = [1, 2, 3, 4, 5, 6];
    this.selectLoad = [1, 2, 3, 4, 5, 6];
  }
  render() {
    return (
      <div>
        <form className="form-validation">
          <h2 style={GlobalStyle.formHeadings}>Vehicle Details</h2>
          <Divider className="paper-divider" />
          <Grid fluid>
            <Row >
              <Col md={4}>
                {/* <Row className="form-row-spacing">
                  <InputBox
                    id="vehicleName"
                    setValue={this.props.setValue}
                    label="Vehicle Number"
                    type="text"
                    extraPadding="10px"
                  />
                </Row> */}
                <Row className="form-row-spacing" >
                  <InputBox
                    id="registrationNumber"
                    hintText="XY 95864-14"
                    setValue={this.props.setValue}
                    label="Registration Number"
                    type="text"
                    extraPadding="10px"
                  />
                </Row>
                <Row className="form-row-spacing" >
                  <InputBox
                    id="numberPlate"
                    hintText="DX 809 E209D"
                    setValue={this.props.setValue}
                    label="Plate Number"
                    type="text"
                    extraPadding="10px"
                  />
                </Row>
                <Row className="form-row-spacing" >
                  <InputBox
                    id="model"
                    hintText="2018"
                    setValue={this.props.setValue}
                    label="Model"
                    type="number"
                    extraPadding="10px"
                  />
                </Row>
                <Row className="form-row-spacing" >
                  <InputBox
                    id="chassisNumber"
                    hintText="2H2XA59BWDY"
                    values={this.numberValues}
                    setValue={this.props.setValue}
                    label="Chassis Number"
                    extraPadding="10px"
                  />
                </Row>
                <Row className="form-row-spacing" >
                  <InputSelect
                    id="engineType"
                    values={this.selectValues}
                    setValue={this.props.setValue}
                    label="Engine Type"
                    extraPadding="10px"
                  />
                </Row>
              </Col>
              <Col md={4}>
                <Row className="form-row-spacing" >
                  <InputSelect
                    id="type"
                    values={this.selectType}
                    setValue={this.props.setValue}
                    label="Type"
                  />
                </Row>
                <Row className="form-row-spacing" >
                  <InputSelect
                    id="loadCapacity"
                    values={this.selectLoad}
                    setValue={this.props.setValue}
                    label="Number of Bags"
                    type="number"
                  />
                </Row>

                <Row className="form-row-spacing" >
                  <InputBox
                    id="colour"
                    hintText="Silver, Sky, Red"
                    setValue={this.props.setValue}
                    label="Color"
                  />
                </Row>
                <Row className="form-row-spacing" >
                  <InputBox
                    id="engineNumber"
                    setValue={this.props.setValue}
                    label="Engine Number"
                  />
                </Row>
              </Col>
              <Col md={4}>
                <VehicleFile
                  id="carImageUrl"
                  setValue={this.props.setValue}
                  customStyle="vertical"
                >
                  <MapsDirectionsCar />
                  <strong>Vehicle Image</strong>
                  <span>(Front View)</span>
                </VehicleFile>
              </Col>
            </Row>
          </Grid>
          <h2 style={{ ...GlobalStyle.formHeadings, ...GlobalStyle.formHeadingExtraSpacing }}>Document Details</h2>
          <Divider className="paper-divider" />
          <Grid fluid>
            <Row className="form-row-spacing">
              <Col md={4}>
                <InputBox
                  id="insuranceNumber"
                  setValue={this.props.setValue}
                  label="Insurance Number"
                  type="text"
                />
              </Col>
              <Col md={4}>
                <InputFutureDate
                  id="insuranceExpiry"
                  setValue={this.props.setValue}
                  label="Insurance Expiry"
                  type="date"
                  fixedFloat
                />
              </Col>
            </Row>
            {/* <Row className="form-row-spacing">
              <Col md={4}>
                <InputBox
                  id="insuranceNo"
                  setValue={this.props.setValue}
                  label="Insurance No"
                  type="text"
                />
              </Col>
              <Col md={4}>
                <InputBox
                  id="insuranceExpiry"
                  setValue={this.props.setValue}
                  label="Insurance Expiry"
                  type="text"
                />
              </Col>
              <Col md={4}>
                <InputBox
                  id="distanceTravel"
                  setValue={this.props.setValue}
                  label="Distance Travel (KMs)"
                  type="text"
                />
              </Col>
            </Row> */}
          </Grid>
          <h2 className="paper-title heading-spacing">Upload Attachments</h2>
          <Divider className="paper-divider" />
          <Grid fluid className="m-top-bottom-1em">
            <Row>
              <Col md={3}>
                <VehicleFile
                  id="leftSideImageUrl"
                  setValue={this.props.setValue}
                  customStyle="horizontal"
                >
                  <MapsDirectionsCar />
                  <strong>Left Side Image</strong>
                </VehicleFile>
              </Col>
              <Col md={3}>
                <VehicleFile
                  id="rightSideImageUrl"
                  setValue={this.props.setValue}
                  customStyle="horizontal"
                >
                  <MapsDirectionsCar />
                  <strong>Right Side Image</strong>
                </VehicleFile>
              </Col>
              <Col md={3}>
                <VehicleFile
                  id="engineSideImageUrl"
                  setValue={this.props.setValue}
                  customStyle="horizontal"
                >
                  <MapsDirectionsCar />
                  <strong>Engine Image</strong>
                </VehicleFile>
              </Col>
              <Col md={3}>
                <VehicleFile
                  id="backSideImageUrl"
                  setValue={this.props.setValue}
                  customStyle="horizontal"
                >
                  <MapsDirectionsCar />
                  <strong>Back Image</strong>
                </VehicleFile>
              </Col>
            </Row>
          </Grid>
        </form>
      </div>
    );
  }
}
