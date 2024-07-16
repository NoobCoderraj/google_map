import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const initialLocation = {
  latitude: 19.076090,
  longitude: 72.877426,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const RetailerMap = () => {
  const [retailers, setRetailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRetailers, setFilteredRetailers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchRetailers = async () => {
      try {
        const response = await fetch('https://dummyjson.com/c/11bc-5170-452d-a492');
        const data = await response.json();
        console.log('Fetched Retailers:', data); // Log fetched data for debugging
        if (data && data.retailers) {
          setRetailers(data.retailers);
          setFilteredRetailers(data.retailers); // Initially set filtered retailers to all retailers
        } else {
          setRetailers([]);
          setFilteredRetailers([]);
        }
      } catch (error) {
        console.error('Error fetching retailers:', error);
        setRetailers([]);
        setFilteredRetailers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRetailers();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredRetailers(retailers); // Show all retailers if search term is empty
    } else {
      const filtered = retailers.filter(retailer =>
        retailer.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
      setFilteredRetailers(filtered);
    }
    // Reset selected marker when searching
    setSelectedMarker(null);
    // Move map to initial location after search
    if (mapRef.current) {
      mapRef.current.animateToRegion(initialLocation, 1000);
    }
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    // Move map to selected marker's location
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: marker.location.lat,
        longitude: marker.location.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Retailer"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialLocation}
          showsCompass={false} // Hide compass
          showsScale={false} // Hide scale
          showsTraffic={false} // Hide traffic layer
          showsBuildings={false} // Hide buildings
          showsIndoors={false} // Hide indoor maps
          zoomControlEnabled={false} // Hide zoom controls
        >
          {filteredRetailers.map((retailer) => (
            <Marker
              key={retailer.id}
              coordinate={{
                latitude: retailer.location.lat,
                longitude: retailer.location.lng,
              }}
              title={retailer.name}
              description={retailer.address}
              onPress={() => handleMarkerPress(retailer)}
            />
          ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    zIndex: 1, // Ensure search bar is above map
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default RetailerMap;
