import React, {Fragment} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

export function Apartments() {
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
