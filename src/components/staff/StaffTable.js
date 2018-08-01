import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { browserHistory } from 'react-router';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import GlobalStyle from '../../utils/Styles';

export default class StaffTable extends React.Component {
  constructor(props) {
    super(props);
    this.viewOpsDetail = this.viewOpsDetail.bind(this);
    this.state = {
      showCheckboxes: false,
      selectable: false,
      fixedHeader: true,
    };
  }

  viewOpsDetail(id) {
    browserHistory.push(`/home/hotel/staff/${id}`);
  }

  render() {
    const rows = this.props.rows.map(data =>
    // if (data && data.roles && data.roles[0].roleType === "hotelCheckInStaff") {
      (
        <TableRow style={GlobalStyle.tableRowSpacing} key={data.id} className="table-row-style">
          <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowSpacing}>{data.emiratesId}</TableRowColumn>
          <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowSpacing}>{data.name}</TableRowColumn>
          <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowSpacing}>{data.phoneNumber}</TableRowColumn>
          <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowSpacing}>{data.email}</TableRowColumn>
          <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowSpacing}>{data.city}</TableRowColumn>
          <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowSpacing}>{data.nationality}</TableRowColumn>
          <TableRowColumn style={GlobalStyle.tableRowSpacing}>
            <AccountBox onClick={() => this.viewOpsDetail(data.id)} />
          </TableRowColumn>
        </TableRow>

      ));

    return (
      <Table selectable onCellClick={this.handleCellClick}>
        <TableHeader style={GlobalStyle.tableHeaderSpacing} displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
          <TableRow style={GlobalStyle.tableHeaderSpacing} className="table-header-style">
            <TableHeaderColumn style={GlobalStyle.tableHeaderSpacing}>National ID</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableHeaderSpacing}>Name</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableHeaderSpacing}>Phone number</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableHeaderSpacing}>Email</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableHeaderSpacing}>City</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableHeaderSpacing}>Nationality</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableHeaderSpacing}>Actions</TableHeaderColumn>

          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={this.state.showCheckboxes} >
          {rows}
        </TableBody>
      </Table>
    );
  }
}
