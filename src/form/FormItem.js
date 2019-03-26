import React from 'react'
import {
  StyleSheet, View, Text
} from 'react-native'
import PropTypes from 'prop-types'
import Style from '../Style'
import Validate from './Validate'
import InputText from './InputText'
import InputSelect from './InputSelect'

export default class FormItem extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    showLabel: PropTypes.bool
  }

  static defaultProps = {
    onChange: () => {},
    showLabel: false
  }

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.input.value || null,
      focus: false,
      warning: false,
      message: ''
    }
  }

  componentDidMount = () => {
    const {onChange, input} = this.props
    onChange(input.name, this.state.value)
  }

  // 表单验证 -> callback
  check = (callback, errorHandler) => {
    this.validate().then(({formData}) => {
      if (callback instanceof Function) callback({formData})
    }).catch((fields) => {
      if (errorHandler instanceof Function) errorHandler(fields)
    })
  }

  // 表单验证 -> Promise
  validate = () => {
    const {input} = this.props
    const {value} = this.state
    const formData = {[input.name]: value}
    return new Promise((resolve, reject) => {
      Validate.validate([input], formData).then(() => {
        resolve({formData})
      }).catch((fields) => {
        const item = fields[input.name]
        if (item && item[0]) {
          const {message} = item[0]
          this.warning({message})
        }
        reject(fields)
      })
    })
  }

  // 警告
  warning = ({message}) => {
    this.setState({
      warning: true,
      message
    })
  }

  // 赋值回调
  changeEvent = (value, blur = false) => {
    const {input, onChange} = this.props
    input.value = value
    this.setState({value, warning: false}, () => {
      if (blur) this.blurEvent()
    })
    onChange(input.name, value)
  }

  // 焦点回调
  focusEvent = () => {
    this.setState({
      focus: true,
      warning: false
    })
  }

  // 失焦回调
  blurEvent = () => {
    this.setState({focus: false})
    this.check()
  }

  getLineColor = () => {
    const {warning, focus} = this.state
    if (focus) return Style.formBorderColorFocus
    if (warning) return Style.formBorderColorWarning
    return Style.formBorderColor
  }

  renderInput = (input, value) => {
    let Target = InputText
    if (input.type === 'select') {
      Target = InputSelect
    }
    return (
      <Target
        input={input}
        value={value}
        onFocus={this.focusEvent}
        onBlur={this.blurEvent}
        onChange={this.changeEvent}
      />
    )
  }

  renderLabel = (label) => (
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{label}</Text>
    </View>
  )

  render() {
    const {input, showLabel} = this.props
    const {warning, message, value} = this.state
    const borderTopColor = this.getLineColor()
    return (
      <View style={styles.container}>
        {React.isValidElement(input.prefix) ? input.prefix : null}
        <View style={styles.inputContainer}>
          {showLabel && input.label && this.renderLabel(input.label)}
          {this.renderInput(input, value)}
          <View style={[styles.warning, {borderTopColor}]}>
            <Text style={styles.warning_text}>
              {warning ? message : ''}
            </Text>
          </View>
        </View>
        {React.isValidElement(input.suffix) ? input.suffix : null}
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  labelContainer: {
    padding: 0
  },
  label: {
    color: Style.formLabelColor,
    fontSize: Style.formLabelSize,
    lineHeight: Style.formLabelSize
  },
  inputContainer: {
    // borderWidth: 1,
    // borderColor: 'yellow'
  },
  input: {
    padding: 0,
    height: Style.formTextHeight + Style.formTextPaddingVertical * 2,
    lineHeight: Style.formTextHeight,
    paddingVertical: Style.formTextPaddingVertical,
    fontSize: Style.formTextSize
  },
  picker: {
    padding: 0,
    height: Style.formTextHeight + Style.formTextPaddingVertical * 2,
    lineHeight: Style.formTextHeight,
    paddingVertical: Style.formTextPaddingVertical,
    fontSize: 10
  },
  pickerItem: {
    padding: 0,
    fontSize: 10
  },
  warning: {
    borderTopWidth: 1,
    borderTopColor: 'transparent',
    padding: 0
  },
  warning_text: {
    fontSize: Style.formWarningFontSize,
    height: Style.formWarningHeight,
    lineHeight: Style.formWarningLineHeight,
    color: Style.formWarningColor,
    padding: 0
  }
})
