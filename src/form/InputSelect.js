import React from 'react'
import {
  StyleSheet, View, Picker
} from 'react-native'
import PropTypes from 'prop-types'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Style from '../Style'
import ShowText from './ShowText'
import Util from './Util'

export default class InputText extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any
  }

  static defaultProps = {
    value: null
  }

  constructor(props) {
    super(props)
    this.state = {
      option: []
    }
  }

  componentWillMount = () => {
    const {option} = this.props.input
    if (option instanceof Function) {
      const val = option()
      if (val instanceof Array) {
        this.setState({option: val})
      } else if (val instanceof Promise) {
        val.then(data => this.setState({option: data}))
      }
    }
  }

  getOptions = () => {
    const {input} = this.props
    const option = input.option instanceof Array ? input.option : this.state.option
    const placeholder = Util.getPlaceholder('请选择', input, '（必选）')
    const items = option.map((opt) => ({text: opt.Text, value: opt.Value, color: Style.formTextColor}))
    return [{text: placeholder, value: null, color: Style.formPlaceholderColor}].concat(items)
  }

  renderShowText = (value, options, input) => {
    const {text, color} = Util.findOption(value, options)
    return (
      <ShowText
        text={text}
        color={color}
        readonly={!!input.readonly}
        icon={input.readonly ? null : () => (<AntDesign name="caretdown" style={styles.icon} />)}
      />
    )
  }

  renderPicker = (value, options, input, onChange) => {
    if (!input.readonly) {
      return (
        <Picker
          style={styles.picker}
          onValueChange={(val) => onChange(val, true)}
          selectedValue={value}
          ref={(ref) => { this.picker = ref }}
        >
          {options.map((item) => (
            <Picker.Item key={item.value} label={item.text} value={item.value} color={item.color} />
          ))}
        </Picker>
      )
    }
    return null
  }

  render() {
    const {value, input, onChange} = this.props
    const options = this.getOptions()
    return (
      <View style={styles.container}>
        {this.renderShowText(value, options, input)}
        {this.renderPicker(value, options, input, onChange)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: Style.formTextHeight + Style.formTextPaddingVertical * 2,
    position: 'relative'
  },
  input: {
    padding: 0,
    height: Style.formTextHeight + Style.formTextPaddingVertical * 2,
    lineHeight: Style.formTextHeight,
    paddingVertical: Style.formTextPaddingVertical
  },
  icon: {
    fontSize: 14,
    paddingHorizontal: 10,
    color: Style.formPlaceholderColor
  },
  picker: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    backgroundColor: 'transparent' // to hide native icon
  }
})
