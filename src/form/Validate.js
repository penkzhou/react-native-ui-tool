import AsyncValidator from 'async-validator'

export default class Validate {
  constructor(inputs) {
    this.rules = {}
    this.getInputsRules(inputs)
  }

  validate(formData) {
    return new Promise((resolve, reject) => {
      const validator = new AsyncValidator(this.rules)
      validator.validate(formData, (errors, fields) => {
        /* eslint no-unused-expressions:0 */
        errors ? reject(fields) : resolve(formData)
      })
    })
  }

  // 获取inputs的rules
  getInputsRules(inputs) {
    this.rules = {}
    if (inputs instanceof Array) {
      inputs.forEach((input) => (input.items ? input.items.forEach(ipt => this.getRules(ipt)) : this.getRules(input)))
    }
  }

  // 获取rules
  getRules(input) {
    let rule = []
    if (input.required) {
      rule.push({required: true, message: input.placeholder})
    }
    if (input.rule instanceof Array) {
      rule = rule.concat(input.rule)
    } else if (typeof input.rule === 'object') {
      rule.push(input.rule)
    }
    if (rule.length) this.rules[input.name] = rule
  }
}
