import React from 'react'
import {PropTypes} from 'prop-types'
import {
  SectionList, StyleSheet, View, FlatList, Text, TouchableWithoutFeedback, RefreshControl
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Style from './Style'

export default class StickyPage extends React.Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      screen: PropTypes.func.isRequired,
      params: PropTypes.any,
      add: PropTypes.bool
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

  onAdd = () => {
    if (this.screen.onAdd) {
      this.screen.onAdd()
    }
  }

  renderSectionHeader = (tabs, active, tab) => (
    <View>
      <FlatList
        style={styles.tabContainer}
        data={tabs}
        horizontal
        extraData={active}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => this.renderTabItem(item, item.key === active)}
      />
      {tab.add ? (
        <View style={styles.tabHeader}>
          <Text numberOfLines={1} style={styles.tabTitle}>{tab.text}</Text>
          <TouchableWithoutFeedback onPress={this.onAdd}>
            <View style={styles.tabIcon}>
              <MaterialIcons name="add" style={styles.tabIconText} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      ) : null}
    </View>
  )

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

  renderItem = (Screen, tab, tabParams, data) => (
    <View style={[styles.screen, tab.add ? null : styles.screenTop]}>
      <Screen
        tab={tab}
        params={{...tab.params, ...tabParams}}
        stopRefreshing={this.stopRefreshing}
        ref={(screen) => { this.screen = screen }}
        data={data}
        setData={this.setDataHandler}
      />
    </View>
  )

  render() {
    const {tabs, tabParams} = this.props
    const {refreshing, active, data} = this.state
    const tab = tabs.find(it => it.key === active)
    const sections = [{key: 'key', data: ['item']}]
    return (
      <SectionList
        style={styles.container}
        ListHeaderComponent={(
          <View style={styles.header}>
            {this.props.header()}
          </View>
        )}
        stickySectionHeadersEnabled
        renderSectionHeader={() => this.renderSectionHeader(tabs, active, tab)}
        keyExtractor={(item, index) => `${index}`}
        renderItem={() => this.renderItem(tab.screen, tab, tabParams, data[active])}
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
  bgWhite: {
    backgroundColor: Style.white
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
  },
  screenTop: {
    paddingTop: Style.stickyBackgroundHeight
  },
  screen: {
    paddingBottom: Style.stickyBackgroundBottom
  }
})
