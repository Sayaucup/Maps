import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker,Polygon} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';

console.disableYellowBox = true;

const coordinates = [
  {
    latitude: -7.9964468,
    longitude: 110.2953939,
  },
  {
    latitude: -7.978077,
    longitude: 110.316476,
  },
];
const GOOGLE_MAPS_APIKEY = 'AIzaSyBs0MBQVuA7QeWRQFWy3RRaIVrkCeWOcZA';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.locateCurrentPosition();
  }
  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(JSON.stringify(position));
        const {latitude, longitude} = position.coords;

        let initialPosition = {
          latitude,
          longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        };
        this.setState({initialPosition});
      },
      error => {
        console.log(error.code, error.message);
      },
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          ref={map => (this._map = map)}
          initialRegion={this.state.initialPosition}
          provider={PROVIDER_GOOGLE}>
          <MapViewDirections
            origin={coordinates[0]}
            destination={coordinates[1]}
            waypoints={coordinates}
            region="en"
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="red"
          />
          {/* <Polygon
            coordinates={coordinates}/> */}
          <Marker coordinate={coordinates[0]} title="qew" />
          <Marker coordinate={coordinates[1]} title="das" />
        </MapView>
      </View>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
