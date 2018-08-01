import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { browserHistory } from 'react-router';
import GlobalStyle from '../../utils/Styles';
import statusMapping from '../../utils/StatusMapping';

export default class BookingTable extends React.Component {
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
    browserHistory.push(`/home/admin/bookings/${id}`);
  }

  render() {
    const rows = this.props.rows.map(data => (
      <TableRow style={GlobalStyle.tableRowSpacing} key={data.id} className="table-row-style">
        {/* <TableRowColumn data-uid={data.id}>{data.dropoffDate}</TableRowColumn>
                    <TableRowColumn data-uid={data.id}>02:20Pm</TableRowColumn> */}
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCellWithClip} >{data.referenceId}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.batchId}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.flightNumber}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.userName}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.driPorterName}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{statusMapping(data.status)}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.numberOfBags}</TableRowColumn>
        {/* <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.pickupLocationName}</TableRowColumn> */}
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.departureLocationName}</TableRowColumn>
      </TableRow>

    ));
    return (
      <Table selectable onCellClick={this.handleCellClick}>
        <TableHeader style={GlobalStyle.tableHeaderSpacing} displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
          <TableRow style={GlobalStyle.tableHeaderSpacing} className="table-header-style">
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Ref Id</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Batch Id</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Flight No</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Customer</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Driporter</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Status</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Luggage</TableHeaderColumn>
            {/* <TableHeaderColumn style={GlobalStyle.tableRowCell}>Pickup Location</TableHeaderColumn> */}
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Drop off</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={this.state.showCheckboxes} >
          {rows}
        </TableBody>
      </Table>
    );
  }
}
