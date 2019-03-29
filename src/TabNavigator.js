import React from 'react'
import {StyleSheet, View} from 'react-native'
import {PropTypes} from 'prop-types'
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import Style from './Style'

export default class TabNavigator extends React.Component {
  static propTypes = {
    // tab头部
    items: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      params: PropTypes.any,
      screen: PropTypes.func.isRequired
    })).isRequired,
    // 传递给TabPage的额外参数
    extraProps: PropTypes.object,
    tabBarOptions: PropTypes.object,
    tabWidth: PropTypes.number
  }

  static defaultProps = {
    extraProps: {},
    tabBarOptions: {},
    tabWidth: Style.tabNavWidth
  }

  componentDidMount() {
  }

  // 获取tabs页面
  getTabs = () => {
    const tabs = {}
    const {items, extraProps} = this.props
    items.forEach((item, index) => {
      const Screen = item.screen
      tabs[`tab${index}`] = {
        screen: props => (<Screen {...props} {...extraProps} params={item.params} />),
        navigationOptions: {
          title: item.text
        }
      }
    })
    return tabs
  }

  // 获取tabs导航
  getTabNavigator = () => {
    const {tabBarOptions, tabWidth} = this.props
    return createAppContainer(createMaterialTopTabNavigator(
      this.getTabs(), {
        tabBarOptions: {
          tabStyle: [styles.tabBarStyle, {width: tabWidth}],
          upperCaseLabel: false,
          scrollEnabled: true,
          style: styles.tabStyle,
          indicatorStyle: styles.indicatorStyle,
          labelStyle: styles.labelStyle,
          ...tabBarOptions
        },
        lazy: true
      }
    ))
  }

  render() {
    const TabWrapperNavigator = this.getTabNavigator()
    return (
      <View style={styles.container}>
        <TabWrapperNavigator />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabBarStyle: {
    padding: 0
  },
  tabStyle: {
    backgroundColor: Style.mainColor,
    height: 30
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  labelStyle: {
    fontSize: 13,
    margin: 0
  }
})
