/**
 * Created by leiyouwho on 5/29/16.
 */

import React, { PropTypes } from 'react';
import Touchable from '../Touchable/Touchable';


@Touchable
class Text extends React.Component {
  static propTypes = {
    /**
     * Used to truncate the text with an elipsis after computing the text
     * layout, including line wrapping, such that the total number of lines
     * does not exceed this number.
     */
    numberOfLines: React.PropTypes.number,
    /**
     * Invoked on mount and layout changes with
     *
     *   `{nativeEvent: {layout: {x, y, width, height}}}`
     */
    onLayout: React.PropTypes.func,
    /**
     * This function is called on press.
     */
    onPress: React.PropTypes.func,
    /**
     * When true, no visual change is made when text is pressed down. By
     * default, a gray oval highlights the text on press down.
     * @platform ios
     */
    suppressHighlighting: React.PropTypes.bool,
    /**
     * Used to locate this view in end-to-end tests.
     */
    testID: React.PropTypes.string,
    /**
     * Specifies should fonts scale to respect Text Size accessibility setting on iOS.
     */
    allowFontScaling: React.PropTypes.bool,
  };

  props = {
    allowFontScaling: true,
  };

  state = {
    ...this.touchableGetInitialState(),
    ...{
      isHighlighted: false,
    },
  };

  static contextTypes = {
    isInAParentText: React.PropTypes.bool
  }

  static childContextTypes = {
    isInAParentText: React.PropTypes.bool
  }

  onStartShouldSetResponder(): bool {
    const shouldSetFromProps = this.props.onStartShouldSetResponder &&
      this.props.onStartShouldSetResponder();
    return shouldSetFromProps || !!this.props.onPress;
  }

  /*
   * Returns true to allow responder termination
   */
  handleResponderTerminationRequest(): bool {
    // Allow touchable or props.onResponderTerminationRequest to deny
    // the request
    let allowTermination = this.touchableHandleResponderTerminationRequest();
    if (allowTermination && this.props.onResponderTerminationRequest) {
      allowTermination = this.props.onResponderTerminationRequest();
    }
    return allowTermination;
  }

  handleResponderGrant(e: SyntheticEvent, dispatchID: string) {
    this.touchableHandleResponderGrant(e, dispatchID);
    this.props.onResponderGrant &&
    this.props.onResponderGrant.apply(this, arguments);
  }

  handleResponderMove(e: SyntheticEvent) {
    this.touchableHandleResponderMove(e);
    this.props.onResponderMove &&
    this.props.onResponderMove.apply(this, arguments);
  }

  handleResponderRelease(e: SyntheticEvent) {
    this.touchableHandleResponderRelease(e);
    this.props.onResponderRelease &&
    this.props.onResponderRelease.apply(this, arguments);
  }

  handleResponderTerminate(e: SyntheticEvent) {
    this.touchableHandleResponderTerminate(e);
    this.props.onResponderTerminate &&
    this.props.onResponderTerminate.apply(this, arguments);
  }

  touchableHandleActivePressIn() {
    if (this.props.suppressHighlighting || !this.props.onPress) {
      return;
    }
    this.setState({
      isHighlighted: true,
    });
  }

  touchableHandleActivePressOut() {
    if (this.props.suppressHighlighting || !this.props.onPress) {
      return;
    }
    this.setState({
      isHighlighted: false,
    });
  }

  touchableHandlePress() {
    this.props.onPress && this.props.onPress();
  }

  touchableGetPressRectOffset(): RectOffset {
    return PRESS_RECT_OFFSET;
  }

  getChildContext(): Object {
    return {
      isInAParentText: true
    };
  }

  render() {
    console.warn(this.state);
    const props = { ...this.props };
    // Text is accessible by default
    if (props.accessible !== false) {
      props.accessible = true;
    }
    props.isHighlighted = this.state.isHighlighted;
    props.onStartShouldSetResponder = this.onStartShouldSetResponder;
    props.onResponderTerminationRequest =
      this.handleResponderTerminationRequest;
    props.onResponderGrant = this.handleResponderGrant;
    props.onResponderMove = this.handleResponderMove;
    props.onResponderRelease = this.handleResponderRelease;
    props.onResponderTerminate = this.handleResponderTerminate;

    let {
      numberOfLines,
      style
    } = props;

    style = {...props.style};

    if (typeof style.lineHeight == 'number') {
      style.lineHeight += 'px';
    }

    // Default lineHeight is 1.2 x fontSize
    let lineHeight = style.lineHeight || (style.fontSize || 16) * 1.2; // FIXME:  not sure 16px is the default line height
    if (typeof lineHeight == 'number') {
      lineHeight += 'px';
    }
    style.lineHeight = lineHeight;

    if (style.textDecorationLine) {
      style.textDecoration = style.textDecorationLine;
    }

    if (!props.children) {
      // TODO set a linebreak
    }
    return (
      <span {...props}
        style={{
          ...{
            display: this.context.isInAParentText ? 'inline' : 'inline-block',
            margin: 0,
            padding: 0,
            wordWrap: 'break-word',
            fontFamily: 'Helvetica Neue, STHeiTi, sans-serif'
          },
          ...style,
          ...(numberOfLines && {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            wordWrap: 'break-word',
            display: '-webkit-box',
            WebkitLineClamp: numberOfLines,
            WebkitBoxOrient: 'vertical',
            maxHeight: parseFloat(lineHeight) * numberOfLines,
          }),
        }}
      />
    );
  }
}

type RectOffset = {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

var PRESS_RECT_OFFSET = {top: 20, left: 20, right: 20, bottom: 30};

Text.isReactNativeComponent = true;

export default Text;
