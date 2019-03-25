import React from 'react'
import {BackHandler, TouchableOpacity, Text, View, StyleSheet} from 'react-native'
import {PropTypes} from 'prop-types'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SafeAreaViewPlus from './SafeAreaViewPlus'
import NavigationBar from './NavigationBar'
import Style from './Style'

export default class TabPage extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    leftButton: PropTypes.func,
    onBackEvent: PropTypes.func,
    rightButton: PropTypes.string,
    onRightEvent: PropTypes.func,
    children: PropTypes.element,
    tabColor: PropTypes.string,
    barStyle: PropTypes.oneOf(['light-content', 'default'])
  }

  static defaultProps = {
    leftButton: null,
    onBackEvent: () => {},
    rightButton: null,
    onRightEvent: null,
    children: null,
    tabColor: Style.mainColor,
    barStyle: Style.barStyle
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackEvent)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackEvent)
  }

  onBackEvent = () => {
    const {onBackEvent} = this.props
    if (onBackEvent instanceof Function) {
      return onBackEvent()
    }
    return false
  }

  getLeftButton = () => {
    const {leftButton, onBackEvent} = this.props
    if (leftButton instanceof Function) {
      return leftButton()
    } if (onBackEvent instanceof Function) {
      return (
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={onBackEvent}
        >
          <Ionicons
            name="ios-arrow-back"
            size={Style.barBackIconSize}
            style={{color: Style.barBackIconColor}}
          />
        </TouchableOpacity>
      )
    }
    return null
  }

  renderRightBtn = () => {
    const {rightButton, rightText, onRightEvent} = this.props
    if (typeof rightButton === 'string') {
      return (
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={onRightEvent}>
          <Text style={{fontSize: 18, color: '#FFFFFF', marginRight: 10}}>{rightButton}</Text>
        </TouchableOpacity>
      )
    } else if (onRightEvent instanceof Function) {
      return (
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={onRightEvent}
        >
          <Ionicons
            name="ios-more"
            size={Style.barBackIconSize}
            style={{color: Style.barBackIconColor}}
          />
        </TouchableOpacity>
      )
    }
    return null
  }

  render() {
    const {
      title, children, tabColor, barStyle
    } = this.props
    return (
      <SafeAreaViewPlus topColor={tabColor}>
        <NavigationBar
          backgroundColor={tabColor}
          leftButton={this.getLeftButton()}
          title={title}
          rightButton={this.renderRightBtn()}
          barStyle={barStyle}
        />
        {children}
      </SafeAreaViewPlus>
    )
  }
}

const styles = StyleSheet.create({
  leftIcon: {
    padding: 8,
    paddingLeft: 12
  },
  rightIcon: {
    padding: 8,
    paddingRight: 12
  },
  rightText: {
    fontSize: Style.barBackTextSize,
    color: Style.barBackTextColor,
    marginRight: 10
  }
})
