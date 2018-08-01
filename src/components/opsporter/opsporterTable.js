import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { browserHistory } from 'react-router';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import GlobalStyle from '../../utils/Styles';

export default class OpsporterTable extends React.Component {
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
    browserHistory.push(`/home/admin/opsporter/${id}`);
  }

  handleCellClick = (rowNumber, columnNumber, evt) => {
    if (evt && evt.target && evt.target.dataset && evt.target.dataset.uid) {
      const id = evt.target.dataset.uid;
      browserHistory.push(`/home/admin/opsporter-job/${id}`);
    }
  }

  render() {
    const rows = this.props.rows.map(data => (
      <TableRow style={GlobalStyle.tableRowSpacing} key={data.id} className="table-row-style">
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.id}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.name}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.phoneNumber}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.status}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.totalBatchAssigned}</TableRowColumn>
        <TableRowColumn data-uid={data.id}style={GlobalStyle.tableRowCell}>{data.totalBatchComplete}</TableRowColumn>
        <TableRowColumn style={GlobalStyle.tableRowCell}>
          <AccountBox onClick={() => this.viewOpsDetail(data.id)} />
        </TableRowColumn>
      </TableRow>

    ));
    return (
      <Table selectable onCellClick={this.handleCellClick}>
        <TableHeader style={GlobalStyle.tableHeaderSpacing} displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
          <TableRow style={GlobalStyle.tableHeaderSpacing} className="table-header-style">
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>ID</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Name</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Phone number</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Status</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Assigned Batch</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Total Batch</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell}>Actions</TableHeaderColumn>

          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={this.state.showCheckboxes} >
          {rows}
        </TableBody>
      </Table>
    );
  }
}
