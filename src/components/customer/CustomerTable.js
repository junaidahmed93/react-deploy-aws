import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
// import { browserHistory } from 'react-router';
import GlobalStyle from '../../utils/Styles';

export default class CustomerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckboxes: false,
      selectable: false,
      fixedHeader: true,
    };
  }

  handleCellClick(rowNumber, columnNumber, evt) {
    // const id = evt.target.dataset.uid;
    // browserHistory.push(`/home/admin/customer/${id}`);
  }

  render() {
    const rows = this.props.rows.map(data => (
      <TableRow style={GlobalStyle.tableRowSpacing} key={data.id} className="table-row-style">
        {/* <TableRowColumn data-uid={data.id}>{data.dropoffDate}</TableRowColumn>
                    <TableRowColumn data-uid={data.id}>02:20Pm</TableRowColumn> */}
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.id}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.name}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.email}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.country}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.phoneNumber}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.emailVerified.toString() === 'true' ? 'Yes' : 'No'}</TableRowColumn>
      </TableRow>

    ));
    return (
      <Table selectable onCellClick={this.handleCellClick}>
        <TableHeader style={GlobalStyle.tableHeaderSpacing} displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
          <TableRow style={GlobalStyle.tableHeaderSpacing} className="table-header-style">
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Id</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Name</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Email</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Country</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Phone Number</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Email Verified</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={this.state.showCheckboxes} >
          {rows}
        </TableBody>
      </Table>
    );
  }
}
