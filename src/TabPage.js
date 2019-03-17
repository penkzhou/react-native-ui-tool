import React from 'react'
import {BackHandler} from 'react-native'
import {PropTypes} from 'prop-types'
import SafeAreaViewPlus from './SafeAreaViewPlus'
import NavigationBar from './NavigationBar'
import Style from './Style'

export default class TabPage extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onBackEvent: PropTypes.func,
    rightButton: PropTypes.element,
    children: PropTypes.element,
    tabColor: PropTypes.string,
    barStyle: PropTypes.oneOf(['light-content', 'default'])
  }

  static defaultProps = {
    rightButton: null,
    children: null,
    onBackEvent: () => {},
    tabColor: Style.mainColor,
    barStyle: Style.barStyle
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackEvent)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackEvent)
  }

  render() {
    const {
      title, rightButton, children, tabColor, barStyle, onBackEvent
    } = this.props
    return (
      <SafeAreaViewPlus topColor={tabColor}>
        <NavigationBar
          backgroundColor={tabColor}
          backEvent={() => { onBackEvent() }}
          title={title}
          rightButton={rightButton}
          barStyle={barStyle}
        />
        {children}
      </SafeAreaViewPlus>
    )
  }
}
