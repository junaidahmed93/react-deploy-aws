import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { store } from '../../store';
import * as actions from '../../actions/DriporterActions';
import DriporterBatchView from '../../components/driporter/DriporterBatchView';
import GlobalStyle from '../../utils/Styles';

class DriporterJobContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shownRecords: [],
      storedRecords: [],
      selectedDriporter: {},
      currentRowCount: 10,
      startSearch: false,
    };
    this.searchedRecords = [];
    this.startingNextCount = 0;
  }

  componentDidMount() {
    let selectedDriporter;
    const paramId = Number(this.props.routeParams.id);
    const driporterList = store.getState().DriporterReducer.driporterList;
    driporterList.forEach((element) => {
      if (element.id === paramId) {
        selectedDriporter = element;
      }
    });
    this.setState({ selectedDriporter });
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
  }


  render() {
    return (
      <div id="vehicleContainer">

        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <Grid fluid className="container-no-padding">
            <Row between="xs">
              <Col xs={6} style={GlobalStyle.containerHeader}>
                {/* <h2 className="paper-title ">Driporter Batch details : {this.state.selectedDriporter.assignedBatchNumber}</h2> */}
                <h2 className="paper-title ">Driporter Batch details</h2>
              </Col>

            </Row>
          </Grid>
        </Paper>
        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <DriporterBatchView selectedDriporter={this.state.selectedDriporter} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DriporterJobContainer);
