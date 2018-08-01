import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { store } from '../../store';
import * as actions from '../../actions/DriporterActions';
import * as CommonImageActions from '../../actions/CommonImageActions';
import OpsporterBatchView from '../../components/opsporter/OpsporterBatchView';
import GlobalStyle from '../../utils/Styles';

class OpsporterJobContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shownRecords: [],
      storedRecords: [],
      selectedOpsporter: {},
      currentRowCount: 10,
      startSearch: false,
    };
    this.searchedRecords = [];
    this.startingNextCount = 0;
  }


  componentDidMount() {
    this.selectedOpsporter = {};
    const paramId = Number(this.props.routeParams.id);
    const opsporterList = store.getState().opsporterReducer.opsporterList;
    opsporterList.forEach((element) => {
      if (element.id === paramId) {
        this.selectedOpsporter = element;
      }
    });

    this.setState({ selectedOpsporter: this.selectedOpsporter });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      shownRecords: nextProps.driporterList,
      storedRecords: nextProps.driporterList,
    });
    setTimeout(() => {
      this.setState({
        shownRecords: this.state.shownRecords.slice(0, this.state.currentRowCount),
      });
    }, 10);

    if (nextProps && nextProps.images && nextProps.images.length) {
      const id = this.selectedBooking.id;
      browserHistory.push(`/home/admin/images/${id}`);
    }
  }

  viewImages = (data) => {
    this.selectedBooking = data;
    this.props.CommonImageActions.getCommonImages(data);
  }

  render() {
    let totalBatches;
    if (this.selectedOpsporter && this.selectedOpsporter.bookingBatchDtoList) {
      totalBatches = this.selectedOpsporter.bookingBatchDtoList.map(data => (
        <OpsporterBatchView batch={data.bookingList} viewImages={this.viewImages} />
      ));
    } else {
      totalBatches = '<h3>No data found/h3>';
    }


    return (
      <div id="vehicleContainer">

        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <Grid fluid className="container-no-padding">
            <Row between="xs">
              <Col md={6} style={GlobalStyle.containerHeader}>
                <h2 className="paper-title ">Opsporter Batch details : {this.state.selectedOpsporter.assignedBatchNumber}</h2>
              </Col>

            </Row>
          </Grid>
        </Paper>
        {
          (this.selectedOpsporter && this.selectedOpsporter.bookingBatchDtoList && this.selectedOpsporter.bookingBatchDtoList.length > 0) ?
            <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>

              {totalBatches}
            </Paper > :
            <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>No Active Batch</Paper>
        }

      </div>

    );
  }
}


function mapStateToProps(state) {
  return {
    driporterList: state.DriporterReducer.driporterList,
    images: state.CommonImageReducer.images,
  };
}

function mapDispatchToProps(dispatch) {
  // dispatch(CommonImageActions.getImageFail());
  return {
    actions: bindActionCreators(actions, dispatch),
    CommonImageActions: bindActionCreators(CommonImageActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OpsporterJobContainer);
