import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

const initialLocation = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const SimpleMap = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialLocation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});

export default SimpleMap;
