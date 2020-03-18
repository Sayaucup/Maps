import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE
} from 'react-native-maps'; 
import Geolocation from '@react-native-community/geolocation';

console.disableYellowBox = true;

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
        let initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
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
          provider={PROVIDER_GOOGLE}></MapView>
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
