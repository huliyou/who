/**
 * Created by leiyouwho on 6/7/16.
 */

// React Native Code
// create(obj: {[key: string]: any}): {[key: string]: number} {
//   var result = {};
//   for (var key in obj) {
//     StyleSheetValidation.validateStyle(key, obj);
//     result[key] = ReactNativePropRegistry.register(obj[key]);
//   }
//   return result;
// }

class StyleSheet {
  static create(styles) {
    return styles;
  }
}

export default StyleSheet;


// var StyleSheet = {
//   create: function(styles) {
//     return styles;
//   },
//   extendCreateElement: function(React, nativeComponents) {
//     extendCreateElement(React, function(style) {
//       if (!inited) {
//         inited = true;
//         setDefaultStyle({
//           reference: reference.getWidth(),
//           rootClassName: ROOT_CLASS_NAME,
//           viewClassName: VIEW_CLASS_NAME,
//         });
//       }
//
//       return flattenStyle(style, extendProperties);
//     }, nativeComponents);
//   },
//   setReferenceWidth: reference.setWidth,
//   rootClassName: ROOT_CLASS_NAME,
//   viewClassName: VIEW_CLASS_NAME,
// };
//
// module.exports = StyleSheet;