import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { browserHistory } from 'react-router';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import GlobalStyle from '../../utils/Styles';
import Converters from '../../utils/Converters';

export default class PromoTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckboxes: false,
      selectable: false,
      fixedHeader: true,
    };
  }
  getStatus = (data) => {
    const expTime = new Date(data.validTill).getTime();
    const currentTime = new Date().getTime();
    if (currentTime > expTime) {
      return 'Expired';
    }

    return Converters.dbConstantStatusConversion(data.status);
  }

  handleCellClick = (rowNumber, columnNumber, evt) => {
    if (evt && evt.target && evt.target.dataset && evt.target.dataset.uid) {
      const id = evt.target.dataset.uid;
      browserHistory.push(`/home/admin/promo/${id}`);
    }
  }
  render() {
    const rows = this.props.rows.map((data) => {
      if (!(data.status === 'ARCHIVE_STATUS')) {
        return (
          <TableRow style={GlobalStyle.tableRowSpacing} key={data.id} className="table-row-style">
            <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.id}</TableRowColumn>
            <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.code}</TableRowColumn>
            <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{Converters.dbConstantDiscountConversion(data.discountType)}</TableRowColumn>
            <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.discount}</TableRowColumn>
            <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{this.getStatus(data)}</TableRowColumn>
            <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{Converters.dbConstantPromoTypeConversion(data.type)}</TableRowColumn>
            <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.usageCount}</TableRowColumn>
            <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.usagePerUserLimit}</TableRowColumn>

          </TableRow>
        );
      }
    });
    return (
      <Table selectable onCellClick={this.handleCellClick}>
        <TableHeader style={GlobalStyle.tableHeaderSpacing} displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
          <TableRow style={GlobalStyle.tableHeaderSpacing} className="table-header-style">
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>ID</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Code</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Discount Type</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Discount</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Status</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Type</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Usage</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Usage Limit</TableHeaderColumn>


          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={this.state.showCheckboxes} >
          {rows}
        </TableBody>
      </Table>
    );
  }
}
