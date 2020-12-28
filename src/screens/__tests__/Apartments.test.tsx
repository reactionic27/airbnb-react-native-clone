import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {MockedProvider} from '@apollo/client/testing';

import {ApartmentsScreen} from '../Apartments';
import {GET_APARTMENTS_QUERY} from '../../graphql';

const mocks = [
  {
    request: {
      query: GET_APARTMENTS_QUERY,
      variables: {
        offset: 0,
        limit: 12,
        priceGte: 25000,
        priceLte: 500000,
        pricePerSqmGte: 1000,
        pricePerSqmLte: 5000,
        sqmGte: 80,
        sqmLte: 150,
        numberOfBedroom: 3,
        numberOfBathroom: 2,
      },
    },
  },
];

export const withApollo = (children: any) => (
  <MockedProvider mocks={mocks}>{children}</MockedProvider>
);

describe('ApartmentsScreen', () => {
  describe('rendering', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
      wrapper = shallow(withApollo(<ApartmentsScreen />));
    });

    it('should render a <ApartmentsScreen />', () => {
      expect(wrapper.find(ApartmentsScreen)).toHaveLength(1);
    });
  });
});
