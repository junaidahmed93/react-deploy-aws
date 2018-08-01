import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import { loadState } from '../../utils/StorageUtils';

class HotelContainer extends Component {
  constructor(props) {
    super(props);
    this.hotelMenus = [
      'Bookings',
      'New-Booking',
      'Track-Booking',
      'Staff',
    ];

    this.handleClick = this.handleClick.bind(this);
    this.state = {
      active: false,
      activeItem: 'Booking',
    };
    const localData = loadState();
    if (localData.role.roleType === 'hotelCheckInStaff') {
      delete this.hotelMenus[3];
    }
    if (localData.role.roleType === 'admin') {
      delete this.hotelMenus[1];
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

    return this.hotelMenus.map((element, index) => (
      <MenuItem>
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
            <span>{element.replace('-', ' ')}</span>
          </div>
        </div>
      </MenuItem>));
  };

  routeMap(id) {
    switch (id) {
      case 'Bookings':
        return 'bookings';
      case 'New-Booking':
        return 'bookings/add';
      case 'Track-Booking':
        return 'track';
      case 'Staff':
        return 'staff';
      default:
        return 'stayOnPage';
    }
  }

  handleClick(e) {
    const path = this.routeMap(e.currentTarget.id);
    this.setState({ activeItem: e.currentTarget.id });
    if (!(path === 'stayOnPage')) {
      browserHistory.push(`/home/hotel/${path}`);
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
            <Col xs={3} sm={2} md={2} lg={1} style={{ overflowY: 'scroll', padding: 0 }} className="sideMenus">
              <Paper style={{ width: 'inherit', height: '100%' }} open>
                {this.getSideBarLinks()}
              </Paper>
            </Col>
            <Col style={{ overflowY: 'scroll', padding: 3 }} xs={9} sm={10} md={10} lg={11} className="rightSideItems">
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>

      // <div className="mainContainer">
      //   <div className="sideBar">
      //     <Drawer open containerClassName="custom-drawer" >
      //       {this.getSideBarLinks()}
      //     </Drawer>

      //   </div>
      //   <div className="rightContent">
      //     {this.props.children}
      //   </div>

      // </div>

    );
  }
}

export default HotelContainer;
