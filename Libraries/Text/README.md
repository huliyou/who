# Text

## props


accessible

numberOfLines number

Used to truncate the text with an ellipsis after computing the text layout, including line wrapping, such that the total number of lines does not exceed this number.

onLayout function

Invoked on mount and layout changes with

{nativeEvent: {layout: {x, y, width, height}}}

onLongPress function

This function is called on long press.

onPress function

This function is called on press.

style style

View#style...
color color
fontFamily string
fontSize number
fontStyle enum('normal', 'italic')
fontWeight enum('normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900')
Specifies font weight. The values 'normal' and 'bold' are supported for most fonts. Not all fonts have a variant for each of the numeric values, in that case the closest one is chosen.


lineHeight number
textAlign enum('auto', 'left', 'right', 'center', 'justify')
Specifies text alignment. The value 'justify' is only supported on iOS and fallbacks to left on Android.


textDecorationLine enum('none', 'underline', 'line-through', 'underline line-through')
textShadowColor color
textShadowOffset {width: number, height: number}
textShadowRadius number
androidtextAlignVertical enum('auto', 'top', 'bottom', 'center')
iosletterSpacing number
iostextDecorationColor color
iostextDecorationStyle enum('solid', 'double', 'dotted', 'dashed')
ioswritingDirection enum('auto', 'ltr', 'rtl')
testID string

Used to locate this view in end-to-end tests.

iosallowFontScaling bool

Specifies should fonts scale to respect Text Size accessibility setting on iOS.

iossuppressHighlighting bool

When true, no visual change is made when text is pressed down. By default, a gray oval highlights the text on press down.