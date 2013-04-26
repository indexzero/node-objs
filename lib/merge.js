/*
 * merge.js: Sane deep and shallow merging of Objects.
 *
 * (C) 2013, Charlie Robbins.
 *
 */

//
// ### function deep (target, source, resolve)
// #### @target {Object} Target Object to merge into.
// #### @source {Object} Source Object to merge from.
// #### @resolve {function} **Optional** Optional conflict resolution function
// Merged enumerable properties from the `source` into the `target` deeply
// merging keys with Object values along the merge path.
//
exports.deep = function (target, source, resolve) {
  Object.getOwnPropertyNames(source).forEach(function (key) {
    var rdesc = Object.getOwnPropertyDescriptor(source, key),
        ldesc = Object.getOwnPropertyDescriptor(target, key),
        rtype,
        ltype;
    
    if ((!ldesc || (!ldesc.get && !ldesc.set))
        && !rdesc.get && !rdesc.set) {
      //
      // If we have plain old properties then
      // just merge them as appropriate.
      //
      ltype = ldesc && typeof target[key];
      rtype = typeof source[key];
      
      if (ltype === 'object' && rtype === 'object') {
        //
        // Both the lvalue and rvalue are Objects, then
        // merge them together unless the ltype is a well
        // known "referenceType".
        //
        if (!(target[key] instanceof Error || target[key] instanceof Date
            || target[key] instanceof RegExp)) {
          //
          // If it is not a reference type then deep merge the two Objects.
          // or if there is a resolve function, call it.
          //
          return !resolve
            ? exports.deep(target[key], source[key])
            : resolve(target[key], source[key]);
        }
      }

      //
      // Otherwise it is a type mismatch (or not defined)
      // on target, so set the property.
      //
      target[key] = source[key];
    }
    else if (ldesc && !ldesc.configurable) {
      //
      // If the lvalue is not configurable
      // return because it cannot be redefined
      //
      return;
    }
    else if (rdesc.get || rdesc.set) {
      Object.defineProperty(target, attr, {
        enumerable: rdesc.enumerable,
        configurable: rdesc.configurable,
        get: rdesc.get,
        set: rdesc.set
      });
    }
    else {
      target[key] = source[key];
    }
  });
  
  return target;
};

//
// ### function shallow (target [source0, source1, ...])
// Copies enumerable properties from `source0 ... sourceN`
// onto `target` and returns the resulting object.
//
exports.shallow = function (target) {
  Array.prototype.slice.call(arguments, 1).forEach(function (o) {
    Object.getOwnPropertyNames(o).forEach(function (attr) {
      var getter = Object.getOwnPropertyDescriptor(o, attr).get,
          setter = Object.getOwnPropertyDescriptor(o, attr).set;

      if (!getter && !setter) {
        target[attr] = o[attr];
      }
      else {
        Object.defineProperty(target, attr, {
          get: getter,
          set: setter
        });
      }
    });
  });

  return target;
};