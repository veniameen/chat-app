import Stack from '../modules/Stack.js';
import isObject from './isObject.js';
import isComplexObject from './isComplexObject.js';
export default function cloneDeep(source) {
    if (!isObject(source) && !Array.isArray(source))
        return source;
    _raiseErrorIfNotPlain(source);
    var stack = new Stack();
    var copy = Array.isArray(source) ? [] : {};
    stack.push({
        source: source,
        destination: copy,
    });
    while (!stack.isEmpty()) {
        _cloner(stack);
    }
    return copy;
}
function _cloner(stack) {
    var pair = stack.pop();
    var source = pair.source;
    var copy = pair.destination;
    if (Array.isArray(source)) {
        for (var _i = 0, source_1 = source; _i < source_1.length; _i++) {
            var value = source_1[_i];
            copy.push(_valueHandler(value, stack));
        }
    }
    else if (isObject(source)) {
        for (var _a = 0, _b = Object.entries(source); _a < _b.length; _a++) {
            var _c = _b[_a], key = _c[0], value = _c[1];
            copy[key] = _valueHandler(value, stack);
        }
    }
    else {
        throw new Error('cloneDeep: Unexpected behavior');
    }
}
function _valueHandler(value, stack) {
    _raiseErrorIfNotPlain(value);
    var result = value;
    if (Array.isArray(value)) {
        result = [];
        stack.push({ source: value, destination: result });
    }
    else if (isObject(value)) {
        result = {};
        stack.push({ source: value, destination: result });
    }
    return result;
}
function _raiseErrorIfNotPlain(value) {
    if (isComplexObject(value))
        throw new Error('cloneDeep: Complex object detected');
}
