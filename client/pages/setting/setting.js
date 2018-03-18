const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData.userInfo
  },
  bindtapLogout: function () {
    var that = this;
    wx.showModal({
      title: '退出登录',
      content: '是否退出登录？',
      confirmText: '退出',
      cancelText: '取消',
      success: function (res) {
        if (res.confirm) {
          app.globalData.userInfo.id = null;
          app.globalData.userInfo.name = null;
          app.globalData.userKey = null;
          app.globalData.account.id = null;
          app.globalData.account.pwd = null;
          wx.setStorageSync('globalData', app.globalData);
          that.setData({
            userInfo: app.globalData.userInfo
          });
        }
      }
    });

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
    this.setData({
      userInfo: app.globalData.userInfo
    })
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