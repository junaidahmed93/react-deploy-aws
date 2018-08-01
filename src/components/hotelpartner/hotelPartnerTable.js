import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { browserHistory } from 'react-router';
import GlobalStyle from '../../utils/Styles';

export default class HotelPartnerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckboxes: false,
      selectable: false,
      fixedHeader: true,
    };
  }

  handleCellClick(rowNumber, columnNumber, evt) {
    const id = evt.target.dataset.uid;
    browserHistory.push(`/home/admin/hotel-partner/${id}`);
  }

  render() {
    const rows = this.props.rows.map(data => (
      <TableRow style={GlobalStyle.tableRowSpacing} key={data.id} className="table-row-style">
        <TableRowColumn data-uid={data.dataId} style={GlobalStyle.tableRowCell}>{data.hotelName}</TableRowColumn>
        <TableRowColumn data-uid={data.dataId} style={GlobalStyle.tableRowCell}>{data.name}</TableRowColumn>
        <TableRowColumn data-uid={data.dataId} style={GlobalStyle.tableRowCell}>{data.address}</TableRowColumn>
        <TableRowColumn data-uid={data.dataId} style={GlobalStyle.tableRowCell}>{data.bookingLimit}</TableRowColumn>
        <TableRowColumn data-uid={data.dataId} style={GlobalStyle.tableRowCell}>{data.country}</TableRowColumn>
      </TableRow>

    ));
    return (
      <Table selectable onCellClick={this.handleCellClick}>
        <TableHeader style={GlobalStyle.tableHeaderSpacing} displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
          <TableRow style={GlobalStyle.tableHeaderSpacing} className="table-header-style">
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Hotel Name</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Username</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Address </TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Booking Limit /day</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>User country</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={this.state.showCheckboxes} >
          {rows}
        </TableBody>
      </Table>
    );
  }
}
