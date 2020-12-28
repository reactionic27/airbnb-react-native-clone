import React from 'react';
import Modal from 'react-native-modal';
import {shallow, ShallowWrapper} from 'enzyme';

import {PriceFilterModal} from '../PriceFilterModal';

const testProps = {
  visible: true,
  setVisible: jest.fn,
  filterOptions: [],
  handleFilterOptions: jest.fn,
};

describe('Header', () => {
  describe('rendering', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
      wrapper = shallow(<PriceFilterModal {...testProps} />);
    });

    it('should render a <Modal />', () => {
      expect(wrapper.find(Modal)).toHaveLength(1);
    });
  });
});
