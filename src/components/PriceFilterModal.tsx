import React, {ReactText, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

type ModalProps = {
  visible: boolean;
  setVisible: (args: boolean) => void;
};

export function PriceFilterModal({visible, setVisible}: ModalProps) {
  const [minPrice, setMinPrice] = useState<ReactText>('undefined');
  const [maxPrice, setMaxPrice] = useState<ReactText>('undefined');
  const [minUnitPrice, setMinUnitPrice] = useState<ReactText>('undefined');
  const [maxUnitPrice, setMaxUnitPrice] = useState<ReactText>('undefined');

  return (
    <Modal
      isVisible={visible}
      backdropOpacity={1}
      backdropColor="#FFFFFF"
      animationIn="fadeIn">
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={styles.closeWrapper}>
          <Ionicons name="close" size={30} />
        </TouchableOpacity>
        <View style={styles.wrapper}>
          <Text style={styles.headerText}>Precio</Text>
          <View style={styles.flexView}>
            <View style={styles.halfView}>
              <Text style={styles.itemText}>Minimo</Text>
              <Picker
                selectedValue={minPrice}
                style={styles.picker}
                mode={'dialog'}
                onValueChange={(itemValue) => setMinPrice(itemValue)}>
                <Picker.Item label="Sin Minimo" value="undefined" />
                <Picker.Item label="25.000 €" value="25000" />
                <Picker.Item label="50.000 €" value="50000" />
                <Picker.Item label="75.000 €" value="75000" />
              </Picker>
            </View>
            <View style={styles.halfView}>
              <Text style={styles.itemText}>Maximo</Text>
              <Picker
                selectedValue={maxPrice}
                style={styles.picker}
                mode={'dialog'}
                onValueChange={(itemValue) => setMaxPrice(itemValue)}>
                <Picker.Item label="Sin Minimo" value="undefined" />
                <Picker.Item label="25.000 €" value="25000" />
                <Picker.Item label="50.000 €" value="50000" />
                <Picker.Item label="75.000 €" value="75000" />
              </Picker>
            </View>
          </View>
        </View>
        <View style={styles.downWrapper}>
          <Text style={styles.headerText}>Precio por metro cuadrado</Text>
          <View style={styles.flexView}>
            <View style={styles.halfView}>
              <Text style={styles.itemText}>Minimo (€/m²)</Text>
              <Picker
                selectedValue={minUnitPrice}
                style={styles.picker}
                mode={'dialog'}
                onValueChange={(itemValue) => setMinUnitPrice(itemValue)}>
                <Picker.Item label="Sin Minimo" value="undefined" />
                <Picker.Item label="500 €" value="500" />
                <Picker.Item label="1.000 €" value="1000" />
                <Picker.Item label="1.500 €" value="1500" />
                <Picker.Item label="2.000 €" value="2000" />
                <Picker.Item label="2.500 €" value="2500" />
                <Picker.Item label="3.000 €" value="3000" />
                <Picker.Item label="3.500 €" value="3500" />
              </Picker>
            </View>
            <View style={styles.halfView}>
              <Text style={styles.itemText}>Maximo (€/m²)</Text>
              <Picker
                selectedValue={maxUnitPrice}
                style={styles.picker}
                mode={'dialog'}
                onValueChange={(itemValue) => setMaxUnitPrice(itemValue)}>
                <Picker.Item label="Sin Minimo" value="undefined" />
                <Picker.Item label="500 €" value="500" />
                <Picker.Item label="1.000 €" value="1000" />
                <Picker.Item label="1.500 €" value="1500" />
                <Picker.Item label="2.000 €" value="2000" />
                <Picker.Item label="2.500 €" value="2500" />
                <Picker.Item label="3.000 €" value="3000" />
                <Picker.Item label="3.500 €" value="3500" />
              </Picker>
            </View>
          </View>
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setVisible(false)}>
            <Text style={styles.filterText}>Aplicar y filtar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeWrapper: {
    position: 'absolute',
    right: 0,
    top: 40,
  },
  wrapper: {
    marginTop: 50,
  },
  downWrapper: {
    marginTop: 200,
  },
  headerText: {
    fontSize: 25,
    fontFamily: 'Raleway-Black',
  },
  flexView: {
    flexDirection: 'row',
    marginTop: 20,
  },
  halfView: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 20,
    fontFamily: 'Raleway-Medium',
  },
  bottomView: {
    width: '100%',
    position: 'absolute',
    bottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBtn: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#484848',
    borderRadius: 3,
  },
  filterText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontFamily: 'Raleway-Black',
  },
  picker: {
    width: 180,
    height: 40,
  },
});
