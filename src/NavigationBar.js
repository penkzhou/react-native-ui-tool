import React from 'react'
import {
  ViewPropTypes, Text, StyleSheet, View
} from 'react-native'
import {PropTypes} from 'prop-types'
import Style from './Style'

export default class NavigationBar extends React.Component {
  // 提供属性的类型检查
  static propTypes = {
    backgroundColor: PropTypes.string,
    style: ViewPropTypes.style,
    leftButton: PropTypes.element,
    rightButton: PropTypes.element,
    titleLayoutStyle: ViewPropTypes.style,
    titleStyle: ViewPropTypes.style,
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ])
  }

  // 设置默认属性
  static defaultProps = {
    backgroundColor: Style.mainColor,
    style: {},
    leftButton: null,
    rightButton: null,
    title: 'title',
    titleStyle: {},
    titleLayoutStyle: {}
  }

  render() {
    const {
      backgroundColor, style, leftButton, rightButton, title, titleLayoutStyle, titleStyle
    } = this.props
    return (
      <View style={[{backgroundColor}, style]}>
        <View style={styles.navBar}>
          <View style={styles.navBarButton}>
            {leftButton}
          </View>
          <View style={[styles.navBarTitleContainer, titleLayoutStyle]}>
            {React.isValidElement(title) ? title : <Text ellipsizeMode="head" numberOfLines={1} style={[styles.title, titleStyle]}>{title}</Text>}
          </View>
          <View style={styles.navBarButton}>
            {rightButton}
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  navBar: {
    ...Style.flexRow,
    justifyContent: 'space-between',
    height: Style.navBarHeight
  },
  navBarButton: {
    alignItems: 'center'
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0
  },
  title: {
    fontSize: 20,
    color: 'white'
  }
})
