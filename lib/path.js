/*
 * path.js: Functions for nesting into Objects.
 *
 * (C) 2013, Charlie Robbins.
 *
 */

//
// ### function path (obj, path, value)
// ### @obj {Object} Object to insert value into
// ### @path {Array} List of nested keys to insert value at
// Retreives a value from given Object, `obj`, located at the
// nested keys, `path`.
//
var path = module.exports = function (obj, path) {
  var key, i;

  for (i in path) {
    if (typeof obj === 'undefined') {
      return undefined;
    }

    key = path[i];
    obj = obj[key];
  }

  return obj;
};

//
// ### function createPath (obj, path, value)
// ### @obj {Object} Object to insert value into
// ### @path {Array} List of nested keys to insert value at
// ### @value {*} Value to insert into the object.
// Inserts the `value` into the given Object, `obj`, creating
// any keys in `path` along the way if necessary.
//
path.create = function (obj, path, value) {
  var key, i;

  for (i in path) {
    key = path[i];
    if (!obj[key]) {
      obj[key] = ((+i + 1 === path.length) ? value : {});
    }

    obj = obj[key];
  }
};