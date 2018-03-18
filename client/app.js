//app.js
var utils = require('./utils/util.js');
App({
  onLaunch: function () {
    this.globalData = wx.getStorageSync('globalData');
    if (!this.globalData) {
      this.globalData = {
        userInfo: {
          id: null,
          name: null
        },
        userKey: null,
        account: {
          id: null,
          pwd: null
        }
      }
    }
  },
  globalData: {
    userInfo: {
      id: null,
      name: null
    },
    userKey: null,
    account: {
      id: null,
      pwd: null
    }
  }
})