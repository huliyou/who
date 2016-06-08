/**
 * Created by leiyouwho on 6/7/16.
 */

import React, { PropTypes } from 'react';
import View from '../View/View.web';
import PureComponent from '../../util/decorators/PureComponent';
import ReactDOM from 'react-dom';

let typeMap = {
  'default': 'text',
  'ascii-capable': 'text',
  'numbers-and-punctuation': 'number',
  'url': 'url',
  'number-pad': 'number',
  'phone-pad': 'tel',
  'name-phone-pad': 'text',
  'email-address': 'email',
  'decimal-pad': 'number',
  'twitter': 'text',
  'web-search': 'search',
  'numeric': 'number'
};

@PureComponent
class TextInput extends React.Component {
  static propTypes = {
    ...View.propTypes,
    /**
     * Can tell TextInput to automatically capitalize certain characters.
     *
     * - characters: all characters,
     * - words: first letter of each word
     * - sentences: first letter of each sentence (default)
     * - none: don't auto capitalize anything
     */
    autoCapitalize: PropTypes.oneOf([
      'none',
      'sentences',
      'words',
      'characters',
    ]),
    /**
     * If false, disables auto-correct. The default value is true.
     */
    autoCorrect: PropTypes.bool,
    /**
     * If true, focuses the input on componentDidMount.
     * The default value is false.
     */
    autoFocus: PropTypes.bool,
    /**
     * If false, text is not editable. The default value is true.
     */
    editable: PropTypes.bool,
    /**
     * Determines which keyboard to open, e.g.`numeric`.
     *
     * The following values work across platforms:
     *
     * - default
     * - numeric
     * - email-address
     */
    keyboardType: PropTypes.oneOf([
      // Cross-platform
      'default',
      'email-address',
      'numeric',
      'phone-pad',
      // iOS-only
      'ascii-capable',
      'numbers-and-punctuation',
      'url',
      'number-pad',
      'name-phone-pad',
      'decimal-pad',
      'twitter',
      'web-search',
    ]),
    /**
     * Determines the color of the keyboard.
     * @platform ios
     */
    keyboardAppearance: PropTypes.oneOf([
      'default',
      'light',
      'dark',
    ]),
    /**
     * Determines how the return key should look. On Android you can also use
     * `returnKeyLabel`.
     *
     * The following values work across platforms:
     *
     * - done
     * - go
     * - next
     * - search
     * - send
     *
     * The following values work on Android only:
     *
     * - none
     * - previous
     *
     * The following values work on iOS only:
     *
     * - default
     * - emergency-call
     * - google
     * - join
     * - route
     * - yahoo
     */
    returnKeyType: PropTypes.oneOf([
      // Cross-platform
      'done',
      'go',
      'next',
      'search',
      'send',
      // Android-only
      'none',
      'previous',
      // iOS-only
      'default',
      'emergency-call',
      'google',
      'join',
      'route',
      'yahoo',
    ]),
    /**
     * Sets the return key to the label. Use it instead of `returnKeyType`.
     * @platform android
     */
    returnKeyLabel: PropTypes.string,
    /**
     * Limits the maximum number of characters that can be entered. Use this
     * instead of implementing the logic in JS to avoid flicker.
     */
    maxLength: PropTypes.number,
    /**
     * Sets the number of lines for a TextInput. Use it with multiline set to
     * true to be able to fill the lines.
     * @platform android
     */
    numberOfLines: PropTypes.number,
    /**
     * If true, the keyboard disables the return key when there is no text and
     * automatically enables it when there is text. The default value is false.
     * @platform ios
     */
    enablesReturnKeyAutomatically: PropTypes.bool,
    /**
     * If true, the text input can be multiple lines.
     * The default value is false.
     */
    multiline: PropTypes.bool,
    /**
     * Callback that is called when the text input is blurred
     */
    onBlur: PropTypes.func,
    /**
     * Callback that is called when the text input is focused
     */
    onFocus: PropTypes.func,
    /**
     * Callback that is called when the text input's text changes.
     */
    onChange: PropTypes.func,
    /**
     * Callback that is called when the text input's text changes.
     * Changed text is passed as an argument to the callback handler.
     */
    onChangeText: PropTypes.func,
    /**
     * Callback that is called when text input ends.
     */
    onEndEditing: PropTypes.func,
    /**
     * Callback that is called when the text input selection is changed
     */
    onSelectionChange: PropTypes.func,
    /**
     * Callback that is called when the text input's submit button is pressed.
     * Invalid if multiline={true} is specified.
     */
    onSubmitEditing: PropTypes.func,
    /**
     * Callback that is called when a key is pressed.
     * Pressed key value is passed as an argument to the callback handler.
     * Fires before onChange callbacks.
     * @platform ios
     */
    onKeyPress: PropTypes.func,
    /**
     * Invoked on mount and layout changes with `{x, y, width, height}`.
     */
    onLayout: PropTypes.func,
    /**
     * The string that will be rendered before text input has been entered
     */
    placeholder: PropTypes.string,
    /**
     * The text color of the placeholder string
     */
    placeholderTextColor: PropTypes.string,
    /**
     * If true, the text input obscures the text entered so that sensitive text
     * like passwords stay secure. The default value is false.
     */
    secureTextEntry: PropTypes.bool,
    /**
     * The highlight (and cursor on ios) color of the text input
     */
    selectionColor: PropTypes.string,
    /**
     * See DocumentSelectionState.js, some state that is responsible for
     * maintaining selection information for a document
     * @platform ios
     */
    // selectionState: PropTypes.instanceOf(DocumentSelectionState),
    /**
     * The value to show for the text input. TextInput is a controlled
     * component, which means the native value will be forced to match this
     * value prop if provided. For most uses this works great, but in some
     * cases this may cause flickering - one common cause is preventing edits
     * by keeping value the same. In addition to simply setting the same value,
     * either set `editable={false}`, or set/update `maxLength` to prevent
     * unwanted edits without flicker.
     */
    value: PropTypes.string,
    /**
     * Provides an initial value that will change when the user starts typing.
     * Useful for simple use-cases where you don't want to deal with listening
     * to events and updating the value prop to keep the controlled state in sync.
     */
    defaultValue: PropTypes.string,
    /**
     * When the clear button should appear on the right side of the text view
     * @platform ios
     */
    clearButtonMode: PropTypes.oneOf([
      'never',
      'while-editing',
      'unless-editing',
      'always',
    ]),
    /**
     * If true, clears the text field automatically when editing begins
     * @platform ios
     */
    clearTextOnFocus: PropTypes.bool,
    /**
     * If true, all text will automatically be selected on focus
     */
    selectTextOnFocus: PropTypes.bool,
    /**
     * If true, the text field will blur when submitted.
     * The default value is true for single-line fields and false for
     * multiline fields. Note that for multiline fields, setting blurOnSubmit
     * to true means that pressing return will blur the field and trigger the
     * onSubmitEditing event instead of inserting a newline into the field.
     */
    blurOnSubmit: PropTypes.bool,
    /**
     * Styles
     */
    // style: Text.propTypes.style,
    /**
     * The color of the textInput underline.
     * @platform android
     */
    underlineColorAndroid: PropTypes.string,
  };
  static defaultProps = {
    editable: true,
    multiline: false,
    secureTextEntry: false,
    keyboardType: 'default',
    autoFocus: false,
  };

  _onBlur(e) {
    const { onBlur } = this.props;
    if (onBlur) {
      e.nativeEvent.text = e.target.value;
      onBlur(e);
    }
  }

  _onChange(e) {
    const { onChange, onChangeText } = this.props;
    if (onChangeText) onChangeText(e.target.value);
    if (onChange) {
      e.nativeEvent.text = e.target.value;
      onChange(e);
    }
  }

  _onFocus(e) {
    const { clearTextOnFocus, onFocus, selectTextOnFocus } = this.props;
    const node = ReactDOM.findDOMNode(this);
    if (clearTextOnFocus) node.value = '';
    if (selectTextOnFocus) node.select();
    if (onFocus) {
      e.nativeEvent.text = e.target.value;
      onFocus(e);
    }
  }

  _onSelectionChange(e) {
    const { onSelectionChange } = this.props;

    if (onSelectionChange) {
      const { selectionDirection, selectionEnd, selectionStart } = e.target;
      e.nativeEvent.text = e.target.value;
      const event = {
        selectionDirection,
        selectionEnd,
        selectionStart,
        nativeEvent: e.nativeEvent
      };
      onSelectionChange(event);
    }
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      if (this.props.autoFocus) {
        ReactDOM.findDOMNode(this.refs.input).focus();
      }
    }
  }

  render() {
    const {
      accessibilityLabel,
      autoComplete,
      autoFocus,
      defaultValue,
      editable,
      keyboardType,
      maxLength,
      maxNumberOfLines,
      multiline,
      numberOfLines,
      onBlur,
      onChange,
      onKeyDown,
      onKeyUp,
      onKeyPress,
      onChangeText,
      onSelectionChange,
      placeholder,
      password,
      secureTextEntry,
      style,
      testID,
      value
    } = this.props
    
    const propsCommon = {
      ref: 'input',
      'aria-label': accessibilityLabel,
      autoComplete: autoComplete && 'on',
      autoFocus,
      defaultValue,
      maxLength,
      onBlur: onBlur && this._onBlur,
      onChange: (onChange || onChangeText) && this._onChange,
      onFocus: this._onFocus,
      onSelect: onSelectionChange && this._onSelectionChange,
      placeholder,
      readOnly: !editable,
      style: {
        ...styles.initial,
        ...style
      },
      testID,
      value,
      onKeyDown,
      onKeyUp,
      onKeyPress,
    };
    let input;
    if (multiline) {
      const propsMultiline = {
        ...propsCommon,
        maxRows: maxNumberOfLines || numberOfLines,
        minRows: numberOfLines
      };

      input = <textarea {...propsMultiline} />;

    } else {

      let type = typeMap[keyboardType];

      if (password || secureTextEntry) {
        type = 'password';
      }

      const propsSingleline = {
        ...propsCommon,
        type
      };

      input = <input {...propsSingleline} />;
    }

    if (this.props.children) {
      return (
        <View>
          {input}
          {this.props.children}
        </View>
      );
    } else {
      return input;
    }
  }
}

const styles = {
  initial: {
    appearance: 'none',
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderWidth: 0,
    boxSizing: 'border-box',
    color: 'inherit',
    font: 'inherit',
    padding: 0,
    height: 30, // default height
  }
};


export default TextInput;
