import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  ImageBackground,
} from 'react-native';
import {useQuery} from '@apollo/client';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {GET_APARTMENTS_QUERY} from '../graphql';

type ApartmentType = {
  id: string;
  title: string;
  price: number;
  pricePerSqm: number;
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

  const fetchMore = useCallback(() => console.log('fetch more.....'), []);

  console.log('buildings', buildings);

  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={buildings}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={styles.listItem}>
              <ImageBackground
                source={{uri: item.picture}}
                style={styles.photoBG}
                imageStyle={styles.photo}>
                <View style={styles.priceView}>
                  <Text style={styles.price}>{item.price} €</Text>
                  <Text style={styles.sqmText}>{item.pricePerSqm} €/m2</Text>
                </View>
              </ImageBackground>
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.infoView}>
                  <View style={styles.itemView}>
                    <Ionicons name="md-bed-outline" size={20} color="gray" />
                    <Text style={styles.infoText}>
                      {item.numberOfBedrooms} bedrooms
                    </Text>
                  </View>
                  <View style={styles.itemCenterView}>
                    <MaterialCommunityIcons
                      name="shower"
                      size={20}
                      color="gray"
                    />
                    <Text style={styles.infoText}>
                      {item.numberOfBathrooms} bathrooms
                    </Text>
                  </View>
                  <View style={styles.itemRightView}>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  name: {
    fontSize: 18,
    marginLeft: 20,
  },
  photoBG: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  photo: {
    borderRadius: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sqmText: {
    fontSize: 15,
    fontWeight: '400',
  },
  infoView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  itemView: {
    width: '33%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemCenterView: {
    width: '33%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemRightView: {
    width: '33%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  infoText: {
    fontSize: 15,
    color: 'gray',
    marginLeft: 5,
  },
  priceView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    marginTop: 10,
  },
});
