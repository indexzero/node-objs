/*
 * clone.js: Object cloning.
 *
 * (C) 2013, Charlie Robbins.
 *
 */

//
// ### function clone (object, filter)
// #### @object {Object} Object to clone
// #### @filter {Function} Filter to be used
// Shallow clones the specified object.
//
module.exports = function (object, filter) {
  return Object.keys(object).reduce(filter ? function (obj, k) {
    if (filter(k)) obj[k] = object[k];
    return obj;
  } : function (obj, k) {
    obj[k] = object[k];
    return obj;
  }, {});
};
