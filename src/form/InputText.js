import React from 'react'
import {
  StyleSheet, TextInput
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
    value: PropTypes.any,
    style: PropTypes.any
  }

  static defaultProps = {
    value: null,
    style: null
  }

  render() {
    const {
      input, value, onChange, onFocus, onBlur, style
    } = this.props
    const placeholder = Util.getPlaceholder('请输入', input)
    if (!input.readonly) {
      return (
        <TextInput
          style={[styles.input, style, input.style]}
          placeholder={placeholder}
          placeholderTextColor={Style.formPlaceholderColor}
          value={value}
          onChangeText={(v) => onChange(input.name, v)}
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
