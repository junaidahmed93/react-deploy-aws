import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import InputEditBox from '../shared/forms/InputEditBox';
import InputBoxNumber from '../shared/forms/InputBoxNumber';
import RestrictEditDate from '../shared/forms/RestrictEditDate';
import InputEditSelect from '../shared/forms/InputEditSelect';
import { store } from '../../store';
import Converters from '../../utils/Converters';

export default class EditPromo extends React.Component {
  constructor(props) {
    super(props);
    const allPromoTypes = store.getState().CommonReducer.promoType;
    this.selectPromoStatus = Converters.dbConstantConversion(allPromoTypes.statuses, 'promoStatus');
    this.selectType = Converters.dbConstantConversion(allPromoTypes.type, 'promoType');
    this.selectDiscountType = Converters.dbConstantConversion(allPromoTypes.discountTypes, 'promoDiscountType');
    this.selectCity = ['All', 'Dubai', 'Bahrain'];
  }

  render() {
    const {
      editablePromo, editMode, setValue, chooseCustomerType, showOnlyPercentage,
    } = this.props;
    return (
      <form className="form-validation">
        <Grid fluid >
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputEditBox
                id="promoCode"
                setValue={setValue}
                prefilled={editablePromo.code}
                label="Promo Code"
                type="text"
                disabled="true"
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="startingDate"
                setValue={setValue}
                prefilled={Converters.dateConverter(editablePromo.validFrom)}
                label="Starting Date"
                type="date"
                fixedFloat="true"
                disabled="true"
              />
            </Col>
            <Col md={4}>
              <RestrictEditDate
                id="validTill"
                setValue={setValue}
                prefilled={Converters.dateConverter(editablePromo.validTill)}
                label="Ending Date"
                type="date"
                fixedFloat="true"
                disabled={editMode}
              />
            </Col>
          </Row>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputEditSelect
                id="status"
                values={this.selectPromoStatus}
                prefilled={Converters.dbConstantStatusConversion(editablePromo.status)}
                setValue={setValue}
                label="Status"
                disabled="true"
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="usagePerUserLimit"
                setValue={setValue}
                prefilled={editablePromo.usagePerUserLimit}
                label="Per User Limit"
                type="number"
                disabled={editMode}
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="totalUsage"
                setValue={setValue}
                prefilled={editablePromo.totalUsageLimit}
                label="Total Usage"
                type="number"
                disabled="true"
              />
            </Col>
          </Row>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputEditSelect
                id="type"
                values={this.selectType}
                setValue={chooseCustomerType}
                prefilled={Converters.dbConstantPromoTypeConversion(editablePromo.type)}
                label="Type"
                disabled="true"
              />
            </Col>
            <Col md={4}>
              <InputEditSelect
                id="discountType"
                values={this.selectDiscountType}
                setValue={setValue}
                prefilled={Converters.dbConstantDiscountConversion(editablePromo.discountType)}
                label="Discount Type"
                disabled="true"
              />
            </Col>
            <Col md={4}>
              {}
              <InputEditBox
                id="discount"
                inPercent={showOnlyPercentage}
                setValue={setValue}
                label={`${showOnlyPercentage === true ? 'Discount Percentage' : 'Discount Amount'}`}
                prefilled={editablePromo.discount}
                type="number"
                disabled="true"
                fixedFloat="true"
              />
            </Col>
          </Row>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputEditBox
                id="maximumDiscount"
                setValue={setValue}
                prefilled={editablePromo.maximumDiscount}
                label="Max Discount"
                type="number"
                disabled="true"
              />
            </Col>
            <Col md={4}>
              <InputEditSelect
                id="promoCity"
                values={this.selectCity}
                setValue={setValue}
                prefilled={Converters.dbConstantRegionToName(editablePromo.regions)}
                label="City"
                disabled="true"
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="description"
                setValue={this.props.setValue}
                prefilled={editablePromo.description}
                label="Description"
                type="text"
                disabled="true"
              />
            </Col>
          </Row>
        </Grid>

      </form>
    );
  }
}
