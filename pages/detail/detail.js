// pages/detail/detail.js
var app = getApp()
Page({


  /**
   * 页面的初始数据
   */
  
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    var name=e.name;
    var ctype = e.ctype;
    var croom = e.croom;
    var cteacher = e.cteacher;
    var cwstart = e.cwstart;
    var cstart = e.cstart;
    var cwend = e.cwend;
    var cend = e.cend;
    var alist = app.globalData.alist;
    that.setData({
      class_name:name,
      class_type:ctype,
      class_room:croom,
      class_cteacher: cteacher,
      class_cstart: cstart,
      class_cwstart: cwstart,
      class_cend: cend,
      class_cwend: cwend,
      // wlist:alist
    })
    // var pages = getCurrentPages();             //  获取页面栈
    // var currPage = pages[pages.length - 1];    // 当前页面
    // var prevPage = pages[pages.length - 2];    // 上一个页面
    // prevPage.setData({
    //   condition:3,
    //   week:1                     // 假数据
    // })
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