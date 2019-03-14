import React from 'react'
import {
  ViewPropTypes, Text, StyleSheet, View, TouchableOpacity
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {PropTypes} from 'prop-types'
import StatusBarPlus from './StatusBarPlus'
import Style from './Style'

export default class NavigationBar extends React.Component {
  // 提供属性的类型检查
  static propTypes = {
    backgroundColor: PropTypes.string,
    style: ViewPropTypes.style,
    backEvent: PropTypes.func,
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
    backEvent: null,
    leftButton: null,
    rightButton: null,
    title: 'title',
    titleStyle: {},
    titleLayoutStyle: {}
  }

  getLeftButton = () => {
    const {backEvent, leftButton} = this.props
    if (backEvent instanceof Function) {
      return (
        <TouchableOpacity
          style={{padding: 8, paddingLeft: 12}}
          onPress={backEvent}
        >
          <Ionicons
            name="ios-arrow-back"
            size={Style.barBackIconSize}
            style={{color: Style.barBackIconColor}}
          />
        </TouchableOpacity>
      )
    }
    return leftButton
  }

  render() {
    const {
      backgroundColor, style, rightButton, title, titleLayoutStyle, titleStyle
    } = this.props
    return (
      <View style={[{backgroundColor}, style]}>
        <StatusBarPlus backgroundColor={backgroundColor} />
        <View style={styles.navBar}>
          <View style={styles.navBarButton}>
            {this.getLeftButton()}
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
