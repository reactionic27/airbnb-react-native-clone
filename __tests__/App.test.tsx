import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import App from '../App';
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

describe('App', () => {
  describe('rendering', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
      wrapper = shallow(<App />);
    });

    it('should render a <ApolloProvider />', () => {
      expect(wrapper.find(ApolloProvider)).toHaveLength(1);
    });
  });
});
