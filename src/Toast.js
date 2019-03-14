import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Animated,
  Text,
  ViewPropTypes,
  Keyboard,
  Dimensions
} from 'react-native'

import PropTypes from 'prop-types'

const {height} = Dimensions.get('window')

export const DURATION = {
  SHORT: 500,
  MIDDLE: 1500,
  LONG: 3000,
  FOREVER: 0
}

class Toast extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    position: PropTypes.oneOf([
      'top',
      'center',
      'bottom'
    ]),
    textStyle: Text.propTypes.style,
    positionValue: PropTypes.number,
    fadeInDuration: PropTypes.number,
    fadeOutDuration: PropTypes.number,
    opacity: PropTypes.number,
    defaultCloseDelay: PropTypes.number
  }

  static defaultProps = {
    style: null,
    position: 'bottom',
    textStyle: null,
    positionValue: 100,
    fadeInDuration: 500,
    fadeOutDuration: 500,
    opacity: 0.6,
    defaultCloseDelay: 250
  }

  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
      text: '',
      keyBoard: 0,
      opacityValue: new Animated.Value(this.props.opacity)
    }
  }

  componentWillMount() {
    this.keyboardShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardShow)
    this.keyboardHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardHide)
  }

  componentWillUnmount() {
    this.keyboardShowListener.remove()
    this.keyboardHideListener.remove()
    if (this.animation) this.animation.stop()
    if (this.timer) clearTimeout(this.timer)
  }

  keyboardShow = (e) => {
    this.setState({
      keyBoard: e.endCoordinates.height
    })
  }

  keyboardHide = () => {
    this.setState({
      keyBoard: 0
    })
  }

  show = (text, duration, callback) => {
    this.duration = typeof duration === 'number' ? duration : DURATION.MIDDLE
    this.callback = callback
    this.setState({
      isShow: true,
      text
    })

    this.animation = Animated.timing(
      this.state.opacityValue,
      {
        toValue: this.props.opacity,
        duration: this.props.fadeInDuration
      }
    )
    this.animation.start(() => {
      this.isShow = true
      if (duration !== DURATION.FOREVER) this.close(this.duration)
    })
  }

  close = (duration) => {
    let delay = duration
    if (typeof duration !== 'number') delay = this.props.defaultCloseDelay

    if (!this.isShow && !this.state.isShow) return
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.animation = Animated.timing(
        this.state.opacityValue,
        {
          toValue: 0.0,
          duration: this.props.fadeOutDuration
        }
      )
      this.animation.start(() => {
        this.setState({
          isShow: false
        })
        this.isShow = false
        if (typeof this.callback === 'function') {
          this.callback()
        }
      })
    }, delay)
  }

  getViewStyle = () => {
    const {keyBoard} = this.state
    const {positionValue} = this.props
    let top = positionValue
    switch (this.props.position) {
      case 'top':
        top = positionValue
        break
      case 'center':
        top = (height - keyBoard) / 2
        break
      default:
        top = height - keyBoard - positionValue
    }
    return [styles.container, {top}]
  }

  render() {
    const {isShow, opacityValue, text} = this.state
    if (isShow) {
      return (
        <View style={this.getViewStyle()} pointerEvents="none">
          <Animated.View style={[styles.content, {opacity: opacityValue}, this.props.style]}>
            {React.isValidElement(text) ? text : <Text style={[styles.text, this.props.textStyle]}>{text}</Text>}
          </Animated.View>
        </View>
      )
    }
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    elevation: 999,
    alignItems: 'center',
    zIndex: 10000
  },
  content: {
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 10
  },
  text: {
    color: 'white'
  }
})

export default Toast
