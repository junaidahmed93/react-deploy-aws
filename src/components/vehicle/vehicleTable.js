import React from 'react';
import { browserHistory } from 'react-router';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import GlobalStyle from '../../utils/Styles';

export default class VehicleTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.showToolTip = this.showToolTip.bind(this);
    this.state = {
      showCheckboxes: false,
      selectable: false,
      fixedHeader: true,
      showSelectionBox: false,
      showToolTip: false,
      hoverId: -1,
    };
  }

  handleCellClick(rowNumber, columnId) {
    if (columnId === 4) {
      this.props.assignDriporter(rowNumber, columnId);
    }
  }

  viewOpsDetail(id) {
    browserHistory.push(`/home/admin/vehicle/${id}`);
  }

  showToolTip(i) {
    this.setState({ showToolTip: true, hoverId: i });
  }

  render() {
    const rows = this.props.rows.map((v, i) => (
      <TableRow {...this.props} style={GlobalStyle.tableRowSpacing} key={i} className="table-row-style">
        <TableRowColumn style={GlobalStyle.tableRowCell}>{v.numberPlate}</TableRowColumn>
        <TableRowColumn style={GlobalStyle.tableRowCell}>{v.model}</TableRowColumn>
        <TableRowColumn style={GlobalStyle.tableRowCell}>{v.type}</TableRowColumn>
        <TableRowColumn style={GlobalStyle.tableRowCell} >{v.engineType}</TableRowColumn>
        <TableRowColumn
          style={GlobalStyle.tableRowCell}
          onMouseEnter={() => this.showToolTip(i)}
          onMouseLeave={() => { this.setState({ showToolTip: false, hoverId: -1 }); }}
        >
          <div className="tooltip"> {v && v.assignedPorter ? v.assignedPorter.name : 'To be Assign'}
            {
              this.state.showToolTip && this.state.hoverId === i ?
                <span className="tooltiptext">Click to change</span>
                : null
            }
          </div>
        </TableRowColumn>
        <TableRowColumn style={GlobalStyle.tableRowCell}>{v.loadCapacity}</TableRowColumn>
        <TableRowColumn style={GlobalStyle.tableRowCell}>{v.colour}</TableRowColumn>
        <TableRowColumn style={GlobalStyle.tableRowCell}>
          <AccountBox onClick={() => this.viewOpsDetail(v.id)} />
        </TableRowColumn>

      </TableRow >
    ));
    return (
      <Table selectable onCellClick={this.handleCellClick} onRowHover={this.onCellHover}>
        <TableHeader style={GlobalStyle.tableHeaderSpacing} displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
          <TableRow style={GlobalStyle.tableHeaderSpacing} className="table-header-style">
            <TableHeaderColumn style={GlobalStyle.tableRowCell} >Plate</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell} >Model</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell} >Car Type</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell} >Engine Type</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell} >Assigned To</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell} >Capacity</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell} >Colour</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableRowCell} >Actions</TableHeaderColumn>

          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={this.state.showCheckboxes} >
          {rows}
        </TableBody>

      </Table>
    );
  }
}
