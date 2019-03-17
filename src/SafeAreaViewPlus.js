import React from 'react'
import {
  DeviceInfo, SafeAreaView, StyleSheet, View, ViewPropTypes
} from 'react-native'
import {PropTypes} from 'prop-types'
import StatusBarPlus from './StatusBarPlus'
import Style from './Style'

export default class SafeAreaViewPlus extends React.Component {
  static propTypes = {
    topColor: PropTypes.string,
    bottomColor: PropTypes.string,
    enablePlus: PropTypes.bool,
    topInset: PropTypes.bool,
    bottomInset: PropTypes.bool,
    style: ViewPropTypes.style,
    children: PropTypes.any.isRequired,
    barStyle: PropTypes.oneOf(['light-content', 'default'])
  }

  static defaultProps = {
    topColor: 'transparent',
    bottomColor: 'transparent',
    enablePlus: true,
    topInset: true,
    bottomInset: false,
    style: {},
    barStyle: Style.barStyle
  }

  getStatusBar = () => {
    const {
      topColor, barStyle, topInset
    } = this.props
    return (
      <StatusBarPlus
        backgroundColor={topColor}
        barStyle={barStyle}
        hidden={!topInset}
      />
    )
  }

  genSafeAreaViewPlus() {
    const {
      children, topColor, bottomColor, topInset, bottomInset
    } = this.props
    return (
      <View style={[styles.container, this.props.style]}>
        {this.getStatusBar()}
        {!DeviceInfo.isIPhoneX_deprecated || !topInset ? null : <View style={[styles.topArea, {backgroundColor: topColor}]} />}
        {children}
        {!DeviceInfo.isIPhoneX_deprecated || !bottomInset ? null : <View style={[styles.bottomArea, {backgroundColor: bottomColor}]} />}
      </View>
    )
  }

  genSafeAreaView() {
    const {children, style} = this.props
    return (
      <SafeAreaView style={[styles.container, style]} {...this.props}>
        {this.getStatusBar()}
        {children}
      </SafeAreaView>
    )
  }

  render() {
    return this.props.enablePlus ? this.genSafeAreaViewPlus() : this.genSafeAreaView()
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topArea: {
    height: Style.safeAreaTopHeight
  },
  bottomArea: {
    height: Style.safeAreaBottomHeight
  }
})
