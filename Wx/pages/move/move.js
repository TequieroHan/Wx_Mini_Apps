var util = require('../../utils/util.js')
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    inSearch: {},

    searchvalue: "",
    weekly: {},
    newMovies: {},
    isSearchEmpty: true,
    isEmpty: true,
    totalCount: 0,

  },
  onDetails: function (even) {
    console.log("详情")
  },
  /**
   * 获取焦点时响应
   */
  onBindFocus: function (even) {
    this.setData({
      isSearchEmpty: false,
    })
  },
  /**
   * 失去焦点时响应
   */
  onBindBlur: function (even) {
    this.data.totalCount += 0;
    var value = even.detail.value;
    if (value !== "" && value !== this.data.searchvalue) {
      var inSearchURL = app.globalData.g_api + "/v2/movie/search?q=" + value;
      this.movesData(inSearchURL, "inSearch", "搜索");
      this.setData({
        isSearchEmpty: false,
        searchvalue: value,
      })
    } else {
      this.setData({
        isSearchEmpty: true,
        searchvalue: "",
        inSearch: {}
      })
    }
  },
  /**
   * 使用关闭按钮
   */
  onCloseSearch: function (even) {
    this.setData({
      isSearchEmpty: true,
      searchvalue: "",
      inSearch: {}
    })
  },
  /**
   * 更多跳转
   */
  onMoreTop: function (even) {
    var nametitle = even.currentTarget.dataset.nametitle;
    wx.navigateTo({
      url: '/pages/move/more-move/more-move?nametitle=' + nametitle,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //正在上映
    var inTheatersURL = app.globalData.g_api + "/v2/movie/in_theaters?start=0&count=3";
    var comingSoonURL = app.globalData.g_api + "/v2/movie/coming_soon?start=0&count=3";
    var top250URL = app.globalData.g_api + "/v2/movie/top250?start=0&count=3";
    this.movesData(inTheatersURL, "inTheaters", "正在上映");
    this.movesData(comingSoonURL, "comingSoon", "即将上映");
    this.movesData(top250URL, "top250", "Top250");
  },
  /*
  *豆瓣网络请求
  */
  movesData: function (moveulr, netType, title) {
    var that = this;
    wx.request({
      url: moveulr,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.processDoubanData(res.data, netType, title);
      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    });
  },
  /**
   * 豆瓣网络数据接受
   */
  processDoubanData: function (data, settedKey, titleName) {
    var that = this;

    var movies = [];
    for (var index in data.subjects) {
      var subject = data.subjects[index];
      var title = subject.title
      if (title.length > 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        stars: util.startCount(subject.rating.stars),
        average: subject.rating.average,
        image: subject.images.large,
        title: title,
        id: subject.id,
      }
      movies.push(temp);
    };
    if (!this.data.isSearchEmpty) {

      var totalMovies = {};
      if (!this.data.isEmpty) {
        totalMovies[settedKey] = { movies: that.data.inSearch.movies.concat(movies) };
      } else {
        totalMovies[settedKey] = { movies };
        this.data.isEmpty = false;
      }
      this.setData(totalMovies);
    } else {
      var readyData = {};
      readyData[settedKey] = { movies, nameTitle: titleName, netType: settedKey };
      this.setData(readyData);
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
    if (!this.data.isSearchEmpty) {
      this.data.totalCount += 20;
      var inSearchURL = app.globalData.g_api + "/v2/movie/search?q=" + this.data.searchvalue + "&start=" + this.data.totalCount + "&count=20";
      this.movesData(inSearchURL, "inSearch", "搜索");
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})