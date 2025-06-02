// types.js
export function typeOf(value) {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  const type = typeof value
  if (type !== 'object') return type

  const toString = Object.prototype.toString.call(value)
  switch (toString) {
    case '[object Array]':
      return 'array'
    case '[object Function]':
      return 'function'
    case '[object Date]':
      return 'date'
    case '[object RegExp]':
      return 'regexp'
    case '[object Set]':
      return 'set'
    case '[object Map]':
      return 'map'
    case '[object WeakSet]':
      return 'weakset'
    case '[object WeakMap]':
      return 'weakmap'
    case '[object Promise]':
      return 'promise'
    default:
      return 'object'
  }
}

export function isFunction(value) {
  return typeOf(value) === 'function'
}

export function isArray(value) {
  return typeOf(value) === 'array'
}

export function isObject(value) {
  return typeOf(value) === 'object'
}

export function isString(value) {
  return typeOf(value) === 'string'
}

export function isNumber(value) {
  return typeOf(value) === 'number' && !isNaN(value)
}

export function isBoolean(value) {
  return typeOf(value) === 'boolean'
}

export function isNull(value) {
  return value === null
}

export function isUndefined(value) {
  return value === undefined
}

export function isDate(value) {
  return typeOf(value) === 'date'
}

export function isRegExp(value) {
  return typeOf(value) === 'regexp'
}

export function isPromise(value) {
  return typeOf(value) === 'promise'
}

export function isSet(value) {
  return typeOf(value) === 'set'
}

export function isMap(value) {
  return typeOf(value) === 'map'
}
