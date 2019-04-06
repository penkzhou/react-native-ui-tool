import React from 'react'
import {PropTypes} from 'prop-types'
import {
  View, StyleSheet, Text, TouchableOpacity
} from 'react-native'
import Style from './Style'

const Process = global.UiToolViewProcess || class {}

export default class VerticalView extends React.Component {
  static propTypes = {
    style: PropTypes.any,
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      text: PropTypes.string,
      onPress: PropTypes.func,
      process: PropTypes.string
    }))),
    lineHeight: PropTypes.number,
    paddingVertical: PropTypes.number,
    paddingHorizontal: PropTypes.number,
    numberOfLines: PropTypes.number
  }

  static defaultProps = {
    style: {},
    data: [],
    lineHeight: 25,
    paddingVertical: 10,
    paddingHorizontal: 5,
    numberOfLines: 1
  }

  getData = (it, idx) => {
    const {numberOfLines, lineHeight} = this.props
    const Box = it.onPress ? TouchableOpacity : View
    const text = it.process && Process[it.process] ? Process[it.process](it.text) : it.text
    const textStyle = {...styles.text, lineHeight, ...it.textStyle}
    return (
      <Box onPress={() => it.onPress && it.onPress(it)} key={`b_${idx}`}>
        <Text style={textStyle} numberOfLines={numberOfLines}>
          {it.label ? (
            <Text style={styles.label}>
              {`${it.label}：`}
            </Text>
          ) : null}
          {text}
        </Text>
      </Box>
    )
  }

  render() {
    const {style, data, paddingVertical, paddingHorizontal} = this.props
    return (
      <View style={[styles.container, style, {paddingVertical}]}>
        {data.map((item, index) => (
          <View key={`l_${index}`} style={[styles.vertical, {paddingHorizontal}]}>
            {item.map(this.getData)}
          </View>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...Style.flexRow,
    alignItems: 'flex-start'
  },
  vertical: {
    flex: 1
  },
  label: {
    fontSize: 12,
    color: Style.labelColor
  },
  text: {
    fontSize: 12,
    color: Style.textColor
  }
})
