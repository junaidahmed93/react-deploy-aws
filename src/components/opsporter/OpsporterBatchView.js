import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { browserHistory } from 'react-router';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import GlobalStyle from '../../utils/Styles';
import Luggage from '../../assets/images/luggage.svg';

export default class OpsporterBatchView extends React.Component {
  constructor(props) {
    super(props);
    // this.viewOpsDetail = this.viewOpsDetail.bind(this);
    this.state = {
      showCheckboxes: false,
      selectable: false,
      fixedHeader: true,
      currentActiveBatch: [],
      batch: [],
    };
    this.allBatches = [];
  }


  viewOpsDetail(id) {
    browserHistory.push(`/home/admin/driporter/${id}`);
  }

  handleCellClick = (rowNumber, columnNumber, evt) => {
    if (evt && evt.target && evt.target.dataset && evt.target.dataset.uid) {
      const id = evt.target.dataset.uid;
      browserHistory.push(`/home/admin/bookings/${id}`);
    }
  }


  render() {
    const { batch } = this.props;

    const rows = batch.map(data => (
      <TableRow style={GlobalStyle.tableRowSpacing} key={data.id} className="table-row-style">
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.referenceId}</TableRowColumn>
        {/* <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.batchId}</TableRowColumn> */}
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.flightNumber}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.userName}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.numberOfBags}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.status}</TableRowColumn>
        <TableRowColumn style={GlobalStyle.tableRowCell}>
          <img src={Luggage} onClick={() => this.props.viewImages(data)} />
        </TableRowColumn>
      </TableRow>

    ));

    if (batch && batch.length > 0) {
      return (
        <Table selectable onCellClick={this.handleCellClick}>
          <TableHeader style={GlobalStyle.tableHeaderSpacing} displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
            <TableRow style={GlobalStyle.tableHeaderSpacing} className="table-header-style">
              <TableHeaderColumn style={GlobalStyle.tableRowCell}>Ref ID</TableHeaderColumn>
              {/* <TableHeaderColumn style={GlobalStyle.tableRowCell}>Batch ID</TableHeaderColumn> */}
              <TableHeaderColumn style={GlobalStyle.tableRowCell}>Flight Number</TableHeaderColumn>
              <TableHeaderColumn style={GlobalStyle.tableRowCell}>Customer</TableHeaderColumn>
              <TableHeaderColumn style={GlobalStyle.tableRowCell}>Luggage</TableHeaderColumn>
              <TableHeaderColumn style={GlobalStyle.tableRowCell}>Status</TableHeaderColumn>
              <TableHeaderColumn style={GlobalStyle.tableRowCell}>Luggage Images</TableHeaderColumn>

            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={this.state.showCheckboxes} >
            {rows}
          </TableBody>
        </Table>
      );
    }

    return (
      <div>
        {/* No current active batch assign to this opsporter. */}
      </div>
    );
  }
}
