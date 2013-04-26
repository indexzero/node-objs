/*
 * index.js: Top-level include for the node-objs module.
 *
 * (C) 2013, Charlie Robbins.
 *
 */

//
// ### @merge {Object}
// Various Object merging algorithms. 
//
exports.merge = require('./merge');
exports.mixin = exports.merge.shallow;

//
// ### @path {function}
// Functions for nesting into Objects.
//
exports.path = require('./path');

//
// ### @clone {function}
// Clones a given Object with an optional
// filter function.
//
exports.clone = require('./clone');

//
// ### function filter (object, test)
// #### @obj {Object} Object to iterate over
// #### @pred {function} Predicate applied to each property. `function (value, key, object)`
// Returns an object with properties from `obj` which satisfy
// the predicate `pred`
//
exports.filter = function (obj, pred) {
  var copy;
  if (Array.isArray(obj)) {
    copy = [];
    utile.each(obj, function (val, key) {
      if (pred(val, key, obj)) {
        copy.push(val);
      }
    });
  }
  else {
    copy = {};
    utile.each(obj, function (val, key) {
      if (pred(val, key, obj)) {
        copy[key] = val;
      }
    });
  }
  return copy;
};

//
// ### function each (obj, iterator)
// #### @obj {Object} Object to iterate over
// #### @iterator {function} Continuation to use on each key. `function (value, key, object)`
// Iterate over the keys of an object.
//
exports.each = function (obj, iterator) {
  Object.keys(obj).forEach(function (key) {
    iterator(obj[key], key, obj);
  });
};

//
// ### function find (o)
//
//
exports.find = function (obj, pred) {
  var value, key;

  for (key in obj) {
    value = obj[key];
    if (pred(value, key)) {
      return value;
    }
  }
};