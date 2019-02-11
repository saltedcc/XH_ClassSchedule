//index.js
var app = getApp()

//引入64编码js文件
var sercet = require("../../helper/base64.js");
Page({
  // 初始数据
  data: {
    colorArrays: ["#90C652", "#feb64d", "#FC9F9D", "#63d5b2", "#60acfc", "#23c2db",],
    wlist:{},
  },

  // 进入页面
  onLoad: function () {
    this.dd();
  },

  // 发送请求，各种状态码的处理
  dd: function () {
    var that = this;
    // 获取全局的的id pwd
    var id = app.globalData.bindUser.userId;
    var pwd = sercet.base64encode(app.globalData.bindUser.pwd);
    // 一学期总周数
    var lastweek = 20;
    wx.request({
      url: 'https://api.zhlh6.cn/v1/schedule',
      data: {
        id: id,
        pwd: pwd
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.data.code == 200) {
          var week = res.data.data.week - 1; //0
          var rweek = res.data.data.week;//用于
          var totalweek = [];//在页面上的值
          var totalweek_ = [];//选项卡里的值
          var course=[];
          for (var i = 1; i <= 20; i++) {
            totalweek[i] = '第' + i + '周';
            if(i==rweek){
              totalweek_[i] = '第' + i + '周(本周)';               
            }else{
              totalweek_[i] = '第' + i + '周';
            }
          }
          // 删除数组第一个null
          totalweek_.splice(0, 1);
          // 删除数组第一个null
          totalweek.splice(0, 1);
          // 清除202产生的等待框
          wx.hideLoading();

          //双重循环二维数组
          var t =0;
          for (var i = 0;i<res.data.data.courses.length;i++){
            // console.log(i+'天');
            for(var j = 0;j<res.data.data.courses[i].class.length;j++){
              course[t]= res.data.data.courses[i].class[j];
              t += 1;
            }
          }
          that.setData({
            wlist:course,
            week: week,
            rweek:rweek,
            totalweek: totalweek,
            totalweek_: totalweek_,
            condition: 1
          })

        } else if (res.data.code == 202) {
          wx.showLoading({
            title: '正在读取数据',
            icon: 'loading',
            showCancel: false
          })
          // 设置定时器，10秒请求一次
          setTimeout(function () {
            that.dd();
          }, 10000) //延迟时间 这里是10秒

        }else if (res.data.code == 401){
          wx.showToast({
            title: '密码错误',
            icon: 'loading',
            showCancel: false
          })
        } else if (res.data.code == 500){
          wx.showToast({
            title: '服务器出错',
            icon: 'loading',
            showCancel: false
          })
          
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })

  },

  //进入课程详情 
  showCardView: function (e) {
    var id = e.currentTarget.dataset.id;
    var classname = e.currentTarget.dataset.cname;
    var ctype = e.currentTarget.dataset.type;
    var croom = e.currentTarget.dataset.croom;
    var cteacher = e.currentTarget.dataset.cteacher;
    var cwstart = e.currentTarget.dataset.cwstart;
    var cstart = e.currentTarget.dataset.cstart;
    var cwend = e.currentTarget.dataset.cwend;
    var cend = e.currentTarget.dataset.cend;

    wx.navigateTo({
      url: '../detail/detail?id=' + id + '&name=' + classname + '&ctype=' + ctype + '&croom=' + croom + '&cstart=' + cstart + '&cwstart=' + cwstart + '&cwend=' + cwend + '&cend=' + cend + '&cteacher=' + cteacher,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  // 更换周数
  bindPickerChange: function (e) {
    var num = parseInt(e.detail.value);
    this.setData({
      index: e.detail.value,
      week: num + 1,
      condition: 2
    })
  }

  
})
