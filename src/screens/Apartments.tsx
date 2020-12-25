import React, {Fragment} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {useQuery} from '@apollo/client';

import {GET_APARTMENTS_QUERY} from '../graphql';

export function ApartmentsScreen() {
  const {data, loading} = useQuery(GET_APARTMENTS_QUERY, {
    variables: {
      filter: {sqmLte: 108, numberOfBedroom: 1},
      limit: 10,
      offset: 2,
    },
  });
  console.log('data', data);
  console.log('loading', loading);

  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <Text>Main Page</Text>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
