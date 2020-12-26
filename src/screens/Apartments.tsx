import React, {useEffect, useState} from 'react';
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

import {SquareMeterText} from '../components/SquareMeterText';
import {GET_APARTMENTS_QUERY} from '../graphql';
import {defaultFilterOption} from '../constants';
import {ApartmentType} from '../types';

export function ApartmentsScreen() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filterOptions, setFilterOptions] = useState(defaultFilterOption);
  const [buildings, setBuildings] = useState<ApartmentType[]>([]);

  const {data, loading, error, fetchMore} = useQuery(GET_APARTMENTS_QUERY, {
    variables: {
      offset: 0,
      limit: 12,
      priceGte: filterOptions.price.startVal,
      priceLte: filterOptions.price.endVal,
      pricePerSqmGte: filterOptions.pricePerSqm.startVal,
      pricePerSqmLte: filterOptions.pricePerSqm.endVal,
      sqmGte: filterOptions.sqm.startVal,
      sqmLte: filterOptions.sqm.endVal,
      numberOfBedroom: filterOptions.numberOfBedrooms.value,
      numberOfBathroom: filterOptions.numberOfBathrooms.value,
    },
  });

  useEffect(() => {
    if (data && !loading) {
      const {allApartments: apartments} = data;
      setBuildings(apartments);
    }
  }, [data, loading, fetchMore]);

  // const handleFilterOptions = (options: any) => {
  //   setFilterOptions(options);
  // };

  if (error) {
    return <Text>Could not load data from data source.</Text>;
  }

  return (
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
                <View style={styles.flexView}>
                  <Text style={styles.sqmText}>{item.pricePerSqm} €/</Text>
                  <SquareMeterText color={'black'} />
                </View>
              </View>
            </ImageBackground>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.infoView}>
                <View style={styles.itemView}>
                  <Ionicons name="md-bed-outline" size={15} color="gray" />
                  <Text style={styles.infoText}>
                    {item.numberOfBedrooms} habs.
                  </Text>
                </View>
                <View style={styles.itemCenterView}>
                  <MaterialCommunityIcons
                    name="shower"
                    size={15}
                    color="gray"
                  />
                  <Text style={styles.infoText}>
                    {item.numberOfBathrooms} baño
                  </Text>
                </View>
                <View style={styles.itemRightView}>
                  <MaterialCommunityIcons
                    name="square-off-outline"
                    size={15}
                    color="gray"
                  />
                  <Text style={styles.infoText}>{item.sqm}</Text>
                  <Text>&nbsp;</Text>
                  <SquareMeterText color={'gray'} />
                </View>
              </View>
            </View>
          </View>
        )}
        onEndReachedThreshold={0.9}
        onEndReached={() => {
          const currentLength = data.allApartments.length;
          fetchMore({
            variables: {
              offset: currentLength,
              limit: 12,
            },
            updateQuery: (prev: any, {fetchMoreResult}: any) => {
              if (!fetchMoreResult) {
                return prev;
              }
              return Object.assign({}, prev, {
                allApartments: [
                  ...prev.allApartments,
                  ...fetchMoreResult.allApartments,
                ],
              });
            },
          });
        }}
      />
    </SafeAreaView>
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
  flexView: {
    flexDirection: 'row',
  },
});
