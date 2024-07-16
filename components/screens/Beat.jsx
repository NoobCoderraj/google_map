import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Text, ActivityIndicator , TouchableOpacity } from 'react-native';
import { MaterialIcons, Feather, FontAwesome, Foundation, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../Color'; // Adjust the path as per your file structure
import { fetchRetailers } from '../Api'; // Adjust the path as per your file structure

const Beat = () => {
  const [retailers, setRetailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    const getRetailers = async () => {
      try {
        const data = await fetchRetailers();
        setRetailers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getRetailers();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  return (
    <View style={styles.container}>

<View style={styles.upperPanel}>
        <MaterialIcons name="more" size={28} color={colors.primary} />
        <TouchableOpacity onPress={() => navigation.navigate('RetailerMap')}>
          <Feather name="map-pin" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {retailers.map((retailer) => (
        <View key={retailer.id} style={styles.cart}>
          <Image
            source={{ uri: retailer.photo }}
            style={{ height: 140, width: 120, borderRadius: 10 }}
          />
          <View style={{ flex: 1, marginLeft: 20 }}>
            <View style={styles.details}>
              <Text style={styles.title}>{retailer.name}</Text>
              <View style={styles.icons}>
                <FontAwesome name="pencil" size={24} color={colors.primary} style={styles.icon} />
                <Feather name="phone" size={22} color={colors.primary} style={styles.icon} />
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoColumn}><Text style={styles.textUpper}>Last Visit Date</Text><Text>{retailer.lastVisitDate}</Text></View>
              <View style={styles.infoColumn}><Text style={styles.textUpper}>Last Order Date</Text><Text>{retailer.lastOrderDate}</Text></View>
              <View style={styles.infoColumn}><Text style={styles.textUpper}>Order Value</Text><Text>${retailer.lastOrderValue}</Text></View>
            </View>

            <View style={styles.iconRow}>
              <View style={styles.box}>
                <Foundation name="indent-more" size={24} color={colors.white} style={{ marginLeft: 6 }} />
              </View>
              <View style={styles.box}>
                <Foundation name="page-add" size={24} color={colors.white} style={{ marginLeft: 6 }} />
              </View>
              <View style={styles.box}>
                <Foundation name="lightbulb" size={24} color={colors.white} style={{ marginLeft: 6 }} />
              </View>
              <View style={styles.box}>
                <FontAwesome5 name="warehouse" size={16} color={colors.white} style={{ marginLeft: 6 }} />
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  upperPanel: {
    marginTop: 20,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.background,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  cart: {
    marginTop: 30,
    flexDirection: 'row',
    backgroundColor: "#f9f0f0",
    borderRadius: 3,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    textTransform: 'capitalize',
    fontSize: 19,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    marginLeft: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoColumn: {
    flex: 1,
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  textUpper: {
    fontWeight: 'bold',
  },
  box: {
    backgroundColor: colors.primary,
    height: 30,
    width: 30,
    justifyContent: 'center',
    borderRadius: 6,
  },
});

export default Beat;
