import React from 'react'
import {PixelRatio, View} from 'react-native'

import PropTypes from 'prop-types'
import Style from './Style'

export default class Line extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    horizontal: PropTypes.bool
  }

  static defaultProps = {
    color: Style.borderColor,
    horizontal: true
  }

  render() {
    const {color, horizontal} = this.props
    const style = {backgroundColor: color}
    style[horizontal ? 'height' : 'width'] = 1 / PixelRatio.get()
    return <View style={style} />
  }
}
