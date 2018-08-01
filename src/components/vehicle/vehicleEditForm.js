import React from 'react';
import { MapsDirectionsCar } from 'material-ui/svg-icons/index';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';
import VehicleEditFile from './vehicleEditFile';
import GlobalStyle from '../../utils/Styles';
import Converters from '../../utils/Converters';
import InputEditBox from '../shared/forms/InputEditBox';
import InputEditSelect from '../shared/forms/InputEditSelect';

export default class VehicleEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.selectValues = ['Petrol', 'Diesel'];
    this.selectType = ['New', 'Used'];
    this.numberValues = [1, 2, 3, 4, 5, 6];
    this.selectLoad = [1, 2, 3, 4, 5, 6];
  }
  render() {
    const { vehicleProfile, setValue, editMode } = this.props;
    return (
      <div>
        <form className="form-validation">
          <h2 style={GlobalStyle.formHeadings}>Vehicle Details</h2>
          <Divider className="paper-divider" />
          <Grid fluid>
            <Row >
              <Col md={4}>
                {/* <Row className="form-row-spacing">
                  <InputEditBox
                    id="vehicleName"
                    setValue={this.props.setValue}
                    label="Vehicle Number"
                    type="text"
                    extraPadding="10px"
                  />
                </Row> */}
                <Row className="form-row-spacing" >
                  <InputEditBox
                    id="registrationNumber"
                    setValue={setValue}
                    prefilled={vehicleProfile.registrationNumber}
                    disabled={editMode}
                    label="Registration Number"
                    type="text"
                    extraPadding="10px"
                  />
                </Row>
                <Row className="form-row-spacing" >
                  <InputEditBox
                    id="numberPlate"
                    setValue={this.props.setValue}
                    prefilled={vehicleProfile.numberPlate}
                    disabled={editMode}
                    label="Plate Number"
                    type="text"
                    extraPadding="10px"
                  />
                </Row>
                <Row className="form-row-spacing" >
                  <InputEditBox
                    id="model"
                    setValue={this.props.setValue}
                    prefilled={vehicleProfile.model}
                    disabled={editMode}
                    label="Model"
                    type="number"
                    extraPadding="10px"
                  />
                </Row>
                <Row className="form-row-spacing" >
                  <InputEditBox
                    id="chassisNumber"
                    values={this.numberValues}
                    setValue={this.props.setValue}
                    prefilled={vehicleProfile.chassisNumber}
                    disabled={editMode}
                    label="Chassis Number"
                    extraPadding="10px"
                  />
                </Row>
                <Row className="form-row-spacing" >
                  <InputEditSelect
                    id="engineType"
                    values={this.selectValues}
                    setValue={this.props.setValue}
                    prefilled={vehicleProfile.engineType}
                    disabled={editMode}
                    label="Engine Type"
                    extraPadding="10px"
                  />
                </Row>
              </Col>
              <Col md={4}>
                <Row className="form-row-spacing" >
                  <InputEditSelect
                    id="type"
                    values={this.selectType}
                    setValue={this.props.setValue}
                    prefilled={vehicleProfile.type}
                    disabled={editMode}
                    label="Type"
                  />
                </Row>
                <Row className="form-row-spacing" >
                  <InputEditSelect
                    id="loadCapacity"
                    values={this.selectLoad}
                    setValue={this.props.setValue}
                    prefilled={Number(vehicleProfile.loadCapacity)}
                    disabled={editMode}
                    label="Number of Bags"
                  />
                </Row>

                <Row className="form-row-spacing" >
                  <InputEditBox
                    id="colour"
                    setValue={this.props.setValue}
                    prefilled={vehicleProfile.colour}
                    disabled={editMode}
                    label="Color"
                  />
                </Row>
                <Row className="form-row-spacing" >
                  <InputEditBox
                    id="engineNumber"
                    setValue={this.props.setValue}
                    prefilled={vehicleProfile.engineNumber}
                    disabled={editMode}
                    label="Engine Number"
                  />
                </Row>
              </Col>
              <Col md={4}>
                <VehicleEditFile
                  id="carImageUrl"
                  setValue={this.props.setValue}
                  prefilled={vehicleProfile.carImageUrl}
                  baseURL={vehicleProfile.carImageUrl}
                  disabled={editMode}
                  customStyle="vertical"
                >
                  <MapsDirectionsCar />
                  <strong>Vehicle Image</strong>
                  <span>(Front View)</span>
                </VehicleEditFile>
              </Col>
            </Row>
          </Grid>
          <h2 style={{ ...GlobalStyle.formHeadings, ...GlobalStyle.formHeadingExtraSpacing }}>Document Details</h2>
          <Divider className="paper-divider" />
          <Grid fluid>
            <Row className="form-row-spacing">
              <Col md={4}>
                <InputEditBox
                  id="insuranceNumber"
                  setValue={this.props.setValue}
                  prefilled={vehicleProfile.insuranceNumber}
                  disabled={editMode}
                  label="Insurance Number"
                  type="text"
                />
              </Col>
              <Col md={4}>

                <InputEditBox
                  id="insuranceExpiry"
                  setValue={this.props.setValue}
                  prefilled={Converters.dateConverter(vehicleProfile.insuranceExpiry)}
                  disabled={editMode}
                  label="Insurance Expiry"
                  type="date"
                  fixedFloat
                />
              </Col>
            </Row>
            {/* <Row className="form-row-spacing">
              <Col md={4}>
                <InputEditBox
                  id="insuranceNo"
                  setValue={this.props.setValue}
                  label="Insurance No"
                  type="text"
                />
              </Col>
              <Col md={4}>
                <InputEditBox
                  id="insuranceExpiry"
                  setValue={this.props.setValue}
                  label="Insurance Expiry"
                  type="text"
                />
              </Col>
              <Col md={4}>
                <InputEditBox
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
                <VehicleEditFile
                  id="leftSideImageUrl"
                  setValue={this.props.setValue}
                  prefilled={vehicleProfile.leftSideImageUrl}
                  disabled={editMode}
                  customStyle="horizontal"
                >
                  <MapsDirectionsCar />
                  <strong>Left Side Image</strong>
                </VehicleEditFile>
              </Col>
              <Col md={3}>
                <VehicleEditFile
                  id="rightSideImageUrl"
                  setValue={this.props.setValue}
                  prefilled={vehicleProfile.rightSideImageUrl}
                  disabled={editMode}
                  customStyle="horizontal"
                >
                  <MapsDirectionsCar />
                  <strong>Right Side Image</strong>
                </VehicleEditFile>
              </Col>
              <Col md={3}>
                <VehicleEditFile
                  id="engineSideImageUrl"
                  setValue={this.props.setValue}
                  prefilled={vehicleProfile.engineSideImageUrl}
                  disabled={editMode}
                  customStyle="horizontal"
                >
                  <MapsDirectionsCar />
                  <strong>Enginer Image</strong>
                </VehicleEditFile>
              </Col>
              <Col md={3}>
                <VehicleEditFile
                  id="backSideImageUrl"
                  setValue={this.props.setValue}
                  prefilled={vehicleProfile.backSideImageUrl}
                  disabled={editMode}
                  customStyle="horizontal"
                >
                  <MapsDirectionsCar />
                  <strong>Back Image</strong>
                </VehicleEditFile>
              </Col>
            </Row>
          </Grid>
        </form>
      </div>
    );
  }
}
