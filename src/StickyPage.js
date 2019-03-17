import React from 'react'
import {PropTypes} from 'prop-types'
import {
  SectionList, StyleSheet, View, FlatList, Text, TouchableWithoutFeedback, RefreshControl
} from 'react-native'
import Style from './Style'

export default class StickyPage extends React.Component {
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
    if (this.screen && this.screen.dataInit instanceof Function) {
      this.screen.dataInit()
    }
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
    const {tabs} = this.props
    const {active} = this.state
    return (
      <FlatList
        style={styles.tabContainer}
        data={tabs}
        horizontal
        extraData={active}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => this.renderTabItem(item, item.key === active)}
      />
    )
  }

  renderTabItem = (item, isActive) => {
    const {renderTabItem} = this.props
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
    const {refreshing} = this.state
    const sections = [{key: 'key', data: ['item']}]
    return (
      <SectionList
        style={styles.container}
        ListHeaderComponent={(
          <View style={styles.header}>
            {this.props.header()}
          </View>
        )}
        renderSectionHeader={this.renderSectionHeader}
        stickySectionHeadersEnabled
        keyExtractor={(item, index) => `${index}`}
        renderItem={this.renderItem}
        sections={sections}
        refreshControl={(
          <RefreshControl
            title={Style.loadingTitle}
            titleColor={Style.loadingColor}
            colors={[Style.loadingColor]}
            refreshing={refreshing}
            onRefresh={this.refreshEvent}
            tintColor={Style.loadingColor}
          />
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Style.stickyBackgroundColor
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
