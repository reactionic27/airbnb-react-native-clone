import React from 'react';
import Modal from 'react-native-modal';
import {shallow, ShallowWrapper} from 'enzyme';
import {RoomFilterModal} from '../RoomFilterModal';

const testProps = {
  visible: true,
  setVisible: jest.fn,
  filterOptions: [],
  handleFilterOptions: jest.fn,
};

describe('RoomFilterModal', () => {
  describe('rendering', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
      wrapper = shallow(<RoomFilterModal {...testProps} />);
    });

    it('should render a <Modal />', () => {
      expect(wrapper.find(Modal)).toHaveLength(1);
    });
  });
});
