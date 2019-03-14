import AsyncValidator from 'async-validator'

export default class Validate {
  static validate = (inputs, formData) => (new Promise((resolve, reject) => {
    const rules = Validate.getInputsRules(inputs)
    const validator = new AsyncValidator(rules)
    validator.validate(formData, (errors, fields) => {
      /* eslint no-unused-expressions:0 */
      errors ? reject(fields) : resolve(formData)
    })
  }))

  // 获取inputs的rules
  static getInputsRules = (inputs) => {
    const rules = {}
    if (inputs instanceof Array) {
      inputs.forEach((input) => {
        let rule = []
        if (input.required) rule.push({required: true, message: input.placeholder})
        if (input.rule instanceof Array) {
          rule = rule.concat(input.rule)
        } else if (typeof input.rule === 'object') {
          rule.push(input.rule)
        }
        if (rule.length) rules[input.name] = rule
      })
    }
    return rules
  }
}
