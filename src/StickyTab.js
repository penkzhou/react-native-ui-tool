import React from 'react'
import {
  StyleSheet, Text, View, FlatList, TouchableWithoutFeedback
} from 'react-native'
import {PropTypes} from 'prop-types'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Style from './Style'

export default class StickyTab extends React.Component {
  static propTypes = {
    tabs: PropTypes.array.isRequired,
    toggleActive: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired
  }

  static defaultProps = {
  }

  renderTabItem = ({item}) => {
    const textStyle = item.active ? {
      color: Style.stickyTabTextActiveColor
    } : null
    const indicatorStyle = item.active ? {
      backgroundColor: Style.stickyIndicatorBackgroundColor
    } : null
    return (
      <View style={styles.stickyTab}>
        <TouchableWithoutFeedback
          onPress={() => { if (!item.active) this.props.toggleActive(item) }}
        >
          <Text style={[styles.stickyTabText, textStyle]}>{item.text}</Text>
        </TouchableWithoutFeedback>
        <View style={[styles.indicatorStyle, indicatorStyle]} />
      </View>
    )
  }

  renderTabAdd = () => {
    const current = this.props.tabs.find(it => it.active)
    if (!current.add) return null
    return (
      <View style={styles.tabHeader}>
        <Text numberOfLines={1} style={styles.tabTitle}>{current.text}</Text>
        <TouchableWithoutFeedback onPress={this.props.onAdd}>
          <View style={styles.tabIcon}>
            <MaterialIcons name="add" style={styles.tabIconText} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  render() {
    const {tabs} = this.props
    return (
      <View>
        <FlatList
          style={styles.tabContainer}
          data={tabs}
          horizontal
          keyExtractor={item => item.text}
          showsHorizontalScrollIndicator={false}
          renderItem={this.renderTabItem}
        />
        {this.renderTabAdd()}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: Style.stickyTabBackgroundColor
  },
  tabHeader: {
    ...Style.flexRow,
    backgroundColor: Style.stickyBackgroundColor,
    paddingHorizontal: Style.stickyTabTitlePaddingHorizontal,
    paddingVertical: Style.stickyTabTitlePaddingVertical
  },
  tabTitle: {
    width: 0,
    flex: 1,
    fontSize: Style.stickyTabTitleSize,
    color: Style.stickyTabTitleColor
  },
  tabIcon: {
    backgroundColor: Style.white,
    height: Style.stickyTabIconBox,
    width: Style.stickyTabIconBox,
    borderRadius: Style.stickyTabIconBox / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabIconText: {
    fontSize: Style.stickyTabIconSize,
    color: Style.stickyTabIconColor
  },
  stickyTab: {
    paddingHorizontal: Style.stickyTabPadding,
    borderBottomWidth: Style.px,
    borderBottomColor: Style.borderColor
  },
  stickyTabText: {
    height: Style.stickyTabHeight,
    lineHeight: Style.stickyTabHeight,
    color: Style.stickyTabTextColor
  },
  indicatorStyle: {
    height: Style.stickyIndicatorHeight
  }
})
