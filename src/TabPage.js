import React from 'react'
import {BackHandler, TouchableOpacity, Platform} from 'react-native'
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
    rightButton: PropTypes.func,
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
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackEvent)
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackEvent)
    }
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
          style={{padding: 8, paddingLeft: 12}}
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
    const {rightButton, onRightEvent} = this.props
    if (rightButton instanceof Function) {
      return rightButton()
    } if (onRightEvent instanceof Function) {
      return (
        <TouchableOpacity
          style={{padding: 8, paddingRight: 12}}
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
