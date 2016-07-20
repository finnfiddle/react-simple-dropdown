export function omit(obj, keys) {
  let result = Object.assign({}, obj)
  keys.forEach(key => delete result[key])
  return result
}
