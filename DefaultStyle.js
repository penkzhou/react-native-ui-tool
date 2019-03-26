import {PixelRatio, DeviceInfo, Platform} from 'react-native'

export default class DefaultStyle {
  static blueWhite = '#EBF1FF'

  static blueLight = '#8aa8f4'

  static blue = '#4275f4'

  static blueDark = '#2f63e6'

  static aquamarine = '#46d9be'

  static cyanDark = '#6dbccd'

  static dark1 = '#000'

  static dark2 = '#333333'

  static dark3 = '#505050'

  static dark4 = '#666666'

  static dark5 = '#aaa'

  static dark6 = '#e3e3e3'

  static dark7 = '#f1f1f1'

  static success = '#5cb85c'

  static warning = '#f0ad4e'

  static danger = '#d9534f'

  static white = '#ffffff'

  static mainColor = DefaultStyle.blue

  static mainColorFocus = DefaultStyle.blueDark

  static borderColor = DefaultStyle.dark6

  static textColor = DefaultStyle.dark2

  static labelColor = DefaultStyle.dark5

  static placeholderColor = DefaultStyle.dark4

  static primary = DefaultStyle.mainColor

  // Loading
  static loadingTitle = 'Loading'

  static loadingColor = DefaultStyle.mainColor

  // Empty
  static emptySource = require('./img/empty.png')

  static emptyPadding = 20

  static emptyWidth = 100

  static emptyHeight = 60

  static emptyText = '暂无数据'

  static emptyTextColor = DefaultStyle.dark5

  static emptyTextSize = 12

  static emptyAddText = '添加'

  static emptyAddBackgroundColor = DefaultStyle.white

  static emptyAddTextColor = DefaultStyle.mainColor

  static emptyAddTextSize = DefaultStyle.emptyTextSize

  static emptyAddTextHeight = 28

  static emptyAddTextPadding = 20

  // Button
  static btnBorderRadius = 2

  static btnHeight = 35

  static btnFontSize = 12

  // ActionSheet
  static actionSheetCancelText = '取消'

  static actionSheetTintColor = '#007AFF'

  // SafeAreaViewPlus
  static safeAreaTopHeight = 44

  static safeAreaBottomHeight = 34

  // NavigationBar
  static barBackIconSize = 26

  static barBackIconColor = 'white'

  static barBackTextSize = 18

  static barBackTextColor = 'white'

  // Form
  static formLabelColor = DefaultStyle.dark6

  static formLabelSize = 10

  static formTextPaddingVertical = 5

  static formTextHeight = 20

  static formTextSize = 14

  static formWarningHeight = 22

  static formWarningFontSize = 10

  static formWarningLineHeight = 20

  static formWarningColor = DefaultStyle.warning

  static formBorderColorWarning = DefaultStyle.warning

  static formBorderColorFocus = DefaultStyle.blue

  static formBorderColor = DefaultStyle.borderColor

  static formTextColor = '#000000'

  static formPlaceholderColor = '#cdd3e3'

  // StickyPage
  static stickyBackgroundColor = DefaultStyle.dark7

  static stickyBackgroundHeight = 15

  static stickyBackgroundBottom = 50

  static stickyTabBackgroundColor = DefaultStyle.white

  static stickyTabPadding = 20

  static stickyTabHeight = 40

  static stickyTabTextColor = DefaultStyle.dark4

  static stickyTabTextActiveColor = DefaultStyle.mainColor

  static stickyIndicatorBackgroundColor = DefaultStyle.mainColor

  static stickyIndicatorHeight = 2

  static stickyTabTitleSize = 20

  static stickyTabTitlePaddingHorizontal = DefaultStyle.stickyTabPadding

  static stickyTabTitlePaddingVertical = 12

  static stickyTabTitleColor = DefaultStyle.dark5

  static stickyTabIconColor = DefaultStyle.mainColor

  static stickyTabIconSize = 20

  static stickyTabIconBox = 30

  // Card
  static cardPadding = 15

  static cardBackground = DefaultStyle.dark7

  static cardTitleHeight = 50

  static cardTitleSize = 16

  static cardTitleColor = DefaultStyle.dark2

  static cardLabelHeight = 40

  static cardLabelSize = 14

  static cardLabelColor = DefaultStyle.dark4

  static cardTextHeight = 40

  static cardTextSize = 14

  static cardTextColor = DefaultStyle.dark2

  static cardArrowSize = 20

  static cardArrowColor = DefaultStyle.dark5

  static cardBodyPaddingLeft = 20

  // List
  static listTitleColor = DefaultStyle.dark3

  static listTitleSize = 15

  static listTitleHeight = 30

  static listGrayColor = DefaultStyle.dark5

  static listGraySize = 10

  static listIconColor = DefaultStyle.dark3

  static listQuickWidth = 80

  static listQuickBackgroundColor = DefaultStyle.dark6

  static listQuickColor = DefaultStyle.dark3

  static listQuickIconSize = 20

  static listQuickTextSize = 14

  // 导航栏样式
  static barStyle = 'default'

  // 导航栏在iOS中的高度
  static navBarHeightIos = 44

  // 导航栏在Android中的高度
  static navBarHeightAndroid = 50

  // 导航栏的高度
  static navBarHeight = Platform.OS === 'ios' ? DefaultStyle.navBarHeightIos : DefaultStyle.navBarHeightAndroid

  // 状态栏在iOS中的高度
  static statusBarHeightIos = DeviceInfo.isIPhoneX_deprecated ? 0 : 20

  // 状态栏的高度
  static statusBarHeight = Platform.OS === 'ios' ? DefaultStyle.statusBarHeightIos : 0

  // 圆角
  static radius = 2

  // 1像素
  static px = 1 / PixelRatio.get()

  // 阴影
  static shadow = {
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  }

  // 横向居中
  static flexRow = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }

  // lineBottom
  static lineBottom = {
    borderBottomWidth: DefaultStyle.px,
    borderBottomColor: DefaultStyle.borderColor
  }
}
