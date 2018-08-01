import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { browserHistory } from 'react-router';
import GlobalStyle from '../../utils/Styles';

export default class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.state = {
      showCheckboxes: false,
      selectable: false,
      fixedHeader: true,
    };
  }

  handleCellClick(rowNumber, columnNumber, evt) {
    const id = evt.target.dataset.uid;
    browserHistory.push(`/home/admin/user-panel/${id}`);
  }

  render() {
    const rows = this.props.userList.map(data => (
      <TableRow style={GlobalStyle.tableRowSpacing} className="table-row-style">
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.id}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.emiratesId}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.name}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.phoneNumber}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.numberVerified.toString() === 'true' ? 'Yes' : 'No'}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.emailVerified.toString() === 'true' ? 'Yes' : 'No'}</TableRowColumn>
      </TableRow>

    ));

    return (
      <Table selectable onCellClick={this.handleCellClick}>
        <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
          <TableRow style={GlobalStyle.tableHeaderSpacing} className="table-header-style">
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>User Id</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Emirates Id</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Name</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Phone Number </TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Number Verified</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Email Verified</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        {
                    this.props && this.props.userList && this.props.userList.length > 0 ?
                      <TableBody displayRowCheckbox={this.state.showCheckboxes} >{rows}</TableBody> :
                      <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                        <TableRow >
                          <TableHeaderColumn>NO USER</TableHeaderColumn>
                        </TableRow>
                      </TableBody>
                }

      </Table>
    );
  }
}
