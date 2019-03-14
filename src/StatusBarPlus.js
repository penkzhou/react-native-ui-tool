import React from 'react'
import {StatusBar, View} from 'react-native'
import {PropTypes} from 'prop-types'
import Style from './Style'

export default class StatusBarPlus extends React.Component {
  // 提供属性的类型检查
  static propTypes = {
    backgroundColor: PropTypes.string,
    barStyle: PropTypes.oneOf(['light-content', 'default']),
    hidden: PropTypes.bool
  };

  // 设置默认属性
  static defaultProps = {
    barStyle: 'light-content',
    backgroundColor: Style.mainColor,
    hidden: false
  }

  render() {
    const {barStyle, hidden, backgroundColor} = this.props
    return (
      <View style={{height: Style.statusBarHeight}}>
        <StatusBar barStyle={barStyle} hidden={hidden} backgroundColor={backgroundColor} />
      </View>
    )
  }
}
