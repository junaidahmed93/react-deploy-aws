import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router';
import { store } from '../../store';
import * as actions from '../../actions/DriporterActions';
import * as CommonImageActions from '../../actions/CommonImageActions';
import GlobalStyle from '../../utils/Styles';

class ImageViewerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      bookingId: 0,
      refId: 0,
    };
  }


  componentDidMount() {
    const images = store.getState().CommonImageReducer.images;
    const bookingId = Number(this.props.routeParams.id);
    setTimeout(() => {
      this.setState({ bookingId, images });
    }, 1000);
  }

    getReferenceId = () => {
      const allBookings = store.getState().bookingReducer.bookings;

      let ref;
      allBookings.forEach((element) => {
        if (element.id === this.state.bookingId) {
          ref = element.referenceId;
        }
      });
      return ref;
    }

    render() {
      let images;
      if (this.state.images && this.state.images.length) {
        images = this.state.images.map(v => (
          // <Paper style={{ display: 'inline' }}>
          <Col md={3}>
            <img alt="Idri" src={v.dataURL} style={{ padding: '10px', height: '400px' }} />
            <div style={{ marginLeft: '40px' }}>{v.imagesName.referenceId}</div>
          </Col>

          // </Paper>
        ));
      } else {
        return (
          'Loading...'
        );
      }


      return (

        <div id="vehicleContainer">

          <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
            <h2 className="paper-title ">Booking Id: <Link to={`/home/admin/bookings/${this.state.bookingId}`}>{this.getReferenceId(this.state.bookingId)}</Link></h2>
            <br />
            <Divider className="paper-divider" />
            <Grid>
              <Row>
                {images}
              </Row>
            </Grid>

          </Paper>


        </div >

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

export default connect(mapStateToProps, mapDispatchToProps)(ImageViewerContainer);
