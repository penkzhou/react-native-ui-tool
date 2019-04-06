export default class Util {
  // 获取Placeholder
  static getPlaceholder(
    start = '请输入',
    {placeholder, label, required},
    end = '（必填）'
  ) {
    let text = placeholder || start + label
    if (required) text += end
    return text
  }

  // 在option中查找value
  static findOption(value, options) {
    return options.find(it => Util.getString(it.Value) === Util.getString(value)) || {}
  }

  static getString(val) {
    if (typeof val === 'number') {
      return val.toString()
    }
    return val
  }

  // 利用Function获取数据
  static getDataByFunc(func, callback) {
    if (func instanceof Function) {
      const val = func()
      if (val instanceof Promise) {
        val.then(data => callback(data))
      } else {
        callback(val)
      }
    }
  }
}
