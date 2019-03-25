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

  // 获取Placeholder
  static findOption(value, options) {
    return options.find(it => Util.getString(it.value) === Util.getString(value)) || {}
  }

  static getString(val) {
    if (typeof val === 'number') {
      return val.toString()
    }
    return val
  }
}
