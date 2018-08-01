import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import GlobalStyle from '../../utils/Styles';
import Converters from '../../utils/Converters';
import { Grid, Row, Col } from 'react-flexbox-grid';
// import ArrowDown from '../../assets/images/down-arrow.svg';
export default class DailySalesTable extends React.Component {
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
    console.log('Com did mount having the ', this.props);
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

  render() {
    const { totalBooking, bookingSorting } = this.props;
    const { bookings } = this.state;
    if (!(_.isEmpty(totalBooking))) {
      this.totalSale = 0;
      totalBooking.map((data) => {
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
      rows =
        (<TableRow style={GlobalStyle.tableRowSpacing} className="table-row-style">
          <TableRowColumn style={GlobalStyle.tableRowCell}>No Records</TableRowColumn>
        </TableRow>);
    }


    return (
      <div>
        <Table selectable onCellClick={this.handleCellClick}>
          <TableHeader style={GlobalStyle.tableHeaderSpacing} displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
            <TableRow onCellClick={this.headerClick} style={GlobalStyle.tableHeaderSpacing} className="table-header-style">
              <TableHeaderColumn style={GlobalStyle.tableRowCell} >
                Booking
                <ArrowDown
                  style={{
 height: '15px', width: '15px', cursor: 'pointer', position: 'absolute', marginTop: '10px',
}}
                  onClick={() => { this.props.sortSales('ID-ascend'); }}
                />
                <ArrowUp
                  style={{
 height: '15px', width: '15px', cursor: 'pointer', position: 'absolute', marginTop: '2px',
}}
                  onClick={() => { this.props.sortSales('ID-descend'); }}
                />
                {/* <LeftArrow data-columID="booking" onClick={() => { this.props.sortSales('booking') }}></LeftArrow> */}
              </TableHeaderColumn>
              <TableHeaderColumn style={GlobalStyle.tableRowCell}>Flight Number</TableHeaderColumn>
              <TableHeaderColumn style={GlobalStyle.tableRowCell}>Customer</TableHeaderColumn>
              <TableHeaderColumn style={GlobalStyle.tableRowCell}>
                No of bag
                <ArrowDown
                  style={{
 height: '15px', width: '15px', cursor: 'pointer', position: 'absolute', marginTop: '10px',
}}
                  onClick={() => { this.props.sortSales('noOfBag-ascend'); }}
                />
                <ArrowUp
                  style={{
 height: '15px', width: '15px', cursor: 'pointer', position: 'absolute', marginTop: '2px',
}}
                  onClick={() => { this.props.sortSales('noOfBag-descend'); }}
                />
              </TableHeaderColumn>

              <TableHeaderColumn style={GlobalStyle.tableRowCell}>
                Charged Amount
                <ArrowDown
                  style={{
 height: '15px', width: '15px', cursor: 'pointer', position: 'absolute', marginTop: '10px',
}}
                  onClick={() => { this.props.sortSales('chargeAmount-ascend'); }}
                />
                <ArrowUp
                  style={{
 height: '15px', width: '15px', cursor: 'pointer', position: 'absolute', marginTop: '2px',
}}
                  onClick={() => { this.props.sortSales('chargeAmount-descend'); }}
                />
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={this.state.showCheckboxes} >
            {rows}
          </TableBody>
        </Table>
        {!(_.isEmpty(totalBooking)) ?
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
