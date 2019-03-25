import React from 'react'
import {
  StyleSheet, View, Text, TextInput, Picker
} from 'react-native'
import PropTypes from 'prop-types'
import Style from '../Style'
import ShowText from './ShowText'
import Util from './Util'

export default class InputText extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.any
  }

  static defaultProps = {
    value: null
  }

  render() {
    const {
      input, value, onChange, onFocus, onBlur
    } = this.props
    const placeholder = Util.getPlaceholder('请输入', input)
    if (!input.readonly) {
      return (
        <TextInput
          style={[styles.input, input.style]}
          placeholder={placeholder}
          placeholderTextColor={Style.formPlaceholderColor}
          value={value}
          onChangeText={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      )
    }
    return <ShowText text={value} readonly />
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 0,
    height: Style.formTextHeight + Style.formTextPaddingVertical * 2,
    lineHeight: Style.formTextHeight,
    paddingVertical: Style.formTextPaddingVertical,
    fontSize: Style.formTextSize
  }
})
