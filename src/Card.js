import React from 'react'
import {PropTypes} from 'prop-types'
import {
  StyleSheet, Text, TouchableOpacity, View, ViewPropTypes
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Style from './Style'

export default class Card extends React.Component {
  static propTypes = {
    title: PropTypes.shape({
      title: PropTypes.string,
      onPress: PropTypes.func,
      option: PropTypes.func,
      style: ViewPropTypes.style,
      textStyle: ViewPropTypes.style,
      renderRight: ViewPropTypes.func
    }),
    paddingTop: PropTypes.bool,
    paddingBottom: PropTypes.bool,
    lineArrow: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.shape({
      style: ViewPropTypes.style,
      label: PropTypes.string,
      labelStyle: ViewPropTypes.style,
      text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      textStyle: ViewPropTypes.style,
      onPress: PropTypes.func,
      renderRight: PropTypes.func
    }))
  }

  static defaultProps = {
    title: null,
    paddingTop: true,
    paddingBottom: false,
    lineArrow: true,
    data: []
  }

  getArrow = () => (
    <Ionicons
      name="ios-arrow-forward"
      size={Style.cardArrowSize}
      style={{color: Style.cardArrowColor}}
    />
  )

  getMore = (onPress) => (
    <TouchableOpacity
      onPress={onPress}
    >
      <Ionicons
        name="ios-more"
        size={Style.cardArrowSize}
        style={{marginRight: 10}}
      />
    </TouchableOpacity>
  )

  getTitleRight = (render, option, onPress) => {
    if (render) return render()
    if (option instanceof Function) {
      return this.getMore(option)
    }
    if (onPress instanceof Function) {
      return this.getArrow()
    }
    return null
  }

  getTitle = () => {
    const {title = {}} = this.props
    const {
      onPress, option, style, textStyle, renderRight
    } = title
    const text = title.title
    if (!text) return null
    const Title = onPress ? TouchableOpacity : View
    return (
      <Title style={[styles.title, style]} onPress={onPress}>
        <Text numberOfLines={1} style={[styles.titleText, textStyle]}>{text}</Text>
        {this.getTitleRight(renderRight, option, onPress)}
      </Title>
    )
  }

  getLine = (item, length, index) => {
    const {lineArrow} = this.props
    const last = !(length - 1 - index)
    const {
      style, label, labelStyle, text, textStyle, onPress, renderRight
    } = item
    const borderBottom = last ? {} : {borderBottomColor: Style.borderColor}
    const Line = onPress ? TouchableOpacity : View
    return (
      <Line key={index} style={[styles.line, borderBottom, style]} onPress={onPress}>
        {label ? <Text numberOfLines={1} style={[styles.lineLabel, labelStyle]}>{label}</Text> : null}
        {text ? <Text numberOfLines={1} style={[styles.lineText, textStyle]}>{text}</Text> : null}
        {renderRight && renderRight()}
        {onPress && !renderRight && lineArrow ? this.getArrow() : null}
      </Line>
    )
  }

  render() {
    const {paddingTop, paddingBottom, data} = this.props
    return (
      <View
        style={[styles.container, {
          paddingTop: paddingTop ? Style.cardPadding : 0,
          paddingBottom: paddingBottom ? Style.cardPadding : 0
        }]}
      >
        <View style={styles.cardBox}>
          {this.getTitle()}
          <View style={styles.cardBody}>
            {data && data.map((item, index) => (this.getLine(item, data.length, index)))}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Style.cardBackground
  },
  cardBox: {
    backgroundColor: 'white'
  },
  title: {
    ...Style.flexRow,
    paddingHorizontal: 10,
    borderBottomWidth: Style.px,
    borderBottomColor: Style.borderColor
  },
  titleText: {
    flex: 1,
    lineHeight: Style.cardTitleHeight,
    height: Style.cardTitleHeight,
    fontSize: Style.cardTitleSize,
    color: Style.cardTitleColor
  },
  cardBody: {
    paddingLeft: Style.cardBodyPaddingLeft
  },
  line: {
    ...Style.flexRow,
    justifyContent: 'space-between',
    paddingRight: 10,
    borderBottomWidth: Style.px,
    borderBottomColor: 'transparent'
  },
  lineLabel: {
    lineHeight: Style.cardLabelHeight,
    height: Style.cardLabelHeight,
    fontSize: Style.cardLabelSize,
    color: Style.cardLabelColor
  },
  lineText: {
    flex: 1,
    lineHeight: Style.cardTextHeight,
    height: Style.cardTextHeight,
    fontSize: Style.cardTextSize,
    color: Style.cardTextColor,
    textAlign: 'right',
    paddingHorizontal: 10
  }
})
