import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import { Grid, Row, Col } from 'react-flexbox-grid';
import GlobalStyle from '../../utils/Styles';
// import ArrowDown from '../../assets/images/down-arrow.svg';
export default class PrintDailySales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckboxes: false,
      selectable: false,
      fixedHeader: true,
      bookings: [],
    };
    this.totalSale = 0;
  }

  handleCellClick = (rowNumber, columnNumber, evt) => {
    if (evt && evt.target && evt.target.dataset && evt.target.dataset.uid) {
      const id = evt.target.dataset.uid;
      browserHistory.push(`/home/admin/bookings/${id}`);
    }
  }

  headerClick = (event) => {
    if (event) {
      console.log(event.target.dataset);
    }
  }

  componentDidMount() {
    if (this.props && this.props.bookings) {
      this.setState({ bookings: this.props.bookings });
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

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.bookings) {
      this.setState({ bookings: nextProps.bookings });
    }
  }

  sortData = (columName) => {
    const { bookings } = this.state;
    if (columName === 'booking') {
      bookings.sort((a, b) => b.numberOfBags - a.numberOfBags);
    }
    this.setState({ bookings });
  }

  getDate = (dateInMoment) => {
    if (dateInMoment && typeof dateInMoment === 'object') {
      return dateInMoment.toDate().toString().substr(4, 11).replace(/ /g, '-');
    }
  }

  render() {
    const {
      selectedCity, selectedDateRange,
    } = this.props;
    const { bookings } = this.state;
    if (!(_.isEmpty(bookings))) {
      this.totalSale = 0;
      bookings.map((data) => {
        if (data.totalCharges) {
          this.totalSale = this.totalSale + Number(data.totalCharges);
        }
      });
    }

    let rows;
    if (!(_.isEmpty(bookings))) {
      rows = bookings.map(data => (
        <TableRow style={GlobalStyle.tableRowSpacing} key={data.bookingId} className="table-row-style">
          <TableRowColumn data-uid={data.bookingId} style={GlobalStyle.tableRowCell}>{data.referenceId}</TableRowColumn>
          <TableRowColumn data-uid={data.bookingId} style={GlobalStyle.tableRowCell}>{data.flightNumber}</TableRowColumn>
          <TableRowColumn data-uid={data.bookingId} style={GlobalStyle.tableRowCell}>{data.userName}</TableRowColumn>
          <TableRowColumn data-uid={data.bookingId} style={GlobalStyle.tableRowCell}>{data.numberOfBags}</TableRowColumn>
          <TableRowColumn data-uid={data.bookingId} style={GlobalStyle.tableRowCell}>{data.totalCharges}</TableRowColumn>
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
      <div id="printTable">
        <h2 style={{ textAlign: 'center' }}>Daily Sales Report</h2>
        <span style={{ paddingLeft: '10px' }}>City: {selectedCity}</span>
        {selectedDateRange.length > 0 ? <span style={{ paddingLeft: '10px' }}>From: {this.getDate(selectedDateRange[0])}</span> : null}
        {selectedDateRange.length > 0 ? <span style={{ paddingLeft: '10px' }}>Till: {this.getDate(selectedDateRange[1])}</span> : null}


        <Table selectable onCellClick={this.handleCellClick}>
          <TableHeader style={GlobalStyle.tableHeaderSpacing} displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
            <TableRow onCellClick={this.headerClick} style={GlobalStyle.tableHeaderSpacing} className="table-header-style">
              <TableHeaderColumn style={GlobalStyle.tableRowCellPrint} >
                Booking
              </TableHeaderColumn>
              <TableHeaderColumn style={GlobalStyle.tableRowCellPrint}>Flight Number</TableHeaderColumn>
              <TableHeaderColumn style={GlobalStyle.tableRowCellPrint}>Customer</TableHeaderColumn>
              <TableHeaderColumn style={GlobalStyle.tableRowCellPrint}>
                No of bag
              </TableHeaderColumn>
              <TableHeaderColumn style={GlobalStyle.tableRowCellPrint}>
                Charged Amount
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={this.state.showCheckboxes} >
            {rows}
          </TableBody>
        </Table>
        {!(_.isEmpty(bookings)) ?
          <Grid>
            <Row>
              <Col md={3} />
              <Col md={3} />
              <Col md={4} />
              <Col md={2}>
                <span style={{ fontSize: '20px' }}>Total Charge: {this.totalSale}</span>
              </Col>
            </Row>
          </Grid>
          : null}

      </div>

    );
  }
}
