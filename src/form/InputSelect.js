import React from 'react'
import {
  StyleSheet, View, Text, TextInput, Picker
} from 'react-native'
import PropTypes from 'prop-types'
import Style from '../Style'

export default class InputText extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
  }

  render() {
    const {input, value, onChange, onFocus, onBlur} = this.props
    const placeholder = input.placeholder || input.label ? `请输入${input.label}` : ''
    return (
      <TextInput
        style={[styles.input, input.style]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 0,
    height: Style.formTextHeight + Style.formTextPaddingVertical * 2,
    lineHeight: Style.formTextHeight,
    paddingVertical: Style.formTextPaddingVertical
  }
})