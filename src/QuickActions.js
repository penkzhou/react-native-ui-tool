import React from 'react'
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native'
import {PropTypes} from 'prop-types'
import Style from './Style'

export default class QuickActions extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.any,
      iconName: PropTypes.string,
      onPress: PropTypes.func.isRequired,
      backgroundColor: PropTypes.string,
      color: PropTypes.string
    })).isRequired,
    backgroundColor: PropTypes.string,
    target: PropTypes.object.isRequired
  }

  static defaultProps = {
    backgroundColor: Style.listQuickBackgroundColor
  }

  render() {
    const {
      backgroundColor, data, target
    } = this.props
    return (
      <View style={[styles.quickContainer, {backgroundColor}]}>
        {data.map((item, idx) => {
          const {
            /* eslint no-shadow:0 */
            text, iconName, onPress, backgroundColor = Style.listQuickBackgroundColor, color = Style.listQuickColor
          } = item
          const Icon = item.icon
          return (
            <TouchableOpacity
              key={idx}
              style={[styles.touchable, {backgroundColor}]}
              onPress={() => onPress(target, item)}
            >
              <View style={[styles.quickBox]}>
                {Icon ? <Icon name={iconName} style={[styles.icon, {color}]} /> : null}
                {text ? <Text style={[styles.text, {color}]}>{text}</Text> : null}
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  quickContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  touchable: {
    width: Style.listQuickWidth
  },
  quickBox: {
    flex: 1,
    ...Style.flexRow
  },
  icon: {
    fontSize: Style.listQuickIconSize
  },
  text: {
    fontSize: Style.listQuickTextSize
  }
})
