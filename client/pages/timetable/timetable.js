const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    timetable: null,
    weekList: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周', '第21周', '第22周', '第23周', '第24周', '第25周'],
    weekNow: 1,
    startDate: { year: '2018', month: '3', day: '5' },
    dateList: ['3-5', '3-6', '3-7', '3-8', '3-9', '3-10', '3-11']
  },
  /**
   * 绑定选择周次事件
   */
  bindChangeWeek: function (e) {
    this.setData({
      weekNow: parseInt(e.detail.value) + 1
    });
    this.changeDateList(this.data.weekNow);
  },
  /**
   * 更改周次时获取相应的日期
   */
  changeDateList: function (weekNow) {
    var start = new Date((new Date(this.data.startDate.year + '/' + this.data.startDate.month + '/' + this.data.startDate.day)).getTime() + 604800000 * (weekNow - 1));
    var dateList = [];
    for (var i = 0; i < 7; i++) {
      var date = new Date(start.getTime() + 86400000 * i);
      dateList.push(String(date.getMonth() + 1) + '-' + String(date.getDate()))
    }
    this.setData({
      dateList: dateList
    });
  },
  /**
   * 获取并更改当前时间的周次
   */
  changeWeekNow: function () {
    var diff = (new Date()).getTime() - (new Date(this.data.startDate.year + '/' + this.data.startDate.month + '/' + this.data.startDate.day)).getTime();
    if (diff <= 0) {
      this.setData({
        weekNow: 1
      });
    }
    else {
      this.setData({
        weekNow: Math.floor(((new Date()).getTime() - (new Date(this.data.startDate.year + '/' + this.data.startDate.month + '/' + this.data.startDate.day)).getTime()) / 604800000) + 1
      });
    }
    this.changeDateList(this.data.weekNow);
  },
  /**
   * 当初次载入时在线获取课表
   */
  onLoad: function (options) {
    this.changeWeekNow();
    if (app.globalData.userKey) {
      wx.request({
        url: 'https://429474271.sduster.com/api/kbcx',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: 'key=' + app.globalData.userKey,
        success: res => {
          if (res.data.code === 1) {
            this.setData({ timetable: res.data.res });
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
              title: '在线获取课表失败,请稍后重试！',
              icon: 'none',
              duration: 1000
            })
          }
        },
        fail: res => {
          wx.showToast({
            title: '在线获取课表失败,请检查您的网络连接！',
            icon: 'none',
            duration: 1000
          })
        }
      })
    } else {

    }
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
    if (!app.globalData.userKey) {
      this.setData({ timetable: null });
    }

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
   * 用户下拉刷新时在线获取课表
   */
  onPullDownRefresh: function () {
    this.changeWeekNow();
    if (app.globalData.userKey) {
      wx.request({
        url: 'https://429474271.sduster.com/api/kbcx',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: 'key=' + app.globalData.userKey,
        success: res => {
          console.log(res);
          if (res.data.code === 1) {
            this.setData({ timetable: res.data.res });
            wx.showToast({
              title: '在线获取课表成功！',
              icon: 'none',
              duration: 1000
            })
          } else if (res.data.code === 0) {
            wx.showToast({
              title: '登录失败，请检查您的用户名密码！',
              icon: 'none',
              duration: 1000
            })
          }
          else {
            wx.showToast({
              title: '在线获取课表失败,请稍后重试！',
              icon: 'none',
              duration: 1000
            })
          }

        },
        fail: res => {
          wx.showToast({
            title: '在线获取课表失败,请检查您的网络连接！',
            icon: 'none',
            duration: 1000
          })
        },
        complete: res => {
          wx.stopPullDownRefresh();
        }
      })
    } else {
      wx.showToast({
        title: '请先登录！',
        icon: 'none',
        duration: 1000
      });
      wx.stopPullDownRefresh();
    }

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