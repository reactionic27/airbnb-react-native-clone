import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useQuery} from '@apollo/client';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GET_APARTMENTS_QUERY} from '../graphql';
import {defaultFilterOption} from '../constants';
import {ApartmentType} from '../types';
import {numberWithCommas} from '../utils';
import {Header} from '../components/Header';
import {PriceFilterModal} from '../components/PriceFilterModal';

export function ApartmentsScreen({navigation}: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filterOptions, setFilterOptions] = useState(defaultFilterOption);
  const [buildings, setBuildings] = useState<ApartmentType[]>([]);
  const [priceFilterModalVisible, setPriceFilterModalVisible] = useState(false);

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
    if (data && !loading && fetchMore) {
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
      <Header {...navigation} />
      <View style={styles.filterWrapper}>
        <ScrollView
          horizontal
          removeClippedSubviews
          contentContainerStyle={styles.scrollView}
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.filterItemView}
            onPress={() => setPriceFilterModalVisible(true)}>
            <Text style={styles.filterText}>Precio</Text>
            <Ionicons
              name="caret-down-sharp"
              size={15}
              style={styles.downIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterItemView}>
            <Text style={styles.filterText}>Tipo de Vivienda</Text>
            <Ionicons
              name="caret-down-sharp"
              size={15}
              style={styles.downIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterItemView}>
            <Text style={styles.filterText}>#de habitacion</Text>
            <Ionicons
              name="caret-down-sharp"
              size={15}
              style={styles.downIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterItemView}>
            <Text style={styles.filterText}>Mas filtros</Text>
            <Ionicons
              name="caret-down-sharp"
              size={15}
              style={styles.downIcon}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
      <FlatList
        data={loading ? [] : buildings || []}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <ImageBackground
              source={{uri: item.picture}}
              style={styles.photoBG}
              imageStyle={styles.photo}>
              <View style={styles.priceView}>
                <Text style={styles.price}>
                  {numberWithCommas(item.price)} €
                </Text>
                <View style={styles.flexView}>
                  <Text style={styles.sqmText}>
                    {numberWithCommas(item.pricePerSqm)} €/m²
                  </Text>
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
                  <Text style={styles.infoText}>{item.sqm} m²</Text>
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
      <PriceFilterModal
        visible={priceFilterModalVisible}
        setVisible={setPriceFilterModalVisible}
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
    marginVertical: 10,
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
    fontFamily: 'Raleway-Black',
  },
  sqmText: {
    fontSize: 15,
    fontFamily: 'Raleway-Medium',
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
    fontFamily: 'Raleway-Medium',
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
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: 'Raleway-Black',
  },
  flexView: {
    flexDirection: 'row',
  },
  filterWrapper: {
    marginVertical: 20,
  },
  scrollView: {
    marginLeft: 20,
  },
  filterItemView: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 3,
    paddingLeft: 15,
    paddingRight: 5,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    flexDirection: 'row',
  },
  filterText: {
    fontSize: 15,
    fontFamily: 'Raleway-Regular',
  },
  downIcon: {
    marginLeft: 5,
  },
});
