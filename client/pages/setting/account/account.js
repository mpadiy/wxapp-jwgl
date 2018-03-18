const app = getApp()
var utils = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    pwd: null
  },
  bindChangeId: function (event) {
    console.log(event.detail.value);
    this.setData({ id: event.detail.value });
  },
  bindChangePwd: function (event) {
    console.log(event.detail.value);
    this.setData({ pwd: event.detail.value });
  },
  bindTapLogin: function () {
    var that = this;
    setTimeout(function () {
      var userKey = utils.getUserKey(that.data.id, that.data.pwd);
      wx.request({
        url: 'https://429474271.sduster.com/api/login',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: 'key=' + userKey,
        success: res => {
          if (res.data.code === 1) {
            app.globalData.userKey = userKey;
            app.globalData.account.id = that.data.id;
            app.globalData.account.pwd = that.data.pwd;
            app.globalData.userInfo.id = res.data.res.id;
            app.globalData.userInfo.name = res.data.res.name;
            wx.setStorageSync('globalData', app.globalData);
            wx.navigateBack();
          }
          else if (res.data.code === 0) {
            wx.showToast({
              title: '登录失败，请检查您的用户名密码！',
              icon: 'none',
              duration: 1000
            })
          }
          else {
            wx.showToast({
              title: '登录失败,请稍后重试！',
              icon: 'none',
              duration: 1000
            })
          }
        },
        fail: res => {
          wx.showToast({
            title: '登录失败,请检查您的网络连接！',
            icon: 'none',
            duration: 1000
          })
        }
      })
    }, 300);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})