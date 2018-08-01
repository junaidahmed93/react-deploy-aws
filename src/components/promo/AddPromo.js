import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import InputBox from '../shared/forms/InputBox';
import InputBoxNumber from '../shared/forms/InputBoxNumber';
import PromoPercentage from '../shared/promo-form/PromoPercentage';
import RestrictDate from '../shared/forms/RestrictDate';
import InputSelect from '../shared/forms/InputSelect';
import InputSelectWithDisable from '../shared/forms/InputSelectWithDisable';
import { store } from '../../store';
import Converters from '../../utils/Converters';

export default class AddPromo extends React.Component {
  constructor(props) {
    super(props);
    const allPromoTypes = store.getState().CommonReducer.promoType;
    this.selectPromoStatus = Converters.dbConstantConversion(allPromoTypes.statuses, 'promoStatus');
    this.selectType = Converters.dbConstantConversion(allPromoTypes.type, 'promoType');
    this.selectDiscountType = Converters.dbConstantConversion(allPromoTypes.discountTypes, 'promoDiscountType');
    this.selectCity = ['Dubai', 'Bahrain'];
  }

  render() {
    return (
      <form className="form-validation">
        <Grid fluid >
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputBox
                id="promoCode"
                setValue={this.props.setValue}
                label="Promo Code"
                type="text"
              />
            </Col>
            <Col md={4}>
              <RestrictDate
                id="startingDate"
                setValue={this.props.setValue}
                label="Starting Date"
                type="date"
                fixedFloat="true"
              />
            </Col>
            <Col md={4}>
              <RestrictDate
                id="endingDate"
                setValue={this.props.setValue}
                label="Ending Date"
                type="date"
                fixedFloat="true"
              />
            </Col>
          </Row>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputSelect
                id="promoCity"
                values={this.selectCity}
                setValue={this.props.setValue}
                label="City"
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="perUserLimit"
                setValue={this.props.setValue}
                label="Per User Limit"
                type="number"
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="totalUsage"
                setValue={this.props.setValue}
                label="Total Usage"
                type="number"
              />
            </Col>
          </Row>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputSelectWithDisable
                id="type"
                values={this.selectType}
                setValue={this.props.chooseCustomerType}
                label="Type"
              />
            </Col>
            <Col md={4}>
              <InputSelect
                id="discountType"
                values={this.selectDiscountType}
                setValue={this.props.setValue}
                label="Discount Type"
              />
            </Col>
            <Col md={4}>
              {}
              <PromoPercentage
                id="discount"
                inPercent={this.props.showOnlyPercentage}
                setValue={this.props.setValue}
                label={`${this.props.showOnlyPercentage === true ? 'Discount Percentage' : 'Discount Amount'}`}
                type="number"
              />
            </Col>
          </Row>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputBox
                id="maximumDiscount"
                setValue={this.props.setValue}
                label="Max Discount"
                type="number"
              />
            </Col>

            <Col md={4}>
              <InputBox
                id="description"
                setValue={this.props.setValue}
                label="Description"
                type="text"
              />
            </Col>
          </Row>
        </Grid>

      </form>
    );
  }
}
