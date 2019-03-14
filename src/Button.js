import React from 'react'
import {PropTypes} from 'prop-types'
import {
  TouchableOpacity, StyleSheet, Text
} from 'react-native'
import Style from './Style'

export default class Button extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.object,
    textStyle: PropTypes.object,
    theme: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger'])
  }

  static defaultProps = {
    title: '确定',
    style: {},
    textStyle: {},
    theme: 'primary'
  }

  getStyle = () => {
    const {theme, style} = this.props
    const color = theme === 'default' ? {} : {
      backgroundColor: Style[theme],
      borderColor: Style[theme]
    }
    return {...styles.button, ...color, ...style}
  }

  getTextStyle = () => {
    const {theme, textStyle} = this.props
    const color = theme === 'default' ? Style.mainColor : 'white'
    return {color, ...textStyle}
  }

  render() {
    const {onPress, title} = this.props
    return (
      <TouchableOpacity style={this.getStyle()} onPress={onPress}>
        <Text style={this.getTextStyle()}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    ...Style.flexRow,
    borderRadius: Style.btnBorderRadius,
    height: Style.btnHeight,
    borderWidth: Style.px,
    borderColor: Style.mainColor
  },
  text: {
    fontSize: Style.btnFontSize
  }
})
