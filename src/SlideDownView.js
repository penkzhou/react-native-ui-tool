import React from 'react'
import {PropTypes} from 'prop-types'
import {Animated} from 'react-native'

export default class SlideDownView extends React.Component {
  static propTypes = {
    style: PropTypes.any,
    children: PropTypes.any,
    height: PropTypes.number.isRequired,
    duration: PropTypes.number
  }

  static defaultProps = {
    children: null,
    style: {},
    duration: 300
  }

  constructor(props) {
    super(props)
    this.state = {
      height: new Animated.Value(0)
    }
  }

  componentDidMount() {
    const {height, duration} = this.props
    Animated.timing(
      this.state.height,
      {
        toValue: height,
        duration
      }
    ).start()
  }

  render() {
    const {style, children} = this.props
    return (
      <Animated.View
        style={{...style, height: this.state.height}}
      >
        {children}
      </Animated.View>
    )
  }
}
