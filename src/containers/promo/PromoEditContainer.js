import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import LeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import { store } from '../../store';
import GlobalStyle from '../../utils/Styles';
import { formsValidation } from '../../utils/Helpers';
import EditPromo from '../../components/promo/EditPromo';
import * as actions from '../../actions/PromoActions';
import * as customerActions from '../../actions/CustomerActions';
import Converters from '../../utils/Converters';
import { nextBookings, previousBookings, startRecord, endRecord, totalRecords } from '../../utils/Pagination';

class PromoEditContainer extends Component {
  constructor(props) {
    super(props);
    this.promoDto = {};
    this.state = {
      editablePromo: {},
      promoList: [],
      shownRecords: [],
      storedRecords: [],
      currentRowCount: 10,
      startSearch: false,
      errorText: '',
      errorClass: '',
      showErrorTemplate: false,
      showOnlyPercentage: false,
      showCustomerList: false,
      show: true,
      editMode: true,
      notification: '',
      title: '',
      errorTextTitle: '',
      setFullHeader: false,
    };
    this.selectedAll = false;
    this.searchedRecords = [];
    this.startingNextCount = 0;
    this.selectedCustomer = [];
    this.autoCustomerPopup = false;
  }


  componentDidMount() {
    let editablePromo;
    const promoList = store.getState().PromoReducer.promoList;
    const paramId = Number(this.props.routeParams.id);
    promoList.forEach((element) => {
      if (element.id === paramId) {
        editablePromo = element;
      }
    });
    this.setState({ editablePromo });
  }

  setValue = (key, value) => {
    this.promoDto[key] = value;
    if (this.promoDto.discountType === 'Percentage') {
      this.setState({ showOnlyPercentage: true });
    }
    if (this.promoDto.discountType === 'Fixed') {
      this.setState({ showOnlyPercentage: false });
    }
    if (this.promoDto.promoCity === 'Dubai') {
      this.promoDto[key] = ['3'];
    }
    if (this.promoDto.promoCity === 'Bahrain') {
      this.promoDto[key] = ['4'];
    }
    if (this.promoDto.promoCity === 'All') {
      this.promoDto[key] = ['3', '4'];
    }
  };

  chooseCustomerType = (key, value) => {
    this.promoDto[key] = value;
    if (this.promoDto.type == 'Customer specific') {
      this.setState({ showCustomerList: true });
    } else {
      this.setState({ showCustomerList: false });
    }
  }

  onStatusChange = () => {
    const { editablePromo } = this.state;
    let status = 'ACTIVE_STATUS';
    if (editablePromo.status === 'ACTIVE_STATUS') {
      status = 'INACTIVE_STATUS';
    }
    const promoUpt = {
      id: editablePromo.id,
      status,
    };
    this.props.actions.changePromoStatus(promoUpt);
  }

  onArchive = () => {
    const { editablePromo } = this.state;
    const promoUpt = {
      id: editablePromo.id,
      status: 'ARCHIVE_STATUS',
    };
    this.props.actions.changePromoStatus(promoUpt);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.notificationSent && nextProps.notificationSent === true) {
      this.selectedCustomer = [];
      this.setState({ notification: '', title: '', shownRecords: this.state.shownRecords.slice(0, this.state.currentRowCount) });
      this.props.actions.resetStatus();
    }
    if (nextProps && nextProps.promoStatusChange && nextProps.promoStatusChange === true) {
      browserHistory.push('/home/admin/promo');
    }
    if (nextProps && nextProps.customers) {
      this.setState({
        shownRecords: nextProps.customers,
        storedRecords: nextProps.customers,
      });
      setTimeout(() => {
        this.setState({
          shownRecords: this.state.shownRecords.slice(0, this.state.currentRowCount),
        });
      }, 10);
    }
  }

  onEdit = () => {
    this.setState({ editMode: false });
  }

  onUpdate = () => {
    this.setState({ editMode: true });
  }

  onSearchChanged = (object, value) => {
    this.searchedRecords = [];
    if (value === '') {
      this.setState({ shownRecords: this.state.storedRecords.slice(0, 10), startSearch: false });
      this.searchedRecords = [];
    } else {
      this.state.storedRecords.forEach((item) => {
        if (item.name.toLowerCase().search(value.toLowerCase()) !== -1) {
          this.searchedRecords.push(item);
        }
      });
      if (this.searchedRecords.length === 0) {
        this.setState({ setFullHeader: true });
      } else {
        this.setState({ setFullHeader: false });
      }
      this.startingNextCount = 0;
      this.setState({ shownRecords: this.searchedRecords, startSearch: true });
    }
  }

  handleCellClick = (cellClicked) => {
    this.state.shownRecords.forEach((v, i) => {
      if (cellClicked === i) {
        for (let k = 0; k < this.selectedCustomer.length; k++) {
          if (this.selectedCustomer[k].id === v.id) {
            this.selectedCustomer.splice(k, 1);
          }
        }
      }
    });
    this.setState({ show: false });
  }

  selectedRow = (selectedNo) => {
    if (selectedNo === 'all') {
      this.selectedAll = true;
      this.selectedCustomer = this.state.storedRecords.slice();
    } else if (selectedNo === 'none') {
      this.selectedAll = false;
      this.selectedCustomer = [];
    } else {
      this.selectedAll = false;
      this.state.shownRecords.forEach((v, i) => {
        for (let j = 0; j < selectedNo.length; j++) {
          if (i === selectedNo[j]) {
            if (this.selectedCustomer.find(o => o.id === v.id)) {

            } else {
              this.selectedCustomer.push(v);
            }
          }
        }
      });
    }

    this.setState({ show: false });
  }

  submit = () => {
    const updatePromot = Object.assign({}, this.state.editablePromo, this.promoDto);
    const fieldResult = formsValidation(updatePromot, 'EditPromo');
    this.autoCustomerPopup = false;
    if (fieldResult.warning === false) {
      const type = Converters.getPromoType(updatePromot.type);
      updatePromot.type = type;

      const customerIds = [];

      if (updatePromot.discountType === 'Fixed') {
        if (updatePromot.maximumDiscount > updatePromot.discount) {
          this.props.actions.updatePromoCode(updatePromot, customerIds);
        } else {
          this.setState({
            showErrorTemplate: true,
            errorText: 'Max discount should be greater than discount',
            errorClass: 'alert alert-danger',
          });
        }
      } else {
        this.props.actions.updatePromoCode(updatePromot, customerIds);
      }
    } else {
      this.setState({
        editablePromo: updatePromot,
        showErrorTemplate: true,
        errorText: fieldResult.template,
        errorClass: 'alert alert-danger',
      });
    }
  }

  nextButton = () => {
    const nextRecords = nextBookings(this.state, this.startingNextCount);
    if (nextRecords) {
      this.startingNextCount = nextRecords;
      this.setState({ shownRecords: this.state.storedRecords.slice(nextRecords, nextRecords + 10) });
    }
  }

  previousButton = () => {
    const previousRecords = previousBookings(this.state, this.startingNextCount);
    if (!(previousRecords < 0)) {
      this.startingNextCount = previousRecords;
      this.setState({ shownRecords: this.state.storedRecords.slice(previousRecords, previousRecords + 10) });
    }
  }

  assignCustomer = () => {
    this.setState({ showCustomerList: false });
  }

  cancelAssign = () => {
    this.setState({ showCustomerList: false });
  }

  errorTemplateClose = () => {
    if (this.autoCustomerPopup) {
      this.setState({ showErrorTemplate: false, showCustomerList: true });
    } else {
      this.setState({ showErrorTemplate: false });
    }
  }

  render() {
    const { editablePromo, editMode } = this.state;
    const rows = this.state.shownRecords.map(data => (
      <TableRow style={GlobalStyle.tableRowSpacing} key={data.id} selected={this.selectedCustomer.find(o => o.id === data.id)} className="table-row-style">
        {/* <TableRowColumn data-uid={data.id}>{data.dropoffDate}</TableRowColumn>
                    <TableRowColumn data-uid={data.id}>02:20Pm</TableRowColumn> */}
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.id}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.name}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.email}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.country}</TableRowColumn>
      </TableRow>

    ));
    const actionsButton = [
      <FlatButton
        label="Ok"
        primary
        keyboardFocused
        onClick={() => { this.errorTemplateClose(); }}
      />,
    ];

    const customerDialogeActions = [
      <FlatButton
        label="Cancel"
        primary
        keyboardFocused
        onClick={() => { this.cancelAssign(); }}
      />,
      <FlatButton
        label="Assign"
        primary
        keyboardFocused
        onClick={() => { this.assignCustomer(); }}
      />,
    ];

    const titleContainer = [
      <Grid fluid className="container-no-padding">
        <Row between="xs">
          <Col xs={6} style={GlobalStyle.containerHeader}>
            <h2 className="paper-title " style={{ paddingLeft: '20px' }}>Select Customer</h2>
          </Col>
          <Col xs={6}>
            <div style={{ float: 'right' }}>
              <TextField
                className="search-text-field"
                hintText="Customer Name"
                floatingLabelText="Search"
                onChange={this.onSearchChanged}
              />

            </div>

          </Col>
        </Row>
      </Grid>,
    ];
    const {
      showOnlyPercentage, showCustomerList, setFullHeader,
    } = this.state;
    return (
      <div id="vehicleContainer">
        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <Grid fluid className="container-no-padding">
            <Row between="xs">
              <Col xs={6} style={GlobalStyle.containerHeader}>
                <h2 className="paper-title">View Promo Details</h2>
              </Col>
              <Col xs={6}>
                {/* <div style={{ float: 'right' }}>
                    <TextField
                      className="search-text-field"
                      hintText="Customer Name"
                      floatingLabelText="Search"
                      onChange={this.onSearchChanged}
                    />
                    <Link to="/home/admin/promo/add">
                      <FlatButton label="Create Promo" className="add-button-on-header float-right" />
                    </Link>
                  </div> */}

              </Col>
            </Row>
          </Grid>
          <Divider className="paper-divider m-top-bottom-07em bold-hr" />
          <EditPromo editablePromo={editablePromo} setValue={this.setValue} chooseCustomerType={this.chooseCustomerType} showOnlyPercentage={showOnlyPercentage} editMode={editMode} />


          <div style={{ clear: 'both' }} />
        </Paper>
        <Grid fluid style={GlobalStyle.containerHeader}>
          <Row>
            <Col xsOffset={8} md={4}>

              <div>
                {editablePromo.status === 'ACTIVE_STATUS' ?
                  <FlatButton label="DEACTIVATE" onClick={this.onStatusChange} className="deactive-staff-button float-right" /> :
                  <FlatButton label="ACTIVATE" onClick={this.onStatusChange} className="active-staff-button float-right" />}

                {editMode ?
                  <FlatButton label="Edit" onClick={this.onEdit} className="add-button float-right" />
                  : <FlatButton label="Update" onClick={this.submit} disabled={this.state.buttonDisable} className="add-button float-right" />
                }

                <FlatButton label="ARCHIVE" onClick={this.onArchive} className="add-button float-right" />

              </div>
              {/* {editablePromo.status === "ACTIVE_STATUS" ? <FlatButton label="INACTIVE" onClick={this.onStatusChange} className="deactive-staff-button float-right" /> :
                                <FlatButton label="ACTIVE" onClick={this.onStatusChange} className="active-staff-button float-right" />
                            }
                            {editMode ?
                                <FlatButton label="Edit" onClick={this.onEdit} className="add-button float-right" />
                                : <FlatButton label="Update" onClick={this.onUpdate} disabled={this.state.buttonDisable} className="add-button float-right" />
                            }
                            <FlatButton label="ARCHIVE" onClick={this.onArchive} className="add-button float-right" /> */}
            </Col>
          </Row>
        </Grid>
        <Dialog
          title="Required"
          actions={actionsButton}
          modal={false}
          open={this.state.showErrorTemplate}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <div className={this.state.errorClass} dangerouslySetInnerHTML={{ __html: this.state.errorText }} />
        </Dialog>

        <Dialog
          title={titleContainer}
          actions={customerDialogeActions}
          modal={false}
          open={showCustomerList}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
            <Table fixedHeader={setFullHeader} selectable onCellClick={this.handleCellClick} multiSelectable onRowSelection={this.selectedRow}>
              <TableHeader style={GlobalStyle.tableHeaderSpacing} displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
                <TableRow style={GlobalStyle.tableHeaderSpacing} className="table-header-style">
                  <TableHeaderColumn style={GlobalStyle.tableRowCell}>Id</TableHeaderColumn>
                  <TableHeaderColumn style={GlobalStyle.tableRowCell}>Name</TableHeaderColumn>
                  <TableHeaderColumn style={GlobalStyle.tableRowCell}>Email</TableHeaderColumn>
                  <TableHeaderColumn style={GlobalStyle.tableRowCell}>Country</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={this.state.showCheckboxes} deselectOnClickaway={false}>
                {rows}
              </TableBody>
            </Table>
            <div className="flex-container-pagination-notification Pagination">
              <div className="pagination-child pagination-child-count">
                <span style={GlobalStyle.tablePageCount}>
                  {startRecord(this.state, this.startingNextCount)} - {endRecord(this.state, this.startingNextCount)} of {totalRecords(this.state)}
                </span>
              </div>
              <div className="pagination-child">
                <div className="pagination-left-button"><LeftArrow style={GlobalStyle.paginationButtons} onClick={this.previousButton} /></div>
              </div>
              <div className="pagination-child">
                <div className="pagination-right-button"><RightArrow style={GlobalStyle.paginationButtons} onClick={this.nextButton} /></div>
              </div>
            </div>
          </Paper>
        </Dialog>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    customers: state.CustomerReducer.customers,
    promoStatusChange: state.PromoReducer.promoStatusChange,
    notificationSent: state.CustomerReducer.notificationSent,
  };
}

function mapDispatchToProps(dispatch) {
  dispatch(actions.changePromoStatusSuccessAfter());
  return {
    actions: bindActionCreators(actions, dispatch),
    customerActions: bindActionCreators(customerActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PromoEditContainer);
