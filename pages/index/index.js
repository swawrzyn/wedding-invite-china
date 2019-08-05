const order = ['one', 'two', 'three'];
Page({
  data: {
    barHeight: 0,
    initTouch: 0,
    currentPage: 0,
    windowHeight: 0,
    containerHeight: 0,
    toSect: 'one',
    isScroll: false,
    initalLoad: false,
  },
  onLoad: function () {
    const sysInfo = wx.getSystemInfoSync();
    const self = this;
    setTimeout(function(){
      self.setData({
        initalLoad: true,
      })
    }, 2000);

    this.setData({
      barHeight: sysInfo.statusBarHeight,
      windowHeight: sysInfo.windowHeight,
      containerHeight: sysInfo.windowHeight,
    });
  },

  setInitPos: function (e) {
    this.setData({
      initTouch: e.touches[0].pageY,
    })
  },

  scrollTo: function (e) {
    const wiggleRoom = Math.abs(this.data.initTouch - e.changedTouches[0].pageY) > 20;
    const currentPage = this.data.currentPage;
    console.log(currentPage)
    this.setData({
      isScroll: true,
    })
    if (wiggleRoom && this.data.initTouch > e.changedTouches[0].pageY) {
      if (currentPage >= 0 && currentPage < 2) {
        this.setData({
          isScroll: true,
          currentPage: currentPage + 1,
          toSect: order[currentPage + 1],
        });
      }
    } else if (wiggleRoom && this.data.initTouch < e.changedTouches[0].pageY) {
      if (currentPage > 0 && currentPage <= 2) {
        this.setData({
          currentPage: currentPage - 1,
          toSect: order[currentPage - 1],
          isScroll: true,
        });
      }
    } else {
    }
    this.setData({
      isScroll: false,
    });
  },
})