import React from 'react';
import {Text} from 'react-native';
import {Provider} from 'react-redux';

import configureStore from './src/redux/store';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Text>Main Page</Text>
    </Provider>
  );
};

export default App;
