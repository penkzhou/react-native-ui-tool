import React from 'react'
import {StyleSheet, View} from 'react-native'
import {PropTypes} from 'prop-types'
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import Style from './Style'
import ListPage from './ListPage'

export default class TabNavigator extends React.Component {
  static propTypes = {
    // tab头部
    items: PropTypes.array.isRequired,
    // tab页 -> render组件 或 List
    tabPage: PropTypes.oneOfType([
      PropTypes.oneOf(['List']),
      PropTypes.element
    ]),
    // 传递给TabPage的额外参数
    listProps: PropTypes.object
  }

  static defaultProps = {
    tabPage: 'List',
    listProps: {}
  }

  componentDidMount() {
  }

  // 获取tabs页面
  getTabs = () => {
    const tabs = {}
    const {items, tabPage, listProps} = this.props
    const TabPage = tabPage === 'List' ? ListPage : tabPage
    items.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => (<TabPage {...props} {...listProps} params={item.params} />),
        navigationOptions: {
          title: item.name
        }
      }
    })
    return tabs
  }

  // 获取tabs导航
  getTabNavigator = () => createAppContainer(createMaterialTopTabNavigator(
    this.getTabs(), {
      tabBarOptions: {
        tabStyle: styles.tabStyle,
        upperCaseLabel: false, // 是否使标签大写，默认为true
        scrollEnabled: true, // 是否支持 选项卡滚动，默认false
        style: {
          backgroundColor: Style.mainColor, // TabBar 的背景颜色
          height: 30// fix 开启scrollEnabled后再Android上初次加载时闪烁问题
        },
        indicatorStyle: styles.indicatorStyle, // 标签指示器的样式
        labelStyle: styles.labelStyle// 文字的样式
      },
      lazy: true
    }
  ))

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
  tabStyle: {
    // minWidth: 50 //fix minWidth会导致tabStyle初次加载时闪烁
    padding: 0
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
