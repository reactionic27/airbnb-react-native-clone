import React from 'react';
import {StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

type ModalProps = {
  visible: boolean;
  setVisible: (args: boolean) => void;
};

export function PriceFilterModal({visible, setVisible}: ModalProps) {
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
});
