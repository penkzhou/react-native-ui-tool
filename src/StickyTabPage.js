import React from 'react'
import {
  StyleSheet, View, ScrollView, RefreshControl
} from 'react-native'
import {PropTypes} from 'prop-types'
import Style from './Style'
import StickyTab from './StickyTab'

export default class StickyTabPage extends React.Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      screen: PropTypes.func.isRequired,
      params: PropTypes.any,
      add: PropTypes.bool
    })).isRequired,
    tabParams: PropTypes.any,
    header: PropTypes.func,
    onRefresh: PropTypes.func
  }

  static defaultProps = {
    tabParams: null,
    header: null,
    onRefresh: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      tabs: [...this.props.tabs],
      fullData: {},
      refreshing: false
    }
  }

  // 下拉刷新事件
  refreshEvent = () => {
    this.setState({refreshing: true})
    this.props.onRefresh()
    this.screenEvent('onRefresh')
  }

  // 刷新完成事件
  stopRefreshing = () => {
    this.setState({refreshing: false})
  }

  // 新建事件
  onAdd = () => {
    this.screenEvent('onAdd')
  }

  // 切换Tab页
  toggleTabActive = ({text}) => {
    const tabs = this.state.tabs.map(tab => ({...tab, active: tab.text === text}))
    this.setState({tabs})
  }

  // screen事件
  screenEvent = (event, ...params) => {
    if (this.screen && this.screen[event] instanceof Function) {
      this.screen[event](...params)
    }
  }

  // screen存储数据
  setDataHandler = (data, key) => {
    const {fullData} = this.state
    fullData[key] = data
    this.setState({fullData})
  }

  render() {
    const {header, tabParams} = this.props
    const {tabs, refreshing, fullData} = this.state
    const current = tabs.find(it => it.active)
    const Screen = current.screen
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        stickyHeaderIndices={[1]}
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
      >
        <View style={styles.header}>
          {header && header()}
        </View>
        <StickyTab
          tabs={tabs}
          toggleActive={this.toggleTabActive}
          onAdd={this.onAdd}
        />
        <View style={[styles.screen, current.add ? null : styles.screenTop]}>
          <Screen
            key={current.text}
            tab={current}
            params={{...current.params, ...tabParams}}
            stopRefreshing={this.stopRefreshing}
            ref={(screen) => { this.screen = screen }}
            data={fullData[current.text]}
            setData={(data) => this.setDataHandler(data, current.text)}
          />
        </View>
      </ScrollView>
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
  screenTop: {
    paddingTop: Style.stickyBackgroundHeight
  },
  screen: {
    paddingBottom: Style.stickyBackgroundBottom
  }
})
