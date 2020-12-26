import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type TextProps = {
  color: string;
};

export function SquareMeterText({color}: TextProps) {
  return (
    <View>
      <View style={styles.wrapper}>
        <View style={styles.unitView}>
          <Text style={[styles.unitText, {color}]}>m</Text>
        </View>
        <View style={styles.squareView}>
          <Text style={[styles.squareText, {color}]}>2</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  unitView: {
    alignItems: 'flex-end',
  },
  unitText: {
    fontSize: 15,
    fontFamily: 'Raleway-Medium',
  },
  squareView: {
    alignItems: 'flex-start',
  },
  squareText: {
    fontSize: 10,
    fontFamily: 'Raleway-Medium',
  },
});
