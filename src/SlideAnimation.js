import React from 'react'
import {PropTypes} from 'prop-types'
import {
  View, Platform, UIManager, LayoutAnimation
} from 'react-native'

const animationConfig = {
  duration: 300,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  }
}

export default class SlideDownView extends React.Component {
  static propTypes = {
    style: PropTypes.any,
    children: PropTypes.any,
    duration: PropTypes.number,
    padding: PropTypes.number
  }

  static defaultProps = {
    children: null,
    style: null,
    duration: 200,
    padding: 0
  }

  constructor(props) {
    super(props)
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  componentWillMount() {
    this.play()
  }

  componentWillUnmount() {
    this.play()
  }

  play = () => {
    LayoutAnimation.configureNext({
      ...animationConfig,
      duration: this.props.duration
    })
  }

  render() {
    const {style, children, padding} = this.props
    return (
      <View style={[style, {padding}]}>
        {children}
      </View>
    )
  }
}
