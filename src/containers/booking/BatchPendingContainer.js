import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { store } from '../../store';
import * as actions from '../../actions/DriporterActions';
import BatchPending from '../../components/booking/BatchPending';
import GlobalStyle from '../../utils/Styles';

class BatchPendingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shownRecords: [],
      storedRecords: [],
      selectedDriporter: {},
      currentRowCount: 10,
      startSearch: false,
      pendingbatch: [],
    };
    this.searchedRecords = [];
    this.startingNextCount = 0;
    this.pendingStatusInterval = '';
  }

  componentDidMount() {
    this.getRefreshBatch();
    this.pendingStatusInterval = setInterval(() => {
      this.getRefreshBatch();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.pendingStatusInterval);
  }

  getRefreshBatch() {
    const pendingbatch = [];
    if (store.getState() && store.getState().CommonReducer && store.getState().CommonReducer.batch && store.getState().CommonReducer.batch.data) {
      const totalBatches = store.getState().CommonReducer.batch.data;
      if (totalBatches && totalBatches.length > 0) {
        totalBatches.forEach((element) => {
          if (element.attemptAssignBatchToPorter > 5 && !element.driPorter ||
            element.attemptAssignBatchToOps > 5 && !element.opsPorter) {
            pendingbatch.push(element);
          }
        });
      }
      this.setState({ pendingbatch });
    }
  }

  componentWillReceiveProps() {
    const pendingbatch = [];
    if (store.getState() && store.getState().CommonReducer && store.getState().CommonReducer.batch && store.getState().CommonReducer.batch.data) {
      const totalBatches = store.getState().CommonReducer.batch.data;
      totalBatches.forEach((element) => {
        if (element.attemptAssignBatchToPorter > 5 && !element.driPorter ||
          element.attemptAssignBatchToOps > 5 && !element.opsPorter) {
          pendingbatch.push(element);
        }
      });
      // this.sorting(pendingbatch);
      this.setState({ pendingbatch });
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
    let totalBatches;
    const { pendingbatch } = this.state;
    if (pendingbatch && pendingbatch.length > 0) {
      totalBatches = pendingbatch.map((element) => {
        if (element.bookingList && element.bookingList.length > 0) {
          return (
            <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
              Batch Id: {element.id}
              <BatchPending batch={element.bookingList} />
            </Paper>
          );
        }
      });
    } else {
      totalBatches = 'No Unassigned Batch in the system';
    }
    return (
      <div id="vehicleContainer">

        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <Grid fluid className="container-no-padding">
            <Row between="xs">
              <Col xs={6} style={GlobalStyle.containerHeader}>
                <h2 className="paper-title ">Unassigned Batch List</h2>
              </Col>

            </Row>
          </Grid>
        </Paper>
        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          {totalBatches}
        </Paper>
      </div>

    );
  }
}


function mapStateToProps(state) {
  return {
    driporterList: state.DriporterReducer.driporterList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BatchPendingContainer);
