import React from 'react'
import {
  StyleSheet, View, Text
} from 'react-native'
import PropTypes from 'prop-types'
import Style from '../Style'

export default class ShowText extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    readonly: PropTypes.bool,
    icon: PropTypes.func
  }

  static defaultProps = {
    text: '',
    color: null,
    readonly: false,
    icon: null
  }

  render() {
    const {
      text, color, readonly, icon
    } = this.props
    const iText = readonly ? `${text || ''}（只读）` : text
    return (
      <View style={styles.container}>
        <Text style={[styles.showText, {color: readonly ? Style.formReadonlyColor : color}]}>{iText}</Text>
        {icon && icon()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 0,
    height: Style.formTextHeight + Style.formTextPaddingVertical * 2,
    paddingVertical: Style.formTextPaddingVertical
  },
  showText: {
    padding: 0,
    lineHeight: Style.formTextHeight,
    fontSize: Style.formTextSize,
    flex: 1
  }
})
