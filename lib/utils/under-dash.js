'use strict';

var _ = {
  each: function each(obj, cb) {
    if (obj) {
      if (Array.isArray(obj)) {
        obj.forEach(cb);
      } else {
        Object.keys(obj).forEach(function (key) {
          cb(obj[key], key);
        });
      }
    }
  },

  some: function some(obj, cb) {
    if (obj) {
      if (Array.isArray(obj)) {
        return obj.some(cb);
      }
      return Object.keys(obj).some(function (key) {
        return cb(obj[key], key);
      });
    }
  },

  every: function every(obj, cb) {
    if (obj) {
      if (Array.isArray(obj)) {
        return obj.every(cb);
      }
      return Object.keys(obj).every(function (key) {
        return cb(obj[key], key);
      });
    }
    return true;
  },

  map: function map(obj, cb) {
    if (obj) {
      if (Array.isArray(obj)) {
        return obj.map(cb);
      }
      return Object.keys(obj).map(function (key) {
        return cb(obj[key], key);
      });
    }
    return [];
  },

  isEqual: function isEqual(a,b) {
    var aType = typeof a;
    var bType = typeof b;
    var aArray = Array.isArray(a);
    var bArray = Array.isArray(b);

    if (aType !== bType) {
      return false;
    }
    switch(typeof a) {
      case 'object':
        if (aArray || bArray) {
          if (aArray && bArray) {
            return (a.length === b.length) &&
              a.every(function(aValue, index) {
                var bValue = b[index];
                return _.isEqual(aValue, bValue);
              });
          }
          return false;
        }
        return _.every(a, function(aValue, key) {
          var bValue = b[key];
          return _.isEqual(aValue, bValue);
        });

      default:
        return a === b;
    }
  }
};

module.exports = _;
