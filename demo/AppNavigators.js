import {createStackNavigator, createAppContainer} from 'react-navigation'
import Main from './main'
import Button from './button'
import Buttons from './buttons'
import SafeAreaViewPlus from './safeAreaViewPlus'
import StatusBarPlus from './statusBarPlus'
import NavigationBar from './navigationBar'
import VerticalView from './verticalView'
import TabPage from './tabPage'

const AppNavigators = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      header: null
    }
  },
  Button: {
    screen: Button,
    navigationOptions: {
      header: null
    }
  },
  Buttons: {
    screen: Buttons,
    navigationOptions: {
      header: null
    }
  },
  SafeAreaViewPlus: {
    screen: SafeAreaViewPlus,
    navigationOptions: {
      header: null
    }
  },
  StatusBarPlus: {
    screen: StatusBarPlus,
    navigationOptions: {
      header: null
    }
  },
  NavigationBar: {
    screen: NavigationBar,
    navigationOptions: {
      header: null
    }
  },
  VerticalView: {
    screen: VerticalView,
    navigationOptions: {
      header: null
    }
  },
  TabPage: {
    screen: TabPage,
    navigationOptions: {
      header: null
    }
  }
}, {
  initialRouteName: 'Main'
})

export default createAppContainer(AppNavigators)
