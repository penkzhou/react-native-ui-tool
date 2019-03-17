import React from 'react'
import {PropTypes} from 'prop-types'
import {
  SectionList, StyleSheet, View, FlatList, Text, TouchableWithoutFeedback, RefreshControl
} from 'react-native'
import RefreshControlPlus from './RefreshControlPlus'
import Style from './Style'

export default class StickyTabs extends React.Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      screen: PropTypes.func.isRequired,
      params: PropTypes.any
    })).isRequired,
    tabParams: PropTypes.any,
    initIndex: PropTypes.number,
    header: PropTypes.func,
    renderTabItem: PropTypes.func,
    onRefresh: PropTypes.func
  }

  static defaultProps = {
    tabParams: null,
    initIndex: 0,
    header: null,
    renderTabItem: null,
    onRefresh: null
  }

  constructor(props) {
    super(props)
    const {tabs, initIndex} = this.props
    this.state = {
      active: tabs[initIndex].key,
      data: {},
      refreshing: false
    }
  }

  componentDidMount() {
    this.mount = true
    this.screenDataInit()
  }

  componentDidUpdate(pr, state) {
    const current = this.state.active
    if (current !== state.active) {
      this.screenDataInit()
    }
  }

  componentWillUnmount() {
    this.mount = false
  }

  // 进入页面事件
  screenDataInit = () => {
    const {dataInit} = this.screen
    if (dataInit instanceof Function) dataInit()
  }

  // 下拉刷新事件
  refreshEvent = () => {
    this.refreshHeader()
    this.refreshScreen()
  }

  refreshHeader = () => {
    const {onRefresh} = this.props
    if (onRefresh instanceof Function) {
      this.setState({refreshing: true})
      onRefresh()
    }
  }

  refreshScreen = () => {
    const {refresh} = this.screen
    if (refresh instanceof Function) {
      this.setState({refreshing: true})
      refresh()
    }
  }

  stopRefreshing = () => {
    if (this.mount && this.state.refreshing) {
      this.setState({
        refreshing: false
      })
    }
  }

  toggleTab = ({key}) => {
    if (this.state.action !== key) {
      this.setState({
        active: key
      })
    }
  }

  setDataHandler = (newData) => {
    if (this.mount) {
      const {active, data} = this.state
      this.setState({
        data: {...data, [active]: newData}
      })
      this.stopRefreshing()
    }
  }

  renderSectionHeader = () => {
    const {refreshing, active} = this.state
    console.log(this.state)
    const {tabs} = this.props
    return (
      <FlatList
        style={styles.tabContainer}
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => this.renderTabItem(item, active)}
      />
    )
  }

  renderTabItem = (item, active) => {
    console.log(this.state)
    const {renderTabItem} = this.props
    const isActive = item.key === this.state.active
    if (renderTabItem) return renderTabItem({item}, isActive)
    const textStyle = {}
    const indicatorStyle = {}
    if (isActive) {
      textStyle.color = Style.stickyTabTextActiveColor
      indicatorStyle.backgroundColor = Style.stickyIndicatorBackgroundColor
    }
    return (
      <View style={styles.stickyTab}>
        <TouchableWithoutFeedback onPress={() => this.toggleTab(item)}>
          <Text style={[styles.stickyTabText, textStyle]}>{item.text}</Text>
        </TouchableWithoutFeedback>
        <View style={[styles.indicatorStyle, indicatorStyle]} />
      </View>
    )
  }

  renderItem = () => {
    const {tabs, tabParams} = this.props
    const {active, data} = this.state
    const tab = tabs.find(it => it.key === active)
    const Screen = tab.screen
    return (
      <View style={styles.screen}>
        <Screen
          tab={tab}
          params={{...tab.params, ...tabParams}}
          stopRefreshing={this.stopRefreshing}
          ref={(screen) => { this.screen = screen }}
          data={data[active]}
          setData={this.setDataHandler}
        />
      </View>
    )
  }

  render() {
    const {tabs, active} = this.props
    return (
      <FlatList
        style={styles.tabContainer}
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => this.renderTabItem(item, active)}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Style.stickyBackgroundColor,
  },
  header: {
    borderBottomWidth: Style.stickyBackgroundHeight,
    borderBottomColor: Style.stickyBackgroundColor,
    backgroundColor: Style.white
  },
  tabContainer: {
    backgroundColor: Style.stickyTabBackgroundColor
  },
  bgWhite: {
    backgroundColor: Style.white
  },
  stickyTab: {
    paddingHorizontal: Style.stickyTabPadding
  },
  stickyTabText: {
    height: Style.stickyTabHeight,
    lineHeight: Style.stickyTabHeight,
    color: Style.stickyTabTextColor
  },
  indicatorStyle: {
    height: Style.stickyIndicatorHeight
  },
  screen: {
    paddingTop: Style.stickyBackgroundHeight,
    paddingBottom: Style.stickyBackgroundBottom
  }
})
