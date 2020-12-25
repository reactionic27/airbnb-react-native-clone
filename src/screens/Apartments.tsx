import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
} from 'react-native';
import {useQuery} from '@apollo/client';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {GET_APARTMENTS_QUERY} from '../graphql';

type ApartmentType = {
  id: string;
  price: number;
  sqm: number;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  picture: string;
};

export function ApartmentsScreen() {
  const [buildings, setBuildings] = useState<ApartmentType[]>([]);

  const {data, loading} = useQuery(GET_APARTMENTS_QUERY, {
    variables: {
      filter: {sqmLte: 108, numberOfBedroom: 1},
      limit: 10,
      offset: 2,
    },
  });

  useEffect(() => {
    if (data && !loading) {
      const {allApartments: apartments} = data;
      setBuildings(apartments);
    }
  }, [data, loading]);

  const fetchMore = useCallback(() => console.log('fetchmore.....'), []);

  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={buildings}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={styles.listItem}>
              <Image source={{uri: item.picture}} style={styles.photo} />
              <View>
                <Text style={styles.price}>{item.price}€</Text>
                <View style={styles.infoView}>
                  <View style={styles.itemView}>
                    <Ionicons name="md-bed-outline" size={20} color="gray" />
                    <Text style={styles.infoText}>
                      {item.numberOfBedrooms} bedrooms
                    </Text>
                  </View>
                  <View style={styles.itemView}>
                    <MaterialCommunityIcons
                      name="shower"
                      size={20}
                      color="gray"
                    />
                    <Text style={styles.infoText}>
                      {item.numberOfBathrooms} bathrooms
                    </Text>
                  </View>
                  <View style={styles.itemView}>
                    <MaterialCommunityIcons
                      name="square-off-outline"
                      size={20}
                      color="gray"
                    />
                    <Text style={styles.infoText}>{item.sqm} m2</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          onEndReachedThreshold={0.9}
          onEndReached={fetchMore}
        />
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listItem: {
    padding: 20,
  },
  name: {
    fontSize: 18,
    marginLeft: 20,
  },
  photo: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoView: {
    flexDirection: 'row',
  },
  itemView: {
    width: '33%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 15,
    color: 'gray',
  },
});
