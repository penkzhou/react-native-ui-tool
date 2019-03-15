import React from 'react'
import {
  DeviceInfo, SafeAreaView, StyleSheet, View, ViewPropTypes, BackHandler
} from 'react-native'
import {PropTypes} from 'prop-types'
import SafeAreaViewPlus from './SafeAreaViewPlus'
import NavigationBar from './NavigationBar'

export default class TabPage extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onBackEvent: PropTypes.func,
    rightButton: PropTypes.element,
    children: PropTypes.element,
    safePlus: PropTypes.bool
  }

  static defaultProps = {
    rightButton: null,
    children: null,
    safePlus: false,
    onBackEvent: () => {}
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackEvent)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackEvent)
  }

  // 后退事件
  onBackEvent = () => this.props.onBackEvent()

  render() {
    const {title, rightButton, children, safePlus} = this.props
    return (
      <SafeAreaViewPlus enablePlus={safePlus}>
        <NavigationBar
          backEvent={this.onBackEvent}
          title={title}
          rightButton={rightButton}
        />
        {children}
      </SafeAreaViewPlus>
    )
  }
}
