import React from 'react';
import { render } from 'react-dom';

const rootElement = document.getElementById('app');

// Sync dispatched route actions to the history
import Text from '../Libraries/Text/Text.web';

render(
  <Text
    numberOfLines={2}
  >
    Text
  </Text>,
  rootElement
);
