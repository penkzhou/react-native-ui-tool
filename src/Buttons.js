import React from 'react'
import {PropTypes} from 'prop-types'
import {ViewPropTypes, View} from 'react-native'
import Button from './Button'

export default class Buttons extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    style: ViewPropTypes.style,
    layoutStyle: ViewPropTypes.style
  }

  static defaultProps = {
    style: {},
    layoutStyle: {}
  }

  render() {
    const {data, layoutStyle, style} = this.props
    const btns = data.filter(item => !('show' in item) || item.show)
    return (
      <View style={layoutStyle}>
        {btns.map((item, idx) => (
          <Button
            key={idx}
            title={item.title}
            style={style}
            theme={item.theme}
            onPress={() => {
              if (item.onPress) item.onPress(item)
            }}
          />
        ))}
      </View>
    )
  }
}
