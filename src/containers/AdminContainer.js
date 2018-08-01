import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';

const adminMenus = [
  'Dashboard',
  'Configure',
  'Booking',
  'Promo',
  'Staff',
  'Vehicle',
  'Customer',
  'Report',

  // "Growth",
];
class AdminComponent extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      active: false,
      activeItem: 'DASHBOARD',
    };
  }


  routeMap(id) {
    switch (id) {
      case 'Dashboard':
        return 'dashboard';
      case 'Vehicle':
        return 'vehicle';
      case 'Configure':
      case 'Staff':
      case 'Booking':
      case 'Promo':
      case 'Customer':
      case 'Report':
        return 'stayOnPage';
      case 'Growth':
        return 'growth';
      // case 'Report':
      //   return 'report';
      default:
        return 'stayOnPage';
    }
  }

  getSubMenus = (element) => {
    if (element === 'Configure') {
      return (
        <div>
          <MenuItem
            value="a"
            primaryText="User Panel"
            onClick={(e) => { this.handleSubMenus(e, 'user-panel'); }}
          />
          <MenuItem
            value="a"
            primaryText="Add Partner Hotel"
            onClick={(e) => { this.handleSubMenus(e, 'hotel-partner'); }}
          />
        </div>

      );
    } else if (element === 'Staff') {
      return (
        <div>
          <MenuItem
            value="a"
            primaryText="Driporter"
            onClick={(e) => { this.handleSubMenus(e, 'driporter'); }}
          />
          <MenuItem
            value="a"
            primaryText="OPS porter"
            onClick={(e) => { this.handleSubMenus(e, 'opsporter'); }}
          />
        </div>
      );
    } else if (element === 'Customer') {
      return (
        <div>
          <MenuItem
            value="a"
            primaryText="List"
            onClick={(e) => { this.handleSubMenus(e, 'customer'); }}
          />
          <MenuItem
            value="a"
            primaryText="Notification"
            onClick={(e) => { this.handleSubMenus(e, 'customer-notification'); }}
          />
        </div>
      );
    } else if (element === 'Booking') {
      return (
        <div>
          <MenuItem
            value="a"
            primaryText="In Progress"
            onClick={(e) => { this.handleSubMenus(e, 'bookings'); }}
          />
          <MenuItem
            value="a"
            primaryText="Completed"
            onClick={(e) => { this.handleSubMenus(e, 'bookings/completed'); }}
          />
        </div>
      );
    } else if (element === 'Promo') {
      return (
        <div>
          <MenuItem
            value="a"
            primaryText="List"
            onClick={(e) => { this.handleSubMenus(e, 'promo'); }}
          />
          <MenuItem
            value="a"
            primaryText="Add"
            onClick={(e) => { this.handleSubMenus(e, 'promo/add'); }}
          />
        </div>
      );
    } else if (element === 'Report') {
      return (
        <div>
          <MenuItem
            value="a"
            primaryText="Daily Sales"
            onClick={(e) => { this.handleSubMenus(e, 'report/daily-sales'); }}
          />
          <MenuItem
            value="a"
            primaryText="Job at Risk"
            onClick={(e) => { this.handleSubMenus(e, 'report/risk-job'); }}
          />
          <MenuItem
            value="a"
            primaryText="Upcomings"
            onClick={(e) => { this.handleSubMenus(e, 'report/upcoming'); }}
          />
        </div>
      );
    }
  }
  getSideBarLinks = () => {
    const { activeItem } = this.state;
    const styles = {
      activeText: {
        color: '#29abe2',
        // fontWeight: "bold"
        fontSize: '12px',
      },
      nonActive: {
        color: '#7E7E7E',
        cursor: 'pointer',
        fontSize: '12px',
      },
    };
    return adminMenus.map((element, index) => (
      <MenuItem
        menuItems={this.getSubMenus(element)}
        key={index}
      >
        <div
          key={index}
          id={element}
          className="sideOptions"
          onClick={this.handleClick}
          data-index={element}
          style={
            activeItem === element ? styles.activeText : styles.nonActive
          }
        >
          <div
            className={
              activeItem === element ? `${element}Active` : element
            }
          />
          <div style={{ marginTop: '-12px' }}>
            <span>{element}</span>
          </div>
        </div>
      </MenuItem>));
  };

  handleClick(e) {
    const path = this.routeMap(e.currentTarget.id);
    this.setState({ activeItem: e.currentTarget.id });
    if (!(path === 'stayOnPage')) {
      if (this.props.location.pathname === '/home/admin/report') {
      } else {
        browserHistory.push(`/home/admin/${path}`);
      }
    }
  }

  handleSubMenus = (event, value) => {
    if(this.props.location.pathname === '/home/admin/report/risk-job' && value === 'report/risk-job'){

    }
    else{
      browserHistory.push(`/home/admin/${value}`);
    }
    
  }
  render() {
    return (
      <div>
        <Grid fluid className="gridMain" style={{ padding: 0, paddingLeft: 2 }}>
          <Row style={{
            height: 'inherit',
            // overflow: 'hidden'
          }}
          >
            <Col xs={3} sm={2} md={2} lg={1} style={{ padding: 0 }} className="sideMenus">
              <Paper className="sideMenusPaper" style={{ width: 'inherit', overflowY: 'scroll', height: '100%' }} open>
                {this.getSideBarLinks()}
              </Paper>
            </Col>
            <Col style={{ overflowY: 'scroll', padding: 3 }} xs={9} sm={10} md={10} lg={11} className="rightSideItems">
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AdminComponent;
