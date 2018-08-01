import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import Popover from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CommonActions from '../actions/CommonActions';
import imageUrl from '../assets/images/profile.png';
import { loadState } from '../utils/StorageUtils';

class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    const path = browserHistory.getCurrentLocation().pathname;
    const activeHead = path.charAt(6) === 'h' ? 'Hotel' : 'Admin';
    this.onlineUser = loadState();
    this.state = {
      activeItem: activeHead,
      isDraweropen: false,
      itemName: '',
      itemslist: ['Overview Home'],
      open: false,
      showAll: false,
      showOnlyHotel: false,
      showOnlyRemote: false,
      batchPendingCount: 0,
      pendingBatch: [],

    };
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  handleItemClick = (e, name) => {
    this.setState({ activeItem: name });
    const path = this.routeMap(name);
    browserHistory.push(`/home/${path}`);
  };

  componentDidMount() {
    this.props.CommonActions.getBatch();
    this.batchInterval = setInterval(() => {
      this.props.CommonActions.getBatch();
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.batchInterval);
  }

  routeMap(name) {
    switch (name) {
      case 'Admin':
        return 'admin/dashboard';
      case 'Remote':
        return 'remote';
      case 'Hotel':
        return 'hotel/bookings';
      default:
        return 'admin';
    }
  }

  handleDrawerClose() {
    this.setState({ isDraweropen: false });
  }
  getActiveItem = (links) => {
    let item = '';
    links.forEach((element) => {
      if (element.Index) {
        item = element.link;
      }
    });
    this.setState({ activeItem: item });
  };
  getHeaderLinks = () => {
    const { activeItem } = this.state;

    // if (!this.props.firstLogin) {
    return this.props.links.map(element => (
      <Menu.Item
        className="menu-item menuTabStyle"
        name={element.tag}
        id={element.tag}
        active={activeItem === element.tag}
        onClick={this.handleItemClick}
        data-index={element.address}
      />
    ));
  };
  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  componentWillMount() {
    if (this.props.loggedInUser.role.roleType === 'hotel' || this.props.loggedInUser.role.roleType === 'hotelCheckInAdmin') {
      this.setState({ showOnlyHotel: true });
    }
    if (this.props.loggedInUser.role.roleType === 'remote') {
      this.setState({ showOnlyRemote: true });
    }
    if (this.props.loggedInUser.role.roleType === 'admin') {
      this.setState({ showAll: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.batch && nextProps.batch.data) {
      // this.setState({ batch: nextProps.batch.data });
      let pendingBatch = [],
        batchCount = 0;
      const totalBatch = nextProps.batch.data;
      if (totalBatch && totalBatch.length > 0) {
        for (let i = 0; i < totalBatch.length; i++) {
          if (totalBatch[i].attemptAssignBatchToPorter > 5 && !totalBatch[i].driPorter ||
            totalBatch[i].attemptAssignBatchToOps > 5 && !totalBatch[i].opsPorter) {
            pendingBatch.push(totalBatch[i]);
          }
        }
      }
      batchCount = pendingBatch.length;
      this.setState({ batchPendingCount: batchCount });
    }
  }

  pendingBatchView = () => {
    browserHistory.push('/home/admin/batch/pending');
  }

  render() {
    const { batchPendingCount } = this.state;
    let loggedUserName;
    if (this.onlineUser) {
      loggedUserName = loadState().name;
    } else {
      loggedUserName = 'Not Logged';
    }
    const { activeItem } = this.state;
    return (
      <Menu
        pointing
        secondary
        size="massive"
        className="menu-header custom-header"
      >
        <Menu.Item
          name="Overview"
          widths={10}
          style={{ alignSelf: 'center', marginRight: '65px' }}
        >
          <div className="dashboardLogo" />
        </Menu.Item>
        {this.state.showAll ?
          <Menu
            pointing
            secondary
            size="massive"
            className="menu-header border-transparent"
          >
            <Menu.Item name="Admin" className="menu-header-list" active={activeItem === 'Admin'} onClick={(e) => { this.handleItemClick(e, 'Admin'); }} />
            {/* <Menu.Item name='Remote Check-in' className="menu-header-list" active={activeItem === 'Remote'} onClick={(e) => { this.handleItemClick(e, 'Remote') }} /> */}
            {/* <Menu.Item name="Hotel Check-in" className="menu-header-list" active={activeItem === 'Hotel'} onClick={(e) => { this.handleItemClick(e, 'Hotel'); }} /> */}
          </Menu>
          : null}
        {this.state.showOnlyHotel ?
          <Menu
            pointing
            secondary
            size="massive"
            className="menu-header border-transparent"
          >
            <Menu.Item name="Hotel Check-in" className="menu-header-list" active={activeItem === 'Hotel'} onClick={(e) => { this.handleItemClick(e, 'Hotel'); }} />
          </Menu>
          : null}

        {/* {this.state.showOnlyRemote ? <Menu
                    pointing
                    secondary
                    size="massive"
                    className="menu-header border-transparent"
                >
                    <Menu.Item name='Remote Check-in' className="menu-header-list" active={activeItem === 'Remote'} onClick={(e) => { this.handleItemClick(e, 'Remote') }} />
                </Menu> : null} */}

        <Menu.Item />

        <Menu.Item
          // position="right"
          style={{ paddingBottom: 0, marginRight: 30, cursor: 'pointer' }}
          onClick={this.pendingBatchView}
        >
          <MenuItem
            onClick={this.pendingBatchView}
            style={{ backgroundColor: 'none' }}
          >
            <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
              <path fill={batchPendingCount > 0 ? '#ff0000' : '#00FF00'} d="M10,21C10,22.11 10.9,23 12,23A2,2 0 0,0 14,21M18.88,16.82V11C18.88,7.75 16.63,5.03 13.59,4.31V3.59A1.59,1.59 0 0,0 12,2A1.59,1.59 0 0,0 10.41,3.59V4.31C7.37,5.03 5.12,7.75 5.12,11V16.82L3,18.94V20H21V18.94M16,13H13V16H11V13H8V11H11V8H13V11H16" />
            </svg>
            {batchPendingCount > 0 ? <span style={{
              position: 'absolute', top: '-6px', left: '56px', color: 'red',
            }}
            >Alert: {batchPendingCount} {batchPendingCount > 1 ? 'batches' : 'batch'}  awaiting to be assigned
                                     </span> : ''}

          </MenuItem>


        </Menu.Item>


        <Menu.Item
          position="right"
          style={{ paddingBottom: 0, marginRight: 30, cursor: 'pointer' }}
          onClick={this.handleClick}
        >
          <div style={{ display: 'flex', fontWeight: 'bold' }}>
            <div className="account" > <img alt="profile" height="42px" width="42px" src={(this.onlineUser && this.onlineUser.profileImage) ? this.onlineUser.profileImage : imageUrl} /> </div>
            <div style={{ height: 'fit-content', marginTop: 10 }}>
              <div style={{ fontSize: 10 }}>Logged in as</div>
              <div>{loggedUserName}</div>
            </div>
          </div>
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            onRequestClose={this.handleRequestClose}
          >
            <MenuItem primaryText="Profile" onClick={() => { this.setState({ open: false }); this.props.profile(); }} />
            <MenuItem primaryText="Logout" onClick={this.props.logout} />

          </Popover>
        </Menu.Item>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    batch: state.CommonReducer.batch,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CommonActions: bindActionCreators(CommonActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);
