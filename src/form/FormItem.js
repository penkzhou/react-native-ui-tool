import React from 'react'
import {
  StyleSheet, View, Text, TextInput, Picker
} from 'react-native'
import PropTypes from 'prop-types'
import Style from '../Style'
import Validate from './Validate'

export default class FormItem extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    onChange: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.input.value,
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
  changeEvent = (value) => {
    const {input, onChange} = this.props
    input.value = value
    this.setState({value, warning: false})
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

  renderInput = (input) => {
    const {
      warning, message, value
    } = this.state
    const {type} = input
    return (
      <View style={styles.input_container}>
        {type === 'text' && this.renderText(input, value)}
        {/*{type === 'select' && this.renderSelect(input, value)}*/}
        <View style={[styles.warning, {borderTopColor: this.getLineColor()}]}>
          <Text style={styles.warning_text}>
            {warning ? message : ''}
          </Text>
        </View>
      </View>
    )
  }

  renderText = (input, value) => (
    <TextInput
      style={[styles.input, input.style]}
      placeholder={input.placeholder}
      value={value}
      onChangeText={this.changeEvent}
      onFocus={this.focusEvent}
      onBlur={this.blurEvent}
    />
  )

  renderSelect = (input, value) => (
    <Picker
      style={[styles.picker, input.style]}
      selectedValue={value}
      onValueChange={this.changeEvent}>
      {input.option.map((opt, idx) => (
        <Picker.Item key={idx} style={styles.pickerItem} label={opt.Text} value={opt.Value} />
      ))}
    </Picker>
  )

  render() {
    const {input} = this.props
    const {warning, message, value} = this.state
    const borderTopColor = this.getLineColor()
    return (
      <View style={styles.container}>
        {React.isValidElement(input.prefix) ? input.prefix : null}
        <View style={styles.input_container}>
          {input.type === 'text' && this.renderText(input, value)}
          {input.type === 'select' && this.renderSelect(input, value)}
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
  input_container: {
    // borderWidth: 1,
    // borderColor: 'yellow'
  },
  input: {
    padding: 0,
    height: Style.formTextHeight + Style.formTextPaddingVertical * 2,
    lineHeight: Style.formTextHeight,
    paddingVertical: Style.formTextPaddingVertical
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
