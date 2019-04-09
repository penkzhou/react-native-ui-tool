import React from 'react'
import {
  StyleSheet, View, Text
} from 'react-native'
import PropTypes from 'prop-types'
import Style from '../Style'
import Validate from './Validate'
import InputText from './InputText'
import InputSelect from './InputSelect'
import InputFile from './InputFile'

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
      value: {},
      focus: false,
      warning: false,
      message: ''
    }
  }

  componentDidMount = () => {
    this.getItems().forEach(({name, value}) => {
      this.changeEvent(name, value)
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
  changeEvent = (name, value, blur = false) => {
    this.setState({
      value: {...this.state.value, [name]: value},
      warning: false
    }, () => {
      if (blur) this.blurEvent(name)
    })
    this.props.onChange(name, value)
  }

  // 焦点回调
  focusEvent = () => {
    this.setState({
      focus: true,
      warning: false
    })
  }

  // 失焦回调
  blurEvent = (name) => {
    this.setState({focus: false})
    this.validate(name)
  }

  // 表单验证 -> Promise
  validate = (name) => {
    const inputs = this.getItems().filter(ipt => ipt.name === name)
    const {value} = this.state
    const validate = new Validate(inputs)
    validate.validate(value).then(() => {}).catch((fields) => {
      const item = Object.values(fields)[0]
      if (item && item[0]) this.warning({message: item[0].message})
    })
  }

  // 获取线颜色
  getLineColor = () => {
    const {warning, focus} = this.state
    if (focus) return Style.formBorderColorFocus
    if (warning) return Style.formBorderColorWarning
    return Style.formBorderColor
  }

  renderInputs = (input, value, idx) => {
    let Target = InputText
    if (input.type === 'select') {
      Target = InputSelect
    } else if (input.type === 'file') {
      Target = InputFile
    }
    return (
      <Target
        key={input.name}
        input={input}
        value={value[input.name]}
        onFocus={this.focusEvent}
        onBlur={() => this.blurEvent(input.name)}
        onChange={this.changeEvent}
        style={styles[`input_${idx}`]}
      />
    )
  }

  renderLabel = (label) => (
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{label}</Text>
    </View>
  )

  getItems = () => {
    const {input} = this.props
    return input.items || [input]
  }

  render() {
    const {input, showLabel} = this.props
    const {warning, message, value} = this.state
    const borderTopColor = this.getLineColor()
    const items = this.getItems()
    return (
      <View style={styles.container}>
        {input.prefix && input.prefix()}
        <View style={styles.inputContainer}>
          {showLabel && input.label && this.renderLabel(input.label)}
          <View style={styles.inputGroup}>
            {items.map((ipt, idx) => this.renderInputs(ipt, value, idx))}
          </View>
          <View style={[styles.warning, {borderTopColor}]}>
            <Text style={styles.warning_text}>
              {warning ? message : ''}
            </Text>
          </View>
        </View>
        {input.suffix && input.suffix()}
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
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  input: {
    padding: 0,
    height: Style.formTextHeight + Style.formTextPaddingVertical * 2,
    lineHeight: Style.formTextHeight,
    paddingVertical: Style.formTextPaddingVertical,
    fontSize: Style.formTextSize
  },
  input_0: {
    width: 0,
    flex: 1
  },
  input_1: {
    width: 150,
    marginLeft: 10
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
