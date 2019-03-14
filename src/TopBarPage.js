import React from 'react'
import {BackHandler} from 'react-native'
import {PropTypes} from 'prop-types'
import SafeAreaViewPlus from './SafeAreaViewPlus'
import NavigationBar from './NavigationBar'

export default class TopBarPage extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onBackEvent: PropTypes.func,
    rightButton: PropTypes.element,
    children: PropTypes.element
  }

  static defaultProps = {
    rightButton: null,
    children: null,
    onBackEvent: () => {}
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
    const {title, rightButton, children} = this.props
    return (
      <SafeAreaViewPlus>
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
