import React from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native'
import {PropTypes} from 'prop-types'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Style from './Style'

export default class ItemLine extends React.Component {
  static propTypes = {
    last: PropTypes.bool,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    leftIcon: PropTypes.shape({
      icon: PropTypes.any,
      name: PropTypes.string,
      size: PropTypes.number,
      color: PropTypes.string
    }),
    option: PropTypes.func,
    onPress: PropTypes.func
  }

  static defaultProps = {
    last: false,
    title: '',
    subTitle: '',
    leftIcon: null,
    option: null,
    onPress: null
  }

  renderIcon = ({
    icon, name, size = 24, color = Style.listIconColor
  }) => {
    const IconEl = icon
    return <IconEl name={name} style={[styles.icon, {fontSize: size, color}]} />
  }

  renderOption = () => (
    <TouchableOpacity onPress={this.props.option}>
      <MaterialIcons name="more-horiz" style={styles.icon} />
    </TouchableOpacity>
  )

  render() {
    const {
      last, title, subTitle, leftIcon, option, onPress
    } = this.props
    const Content = onPress ? TouchableWithoutFeedback : View
    return (
      <View style={styles.container}>
        <Content onPress={onPress}>
          <View style={[styles.lineContainer, {borderBottomColor: last ? 'transparent' : Style.borderColor}]}>
            {leftIcon && this.renderIcon(leftIcon)}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subTitle}>{subTitle}</Text>
            </View>
            {option && this.renderOption()}
          </View>
        </Content>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Style.white
  },
  lineContainer: {
    ...Style.flexRow,
    backgroundColor: Style.white,
    borderBottomColor: 'transparent',
    borderBottomWidth: Style.px,
    height: 60
  },
  icon: {
    fontSize: 24,
    paddingHorizontal: 15,
    color: Style.listIconColor
  },
  textContainer: {
    width: 0,
    flex: 1
  },
  title: {
    color: Style.listTitleColor,
    lineHeight: Style.listTitleHeight,
    fontSize: Style.listTitleSize
  },
  subTitle: {
    color: Style.listGrayColor,
    fontSize: Style.listGraySize
  },
  moreContainer: {
    padding: 10,
    backgroundColor: Style.dark7
  },
  moreBg: {
    backgroundColor: Style.white
  }
})
