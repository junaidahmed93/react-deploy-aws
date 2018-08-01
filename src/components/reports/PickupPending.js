import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import GlobalStyle from '../../utils/Styles';
import Converters from '../../utils/Converters';

export default class PickupPending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckboxes: false,
      selectable: false,
      fixedHeader: true,
      bookings: {},
    };
  }

  handleCellClick = (rowNumber, columnNumber, evt) => {
    if (evt && evt.target && evt.target.dataset && evt.target.dataset.uid) {
      const id = evt.target.dataset.uid;
      browserHistory.push(`/home/admin/bookings/${id}`);
    }
  }

  sorting(a) {
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < a.length - 1; i++) {
        if (a[i].dropTime > a[i + 1].dropTime) {
          const temp = a[i];
          a[i] = a[i + 1];
          a[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
  }


  render() {
    const { bookings } = this.props;
    let rows;
    if (!(_.isEmpty(bookings))) {
      rows = bookings.map(data => (
        <TableRow style={GlobalStyle.tableRowSpacing} key={data.id} className="table-row-style">
          <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.referenceId}</TableRowColumn>
          <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.userName}</TableRowColumn>
          <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.userPhoneNumber}</TableRowColumn>
          <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.flightNumber}</TableRowColumn>
          <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{Converters.dateUIviewConversion(data.flightDepartureTime)}</TableRowColumn>
          <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.status}</TableRowColumn>
          <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{Converters.dateUIviewConversion(data.requestedPickupTime)}</TableRowColumn>
          <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.serviceAreaDto.serviceAreaName}</TableRowColumn>
        </TableRow>

      ));
    }
    if (_.isEmpty(bookings)) {
      rows = (
        <TableRow style={GlobalStyle.tableRowSpacing} className="table-row-style">
          <TableRowColumn style={GlobalStyle.tableRowCell}>No Records</TableRowColumn>
        </TableRow>);
    }


    return (
      <div>
        <Table selectable onCellClick={this.handleCellClick}>
          <TableHeader style={GlobalStyle.tableHeaderSpacing} displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
            <TableRow style={GlobalStyle.tableHeaderSpacing} className="table-header-style">
              <TableHeaderColumn style={GlobalStyle.tableRowCell}>Booking Ref</TableHeaderColumn>
              <TableHeaderColumn style={GlobalStyle.tableRowCell}>Name</TableHeaderColumn>
              <TableHeaderColumn style={GlobalStyle.tableRowCell}>Contact</TableHeaderColumn>
              <TableHeaderColumn style={GlobalStyle.tableRowCell}>Flight Number</TableHeaderColumn>
              <TableHeaderColumn style={GlobalStyle.tableRowCell}>Flight Time</TableHeaderColumn>
              <TableHeaderColumn style={GlobalStyle.tableRowCell}>Status</TableHeaderColumn>
              <TableHeaderColumn style={GlobalStyle.tableRowCell}>Pickup Time</TableHeaderColumn>
              <TableHeaderColumn style={GlobalStyle.tableRowCell}>City</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={this.state.showCheckboxes} >
            {rows}
          </TableBody>
        </Table>
      </div>

    );
  }
}
