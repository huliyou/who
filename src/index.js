import React from 'react';
import { render } from 'react-dom';

const rootElement = document.getElementById('app');

// Sync dispatched route actions to the history
import Text from '../Libraries/Text/Text.web';
import StyleSheet from '../Libraries/StyleSheet/StyleSheet.web';
import View from '../Libraries/View/View.web';

var styles = StyleSheet.create({
  color: 'red',
});

render(
  <View>
    <Text
      style={styles}
      numberOfLines={2}
      onClick={() => {
        console.log('click');
      }}
      onPress={() => {
        console.log('press');
      }}
    >
      Text
    </Text>
  </View>,
  rootElement
);
