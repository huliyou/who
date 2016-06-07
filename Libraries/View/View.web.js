/**
 * Created by leiyouwho on 6/7/16.
 */

import React, { PropTypes } from 'react';
import PureComponent from '../../util/decorators/PureComponent';

@PureComponent
class View extends React.Component {
  static propTypes = {
    testID: PropTypes.string,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
  };
  render() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    );
  }
}
export default View;