/**
 * Created by leiyouwho on 6/7/16.
 */

import ShallowCompare from 'react-addons-shallow-compare';

export default (target) => {
  target.shouldComponentUpdate = (nextProps, nextState) => {
    return ShallowCompare(target, nextProps, nextState);
  };
};
