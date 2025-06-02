// props.js

export const unknownProp = null

export const numericProp = [Number, String]

export const truthProp = {
  type: Boolean,
  default: true
}

export function makeRequiredProp(type) {
  return {
    type,
    required: true
  }
}

export function makeArrayProp() {
  return {
    type: Array,
    default: () => []
  }
}

export function makeNumberProp(defaultVal) {
  return {
    type: Number,
    default: defaultVal
  }
}

export function makeNumericProp(defaultVal) {
  return {
    type: numericProp,
    default: defaultVal
  }
}

export function makeStringProp(defaultVal) {
  return {
    type: String,
    default: defaultVal
  }
}
