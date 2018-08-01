/* global google */
import React from 'react';
import _ from 'lodash';
import { compose, withProps, lifecycle, withStateHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import driInActiveImage from '../../assets/images/ic_vehicle.svg';
import driActiveImage from '../../assets/images/ic_vehicleActive.svg';
import customerInActiveImage from '../../assets/images/ic_customer.svg';
import customerActiveImage from '../../assets/images/luggage-map.svg';
import statusMapping from '../../utils/StatusMapping';

const DriporterMap = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCObVgS0QEFVLXSUwCNKpB8NuLmyKeWqc4&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        bounds: null,
        center: {
          lat: 25.068492, lng: 55.232519,
        },
        markers: [],
        onMapMounted: (ref) => {
          refs.map = ref;
        },
        onBoundsChanged: _.debounce(
          () => {
            if (refs && refs.map) {
              this.setState({
                bounds: refs.map.getBounds(),
                center: refs.map.getCenter(),
              });
            }
          },
          100,
          { maxWait: 500 },
        ),
        onSearchBoxMounted: (ref) => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();
          places.forEach((place) => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
        },
      });
    },
  }),
  withStateHandlers(() => ({
    isOpen: false,
    id: 0,
  }), {
    onToggleOpen: ({ isOpen }) => index => ({
      isOpen: !isOpen,
      id: index,
    }),
  }),
  withScriptjs,
  withGoogleMap,
)(props =>

  (
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={10}
      center={props.center}
      onBoundsChanged={props.onBoundsChanged}
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Customer's Near landmark"
          style={{
            boxSizing: 'border-box',
            border: '1px solid transparent',
            width: '240px',
            height: '32px',
            marginTop: '27px',
            padding: '0 12px',
            borderRadius: '3px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            fontSize: '14px',
            outline: 'none',
            textOverflow: 'ellipses',
          }}
        />
      </SearchBox>
      {props && props.driporterLocations ? props.driporterLocations.map((data, index) => (
        <Marker
          position={data}
          onClick={() => props.onToggleOpen(data.userId)}
          icon={data.status === 'offline' ? driInActiveImage : driActiveImage}
        >
          {props.id === data.userId ? (
            props.isOpen &&
            <InfoBox
              onCloseClick={props.onToggleOpen}
              options={{ closeBoxURL: '', enableEventPropagation: true }}
            >
              <div style={{ backgroundColor: '#C0ECAE', opacity: 0.75, padding: '12px' }}>
                <div style={{ fontSize: '16px', fontColor: '#08233B' }}>
                  {data.name} <br />
                  {statusMapping(data.status)}

                </div>
              </div>
            </InfoBox>
          ) : null}

        </Marker>
      )) : null}


      {props && props.bookings ? props.bookings.map((data, index) => {
        if (data.status === 'pending') {
          const position = {
            lat: data.requestedPickupLatitude,
            lng: data.requestedPickupLongitude,
          };
          return (
            <Marker
              position={position}
              onClick={() => { props.onToggleOpen(data.bookingId); }}
              icon={customerActiveImage}
            >
              {props.id === data.bookingId ? (
                props.isOpen &&
                <InfoBox
                  onCloseClick={props.onToggleOpen}
                  options={{ closeBoxURL: '', enableEventPropagation: true }}
                >
                  <div
                    onClick={() => {
                      let path = window.location.href;
                      path = path.substr(0, path.indexOf('home'));
                      path = `${path}home/admin/bookings/${data.bookingId}`;
                      window.open(path);
                    }}
                    style={{ backgroundColor: '#C0ECAE', opacity: 0.75, padding: '12px' }}
                  >
                    <div style={{ fontSize: '16px', fontColor: '#08233B' }}>
                      {data.name} <br />
                      {statusMapping(data.status)}

                    </div>
                  </div>
                </InfoBox>
              ) : null}

            </Marker>
          );
        }
      }) : null}
    </GoogleMap>
  ));

export default DriporterMap;
