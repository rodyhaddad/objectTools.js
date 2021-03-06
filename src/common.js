/**
 * The global object. `window` in the browser, `global` in node.js or `this` otherwise
 *
 * @type {window|global|*}
 */
var globalObj = typeof window !== "undefined" ? window :
    (typeof global !== "undefined" ? global :
        this);

/**
 * Determine whether the argument is an array or not
 *
 * @param arr Variable to test on
 * @returns {boolean} Whether the argument is an array or not
 */
function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
}

/**
 * Determine whether the argument is an object or not (excludes null)
 *
 * @param obj Variable to test on
 * @returns {boolean} Whether the argument is an object or not (excludes null)
 */
function isObject(obj) {
    return typeof obj === "object" && obj !== null;
}

/**
 * Determine whether the argument is a function or not
 *
 * @param fn Variable to test on
 * @returns {boolean} Whether the argument is a function or not
 */
function isFn(fn) {
    return typeof fn === "function";
}

/**
 * Determine whether the argument is undefined or not
 *
 * @param val Variable to test on
 * @returns {boolean} Whether the argument is undefined or not
 */
function isUndefined(val) {
    return typeof val === "undefined";
}

/**
 * Determine whether the argument is empty or not
 *
 * @param {Object} obj Object to test on
 * @returns {boolean} Whether the object is empty
 */
function isEmptyObject(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

/**
 * Transforms the argument into an array. Useful for transmuting the arguments object
 *
 * @param obj the argument to transform into an array
 * @returns {Array} An array originating from the argument
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * Cleans an array from a specific element
 *
 * @param array An array to clean
 * @param from What should be removed from the array
 * @param once If true, will stop at the first occurrence of `from`
 * @returns {Array} The cleaned array
 */
function cleanArray(array, from, once) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] === from) {
            array.splice(i, 1);
            if (once) {
                break;
            }
        }
    }
    return array;
}

/**
 * A function that performs no operations
 */
function noop() {

}

/**
 * If the value of the named property is a function then invoke it with the object as context.
 * Otherwise, return it.
 *
 * @param {Object} object The object to act on
 * @param {String} property The property to return
 * @param {Array} args The arguments passed to the value if it's a function
 * @returns {*} the result
 */
function result(object, property, args) {
    if (object) {
        var value = object[property];
        return isFn(value) ? value.apply(object, args) : value;
    }
}